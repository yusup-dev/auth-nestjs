import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages.constants';
import { UnauthorizedException } from 'src/common/exception/unauthorized.exception';
import { BadRequestException } from 'src/common/exception/bad-request.exception';
import { NotFoundException } from 'src/common/exception/not-found.exception';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER.INVALID_CREDENTIALS);
    }

    try {
      const payload = { email: user.email, sub: user.id };

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      return {
        message: 'Login successfully.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        access_token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(registerDto: RegisterDto) {
    await this.validate(registerDto.email, registerDto.username);

    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      this.prisma.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          password: hashedPassword,
        },
      });

      return { message: 'User registered successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async validate(email: string, username: string) {
    const [existingEmail, existingUsername] = await Promise.all([
      this.prisma.user.findUnique({ where: { email } }),
      this.prisma.user.findUnique({ where: { username } }),
    ]);

    if (existingEmail) {
      throw new BadRequestException(ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS);
    }

    if (existingUsername) {
      throw new BadRequestException(
        ERROR_MESSAGES.USER.USERNAME_ALREADY_EXISTS,
      );
    }
  }
}
