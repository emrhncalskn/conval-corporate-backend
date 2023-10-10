import { Controller, Post, Body, Request, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PassAuth } from './guards/pass-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @PassAuth()
    @ApiResponse({ status: 200, description: 'Kullanıcı girişi ve doğrulama. (Login İşlemi)' })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() authDto: AuthDto, @Request() req) {
        return await this.authService.login(req.user.id);
    }

    @PassAuth()
    @ApiResponse({ status: 200, description: 'Yeni kullanıcı oluşturur. (Register İşlemi)' })
    @Post('register')
    async register(@Body() data: CreateUserDto, @Req() req) {
        const emailcheck = await this.usersService.findOneWithEmail(data.email);
        const usercheck = await this.usersService.findOneWithUserName(data.username);
        let msg = '';

        emailcheck ? msg = 'Bu email ile kayıt olunmuş' :
            usercheck ? msg = 'Bu kullanıcı adı ile kayıt olunmuş' :
                (msg = 'Kayıt başarılı', await this.usersService.create(data));

        return await this.login({ email: data.username, password: data.password }, req);
    }
}

