import { IsString, Length } from 'class-validator';

export class loginDto {
  @IsString()
  @Length(3, 100, { message: 'username is too short or too long' })
  readonly username: string;

  @IsString()
  @Length(10, 2000, { message: 'password is too short' })
  readonly password: string;
}
