import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class LoginResponseDto {
    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsString()
    user: {
        id: string;
        username: string;
        email: string;
    };

    @ApiProperty()
    @IsString()
    access_token: string;
}
