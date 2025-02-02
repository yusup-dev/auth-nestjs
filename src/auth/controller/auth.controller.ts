import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 200,
    schema: { example: { message: 'User registered successfully' } },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already exists',
    schema: {
      example: { message: 'Email already exists' },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Username already exists',
    schema: {
      example: { message: 'Username already exists' },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: { message: 'Internal server error, please try again later' },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, rate limit exceeded',
    schema: {
      example: {
        message: 'ThrottlerException: Too Many Requests',
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
    schema: {
      example: {
        message: 'Login successfully',
        user: {
          id: 1,
          username: 'john_doe',
          email: 'john@example.com',
        },
        access_token: 'jwt_token_here',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials',
    schema: {
      example: { message: 'Invalid credentials' },
    },  
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: { message: 'User not found' },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: { message: 'Internal server error, please try again later' },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, rate limit exceeded',
    schema: {
      example: {
        message: 'ThrottlerException: Too Many Requests',
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
