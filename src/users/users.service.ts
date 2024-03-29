import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encryptor } from '../../services/encyrption/encyrpt-data';
import { Roles } from '../../src/permissions/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserDto } from './dto/set-user.dto';
import { Users } from './entities/users.entity';

const encrypt = new Encryptor;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await encrypt.hashPassword(createUserDto.password);
        const user = await this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
    }

    async findAll(): Promise<Users[]> {
        return await this.userRepository.find();
    }

    async findOneWithEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        return user;
    }

    async findOneWithUserName(userName: string) {
        const user = await this.userRepository.findOne({ where: { username: userName } });
        return user;
    }

    async findwithID(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        return user;
    }

    async getUserID(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('User is not authenticated');
        }

        return user.id;
    }

    async setUser(data: SetUserDto, res, uid: number) {
        const user = await this.userRepository.findOne({ where: { id: uid } });
        if (!user) { return res.send({ status: 404, message: `ID: [${uid}] kullanıcı bulunamadı.` }); }
        Object.assign(user, data);
        if (data.password) { data.password = await encrypt.hashPassword(data.password); }
        const set = await this.userRepository.update({ id: uid }, data);
        if (set.affected < 1) { return res.send('Kullanıcı düzenleme işlemi sırasında bir hata oluştu.') }
        const { password, ...result } = user;
        return await res.send({ status: 200, message: `Kullanıcı düzenlendi.`, user: result });
    }

    async getRegisterRequests() {
        const users = await this.userRepository.find({ where: { role_id: 0 } });
        if (!users) { return 'Kayıt isteği bulunamadı.' }
        let results = [];
        for (let i = 0; i < users.length; i++) { const { password, ...result } = users[i]; results.push(result); }
        return results;
    }

    async acceptRegisterRequest(id: number, res) {
        const user = await this.userRepository.findOne({ where: { id: id, role_id: 0 } });
        if (!user) { return res.send({ status: 404, message: `ID: [${id}] sahip kullanıcı bulunamadı veya halihazırda onaylanmış.` }); }
        const accept = await this.userRepository.update({ id: id }, { role_id: 1 });
        if (accept.affected < 1) { return res.send('Onaylama işlemi sırasında bir hata oluştu.'); }
        const { password, ...result } = user; result.role_id = 1; //şifresiz ve role_id güncel halini basmak için
        return res.send({ status: 200, message: `Kullanıcı onaylandı.`, user: result });
    }

    async declineRegisterRequest(id: number, res) {
        const user = await this.userRepository.findOne({ where: { id: id, role_id: 0 } });
        if (!user) { return res.send({ status: 404, message: `ID: [${id}] kullanıcı bulunamadı veya halihazırda reddedilmiş.` }); }
        const decline = await this.userRepository.delete({ id: id });
        if (decline.affected < 1) { return res.send('Reddetme işlemi sırasında bir hata oluştu.') }
        const { password, ...result } = user;
        return await res.send({ status: 200, message: `Kullanıcı reddedildi.`, user: result });
    }

    async setUserRole(id: number, role: number, res) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) { return res.send({ status: 404, message: `ID: [${id}] kullanıcı bulunamadı.` }); }
        if (user.role_id === 0) { return res.send({ status: 400, message: `ID: [${id}] kullanıcısı hala onay bekliyor.` }); }
        const set = await this.userRepository.update({ id: id }, { role_id: role });
        const roles = await this.rolesRepository.findOne({ where: { id: role } })
        if (set.affected < 1) {
            return res.send('Role düzenleme işlemi sırasında bir hata oluştu.');
        }
        return res.send({ status: 200, message: `Kullanıcı rolü, '${roles.name}' olarak güncellendi.` });
    }

    async deleteUser(id: number, res) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) { return res.send({ status: 404, message: `ID: [${id}] kullanıcı bulunamadı.` }); }
        const del = await this.userRepository.delete({ id: id });
        if (del.affected < 1) { return res.send('Silme işlemi sırasında bir hata oluştu.') }
        const { password, ...result } = user;
        return await res.send({ status: 200, message: `Kullanıcı silindi.`, user: result });
    }
}
