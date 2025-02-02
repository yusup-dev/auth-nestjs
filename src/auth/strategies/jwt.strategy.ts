import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from "src/common/constants/error-messages.constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any){
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
          });
          if (!user) {
            throw new UnauthorizedException(ERROR_MESSAGES.USER.NOT_FOUND);
          }
          return user;
    }
}