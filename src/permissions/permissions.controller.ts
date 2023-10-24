import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from './guards/permission.guard';
import { Permission } from './decorators/permission.decorator';
import { PermissionDto } from './dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from './entities/permissions.entity';
import { Repository } from 'typeorm';
import { Functions } from './entities/functions.entity';
import { PermissionsService } from './permissions.service';
import { RoleDto } from './dto/role.dto';

@ApiBearerAuth()
@ApiTags('Permissions')
@UseGuards(JwtGuard, PermissionGuard)
@Controller('permissions')
export class PermissionsController {
    constructor(
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
        @InjectRepository(Functions)
        private readonly functionsRepository: Repository<Functions>,
        private readonly permissionsService: PermissionsService,
    ) { }

    @Permission(1)
    @Get()
    async getPermissions(@Res() res) {
        return await this.permissionsService.getPermissions(res);
    }

    @Permission(2)
    @Post('get/:id')
    async getPermissionById(@Res() res, @Param('id') id: number) {
        return await this.permissionsService.getPermission(id, res);
    }

    @Permission(3)
    @Post('create/new')
    async create(@Body() data: PermissionDto, @Res() res) {
        return await this.permissionsService.create(data, res);
    }

    @Permission(4)
    @Post('set/:id')
    async setPermission(@Param('id') id: number, @Body() data: PermissionDto, @Res() res) {
        return await this.permissionsService.setPermission(id, data.func_id, data.role_id, res);
    }

    @Permission(5)
    @Post('delete/:id')
    async deletePermission(@Param('id') id: number, @Res() res) {
        return await this.permissionsService.deletePermission(id, res);
    }

    @Permission(6)
    @Post('create/role')
    async createRole(@Body() data: RoleDto, @Res() res) {
        return await this.permissionsService.createRole(data, res);
    }

    @Permission(7)
    @Get('roles')
    async getRoles(@Res() res) {
        return await this.permissionsService.getRoles(res);
    }

    @Permission(8)
    @Get('role/get/:id')
    async getRoleById(@Param('id') id: number, @Res() res) {
        return await this.permissionsService.getRole(id, res);
    }

    @Permission(9)
    @Post('role/set/:id')
    async setRole(@Param('id') id: number, @Body() data: RoleDto, @Res() res) {
        return await this.permissionsService.setRole(id, data.name, res);
    }

    @Permission(10)
    @Post('role/del/:id')
    async deleteRole(@Param('id') id: number, @Res() res) {
        return await this.permissionsService.deleteRole(id, res);
    }

    @Permission(11)
    @Get('functions')
    async getFunctions(@Res() res) {
        return await this.permissionsService.getFunctions(res);
    }

}
