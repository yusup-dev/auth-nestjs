import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class LoginResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  access_token: string;
}