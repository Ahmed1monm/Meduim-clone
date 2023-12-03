import { TestBed } from '@automock/jest';
import { AppService } from './app.service';

describe('Test storing files to desk', () => {
  it('invalid file should return empty string', async () => {
    const { unit } = TestBed.create(AppService).compile();
    const file: Express.Multer.File = {
      buffer: null,
      mimetype: 'image/png',
      originalname: 'test.png',
      encoding: 'utf-8',
      fieldname: '',
      size: 0,
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };
    const result = await unit.writeFileToDisk(file);
    expect(result).toEqual('');
  });
});
