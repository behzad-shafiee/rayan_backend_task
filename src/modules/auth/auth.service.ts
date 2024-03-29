import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { DataSource } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { username: loginDto.username, password: loginDto.password },
      });
      if (!user)
        throw new BadRequestException('username or password is wrong!');
      const access_token = this.jwtService.sign({
        username: loginDto.username,
        sub: loginDto.password,
      });

      return {
        access_token,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = new User();
      user.username = registerDto.username;
      user.password = registerDto.password;
      user.email = registerDto.username;
      await this.dataSource.manager.save(user);
      return {
        message: 'user created',
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
