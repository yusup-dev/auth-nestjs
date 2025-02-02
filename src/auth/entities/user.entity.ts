import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "@nestjs/class-transformer";

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
