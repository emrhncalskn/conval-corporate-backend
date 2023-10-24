import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Functions } from '../../services/functions/functions';
import { JwtGuard } from '../../src/auth/guards/jwt-auth.guard';
import { Permission } from '../../src/permissions/decorators/permission.decorator';
import { PermissionGuard } from '../../src/permissions/guards/permission.guard';
import { SetUserDto, SetUserRoleDto } from './dto/set-user.dto';
import { UsersService } from './users.service';

const func = new Functions;

@ApiBearerAuth()
@UseGuards(PermissionGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    @Permission(12)
    @Get()
    async getUsers() {
        return this.usersService.findAll();
    }

    @Permission()
    @Get('profile')
    async getUserProfile(@Req() req) {
        return this.usersService.findwithID(req.user.id);
    }

    @Permission(13)
    @Get('get/:id')
    async getUser(@Param('id') id: number) {
        return this.usersService.findwithID(id);
    }

    @Permission()
    @ApiResponse({ status: 200, description: 'Kullanıcının kendi bilgilerini düzenlemeyi sağlar' })
    @Post('set/profile')
    async setUser(@Body() data: SetUserDto, @Res() res, @Req() req) {
        return this.usersService.setUser(data, res, req.user.id);
    }

    @Permission(14)
    @Post('set/profile/:id')
    async setUserById(@Body() data: SetUserDto, @Res() res, @Param('id') id: number) {
        return this.usersService.setUser(data, res, id);
    }

    @Permission(33)
    @Get('requests')
    async getRegisterRequests() {
        return this.usersService.getRegisterRequests()
    }

    @Permission(34)
    @Get('accept/:id')
    async acceptRegisterRequest(@Param('id') id: number, @Res() res) {
        return this.usersService.acceptRegisterRequest(id, res)
    }

    @Permission(35)
    @Get('decline/:id')
    async declineRegisterRequest(@Param('id') id: number, @Res() res) {
        return this.usersService.declineRegisterRequest(id, res)
    }

    @Permission(36)
    @Post('set/role/:id')
    async setUserRole(@Param('id') id: number, @Body() data: SetUserRoleDto, @Res() res) {
        return this.usersService.setUserRole(id, data.roleid, res)
    }

    @Permission(37)
    @Post('delete/:id')
    async deleteUser(@Param('id') id: number, @Res() res) {
        return this.usersService.deleteUser(id, res)
    }
}