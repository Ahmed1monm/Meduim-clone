import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';
import { IToken } from './interfaces/token.interface';
import { registerDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: loginDto): Promise<IToken> {
    return this.authService.login(loginData);
  }
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerData: registerDto): Promise<IToken> {
    return this.authService.register(registerData);
  }
}
