import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class registerDto {
  @IsString()
  @Length(3, 100, { message: 'username is too short or too long' })
  readonly username: string;

  @IsString()
  @Length(10, 200, { message: 'password is too short' })
  readonly password: string;

  @IsString()
  @Length(2, 30, { message: 'name should be in range 2:30 char' })
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly bio: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'type should be a number, send type id' },
  )
  readonly type: number;
}
