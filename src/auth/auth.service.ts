import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Encryptor } from 'services/encyrption/encyrpt-data';
import { JwtService } from '@nestjs/jwt';

const encrypt = new Encryptor;

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }



    async validateUser(email: string, password: string) {

        const user = await this.usersService.findOneWithEmail(email);
        if (user && (await encrypt.isPasswordCorrect(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: Users) {
        const payload = {
            sub: {
                id: user
            }
        }
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

}

//hdi bırk 
