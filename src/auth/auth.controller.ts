import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PassAuth } from './guards/pass-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
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

