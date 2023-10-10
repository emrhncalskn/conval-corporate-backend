import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Encryptor } from 'services/encyrption/encyrpt-data';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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

    async login(userInfo: Users, res: any) {
        const { password, ...user } = userInfo;
        const payload = {
            sub: {
                id: user.id
            }
        }

        return res.status(200).json({
            user: user,
            accessToken: this.jwtService.sign(payload),
        })
    }

    async createUser(createUserDto: CreateUserDto, res: any) {
        const checkEmail = await this.usersService.findOneWithEmail(createUserDto.email);
        const checkUserName = await this.usersService.findOneWithUserName(createUserDto.username);
        if (checkEmail) return res.status(400).json({ message: 'Bu email adresi kullanılmaktadır.' });
        if (checkUserName) return res.status(400).json({ message: 'Bu kullanıcı adı kullanılmaktadır.' });

        const user = await this.usersService.create(createUserDto);
        await this.login(user, res);
    }

}

//hdi bırk 
