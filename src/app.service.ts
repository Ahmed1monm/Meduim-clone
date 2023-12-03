import { Injectable } from '@nestjs/common';
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
}
