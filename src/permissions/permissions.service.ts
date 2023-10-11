import { Injectable } from '@nestjs/common';
import { PermissionDto } from './dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from './entities/permissions.entity';
import { Roles } from './entities/roles.entity';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectRepository(Permissions)
        private readonly permissionsRepository: Repository<Permissions>,
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>,
    ) { }

    async create(data: PermissionDto, res) {
        const checkexist = await this.permissionsRepository.findOne({ where: { func_id: data.func_id, role_id: data.role_id } });
        if (checkexist) {
            res.status(400).json({ message: 'Bu yetki zaten var.' }); return 400;
        }
        const perm = await this.permissionsRepository.create(data);
        const newPerm = await this.permissionsRepository.save(perm);
        if (newPerm) {
            res.status(201).json({ message: 'Yeni yetki oluşturuldu.' }); return 201;
        }
        res.status(400).json({ message: 'Yetki oluşturulamadı.' }); return 400;
    }

    async getPermissions(res) {
        const perms = await this.permissionsRepository.find({ relations: { function: true, role: true } });
        if (perms) {
            res.status(200).json(perms); return 200;
        }
        res.status(400).json({ message: 'Yetkiler bulunamadı.' }); return 400;
    }

    async getPermission(permid: number, res) {
        const perm = await this.permissionsRepository.findOne({ where: { id: permid }, relations: { function: true, role: true } });
        if (perm) {
            res.status(200).json(perm); return 200;
        }
        res.status(400).json({ message: 'Yetki bulunamadı.' }); return 400;
    }

    async setPermission(permid: number, funcId: number, roleId: number, res) {
        const perm = await this.permissionsRepository.update({ id: permid }, { func_id: funcId, role_id: roleId });
        if (perm.affected > 0) {
            res.status(200).json({ message: 'Yetki güncellendi.' }); return 200;
        }
        res.status(400).json({ message: 'Yetki güncellenemedi.' }); return 400;
    }

    async deletePermission(permid: number, res) {
        const checkexist = await this.permissionsRepository.findOne({ where: { id: permid } });
        if (!checkexist) {
            res.status(400).json({ message: 'Bu yetki zaten yok.' }); return 400;
        }
        const perm = await this.permissionsRepository.delete({ id: permid });
        if (perm.affected > 0) {
            res.status(200).json({ message: 'Yetki silindi.' }); return 200;
        }
        res.status(400).json({ message: 'Yetki silinemedi.' }); return 400;
    }

    async createRole(data: RoleDto, res) {
        const role = await this.rolesRepository.create(data);
        const newRole = await this.rolesRepository.save(role);
        if (newRole) {
            res.status(201).json({ message: 'Yeni rol oluşturuldu.' }); return 201;
        }
        res.status(400).json({ message: 'Rol oluşturulamadı.' }); return 400;
    }

    async getRoles(res) {
        const roles = await this.rolesRepository.find();
        if (roles) {
            res.status(200).json(roles); return 200;
        }
        res.status(400).json({ message: 'Roller bulunamadı.' }); return 400;
    }

    async getRole(roleid: number, res) {
        const role = await this.rolesRepository.findOne({ where: { id: roleid } });
        if (role) {
            res.status(200).json(role); return 200;
        }
        res.status(400).json({ message: 'Rol bulunamadı.' }); return 400;
    }

    async setRole(roleid: number, name: string, res) {
        const role = await this.rolesRepository.update({ id: roleid }, { name: name });
        if (role.affected > 0) {
            res.status(200).json({ message: 'Rol güncellendi.' }); return 200;
        }
        res.status(400).json({ message: 'Rol güncellenemedi.' }); return 400;
    }

    async deleteRole(roleid: number, res) {
        const role = await this.rolesRepository.delete({ id: roleid });
        if (role.affected > 0) {
            res.status(200).json({ message: 'Rol silindi.' }); return 200;
        }
        res.status(400).json({ message: 'Rol silinemedi.' }); return 400;
    }

    async getFunctions(res) {
        const functions = await this.permissionsRepository.find({ relations: { function: true } });
        if (functions) {
            const func = [];
            functions.forEach(element => {
                if (!func.includes(element.function)) {
                    func.push(element.function);
                }
            });
            res.status(200).json(func); return 200;
        }
        res.status(400).json({ message: 'Roller bulunamadı.' }); return 400;
    }

}
