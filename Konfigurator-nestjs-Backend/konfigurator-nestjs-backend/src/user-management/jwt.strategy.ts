import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'MY-SECRET-SECRET-KEY',
        });
    }

    async validate(payload: any) {
        return { username: payload.username };
    }
}