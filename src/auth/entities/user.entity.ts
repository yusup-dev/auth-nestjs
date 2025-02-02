import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "@nestjs/class-transformer";
import { User } from "@prisma/client";

export class UserEntity implements User {
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
