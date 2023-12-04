import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';
import { IToken } from './interfaces/token.interface';
import { registerDto } from './dtos/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../app.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: loginDto): Promise<IToken> {
    return this.authService.login(loginData);
  }
  @Post('register')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (
        req: Express.Request,
        file: Express.Multer.File,
        callback,
      ) => {
        const allowedFileTypes = ['.jpg', '.png'];
        const ext = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
        );
        if (allowedFileTypes.includes(ext.toLowerCase())) {
          return callback(null, true);
        } else {
          return callback(
            new BadRequestException(
              `File type ${ext} is not allowed. Allowed types are ${allowedFileTypes.join(
                ', ',
              )}`,
            ),
            false,
          );
        }
      },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerData: registerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    image?: Express.Multer.File,
  ): Promise<IToken> {
    registerData.image = await this.appService.writeFileToDisk(image);
    return this.authService.register(registerData);
  }
}
