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
            return res.status(400).json({ message: 'Bu yetki zaten var.' });
        }
        const perm = await this.permissionsRepository.create(data);
        const newPerm = await this.permissionsRepository.save(perm);
        if (newPerm) {
            return res.status(201).json({ message: 'Yeni yetki oluşturuldu.' });
        }
        return res.status(400).json({ message: 'Yetki oluşturulamadı.' });
    }

    async getPermissions(res) {
        const perms = await this.permissionsRepository.find({ relations: { function: true, role: true } });
        if (perms) {
            return res.status(200).json(perms);
        }
        return res.status(400).json({ message: 'Yetkiler bulunamadı.' });
    }

    async getPermission(permid: number, res) {
        const perm = await this.permissionsRepository.findOne({ where: { id: permid }, relations: { function: true, role: true } });
        if (perm) {
            return res.status(200).json(perm);
        }
        return res.status(400).json({ message: 'Yetki bulunamadı.' });
    }

    async setPermission(permid: number, funcId: number, roleId: number, res) {
        const perm = await this.permissionsRepository.update({ id: permid }, { func_id: funcId, role_id: roleId });
        if (perm.affected > 0) {
            return res.status(200).json({ message: 'Yetki güncellendi.' });
        }
        return res.status(400).json({ message: 'Yetki güncellenemedi.' });
    }

    async deletePermission(permid: number, res) {
        const checkexist = await this.permissionsRepository.findOne({ where: { id: permid } });
        if (!checkexist) {
            return res.status(400).json({ message: 'Bu yetki zaten yok.' });
        }
        const perm = await this.permissionsRepository.delete({ id: permid });
        if (perm.affected > 0) {
            return res.status(200).json({ message: 'Yetki silindi.' });
        }
        return res.status(400).json({ message: 'Yetki silinemedi.' });
    }

    async createRole(data: RoleDto, res) {
        const role = await this.rolesRepository.create(data);
        const newRole = await this.rolesRepository.save(role);
        if (newRole) {
            return res.status(201).json({ message: 'Yeni rol oluşturuldu.' });
        }
        return res.status(400).json({ message: 'Rol oluşturulamadı.' });
    }

    async getRoles(res) {
        const roles = await this.rolesRepository.find();
        if (roles) {
            return res.status(200).json(roles);
        }
        return res.status(400).json({ message: 'Roller bulunamadı.' });
    }

    async getRole(roleid: number, res) {
        const role = await this.rolesRepository.findOne({ where: { id: roleid } });
        if (role) {
            return res.status(200).json(role);
        }
        return res.status(400).json({ message: 'Rol bulunamadı.' });
    }

    async setRole(roleid: number, name: string, res) {
        const role = await this.rolesRepository.update({ id: roleid }, { name: name });
        if (role.affected > 0) {
            return res.status(200).json({ message: 'Rol güncellendi.' });
        }
        return res.status(400).json({ message: 'Rol güncellenemedi.' });
    }

    async deleteRole(roleid: number, res) {
        const role = await this.rolesRepository.delete({ id: roleid });
        if (role.affected > 0) {
            return res.status(200).json({ message: 'Rol silindi.' });
        }
        return res.status(400).json({ message: 'Rol silinemedi.' });
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
            return res.status(200).json(func);
        }
        return res.status(400).json({ message: 'Roller bulunamadı.' });
    }

    async getFunctionsByRole(roleid: number, res) {
        const functions = await this.permissionsRepository.find({ where: { role_id: roleid }, relations: { function: true, role: true }, select: ['function'] });
        if (functions) {
            const func = [];
            functions.forEach(element => {
                if (!func.includes(element.function)) {
                    func.push(element.function);
                }
            });
            const role = functions[0].role;
            return res.status(200).json({ role, func });
        }
        return res.status(400).json({ message: 'Roller bulunamadı.' });
    }

}
