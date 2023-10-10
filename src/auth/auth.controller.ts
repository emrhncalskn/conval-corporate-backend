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
    async login(@Body() authDto: AuthDto, @Res() res, @Req() req) {
        return await this.authService.login(req.user, res);
    }

    @PassAuth()
    @ApiResponse({ status: 200, description: 'Yeni kullanıcı oluşturur. (Register İşlemi)' })
    @Post('register')
    async register(@Body() data: CreateUserDto, @Res() res) {
        return await this.authService.createUser(data, res);
    }
}

