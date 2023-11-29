import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IToken } from './interfaces/token.interface';
import { loginDto } from './dtos/login.dto';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { registerDto } from './dtos/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: loginDto): Promise<IToken> {
    const user: UserEntity | null = await this.userService.findOneByUsername(
      data.username,
    );
    const hashedEnteredPass: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );
    console.log(hashedEnteredPass);
    if (!user || !hashedEnteredPass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, username: user.username };
    const token: string = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
  async register(data: registerDto): Promise<IToken> {
    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const user: UserEntity = await this.userService.create({
      ...data,
      password: hashedPassword,
    });
    return {
      token: await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
