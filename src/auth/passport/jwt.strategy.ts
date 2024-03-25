//this class use to decode token (to validate token)

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private roleService: RolesService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            //secretOrKey: 'JWT_ACCESS_TOKEN_SECRET'
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: IUser) { //validate: this is keyword of 'PassportStrategy' 
        const { _id, name, email, role } = payload;
        //cần gán thêm permission vào req.user
        const userRole = role as unknown as { _id: string; name: string };
        const temp = (await this.roleService.findOne(userRole._id)).toObject();

        //req.user = { _id, name, email, role, permissions} (user in 'local.strategy.ts')
        return {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? []
        };
    }
}