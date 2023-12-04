import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'process';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async writeFileToDisk(file: Express.Multer.File): Promise<string> {
    if (!file.buffer) {
      return '';
    }
    const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
    fs.writeFileSync('assets/' + fileName, file.buffer);
    return `${process.cwd()}/assets/${fileName}`;
  }

  // TODO:: Move to custom inspector
  async ImageValidation(
    req: Express.Request,
    file: Express.Multer.File,
    callback,
  ) {
    const allowedFileTypes: string[] = ['.jpg', '.png', '.jpeg'];
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    if (allowedFileTypes.includes(ext)) {
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
  }
}
