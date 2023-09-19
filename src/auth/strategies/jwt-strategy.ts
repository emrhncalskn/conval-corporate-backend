import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// user authorization

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'c0nv4lc0rp0r4t3',
        })
    }

    async validate(payload: any) {
        const result = {
            id: payload.sub.id,
        };

        const id = result.id
        return await id
    }
}

