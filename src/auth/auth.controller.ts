import { Controller, Post, Body, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @ApiResponse({ status: 200, description: 'Kullanıcı girişi ve doğrulama. (Login İşlemi)' })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() authDto: AuthDto, @Request() req) {
        return await this.authService.login(req.user.id);

    }

    @ApiResponse({ status: 200, description: 'Yeni kullanıcı oluşturur. (Register İşlemi)' })
    @Post('register')
    async register(@Res() res, @Body() data: CreateUserDto) {
        const usercheck = await this.usersService.findOneWithUserName(data.email);
        if (usercheck) {
            res.status(400).send({ message: 'Bu mail adresi ile kayıt olunmuş' });
        }
        await this.usersService.create(data);
        res.status(201).send({ message: 'Kayıt başarılı' });
    }
}

