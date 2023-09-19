import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encryptor } from 'services/encyrption/encyrpt-data';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserDto } from './dto/set-user.dto';
import { Users } from './entities/users.entity';
import { Images } from './entities/images.entity';
import { UploadPhotoDto } from './dto/photo.dto';

const encrypt = new Encryptor;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await encrypt.hashPassword(createUserDto.password);
        const user = await this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        const { password, ...result } = user;
        return result;
    }

    async findAll(): Promise<Users[]> {
        return await this.userRepository.find();
    }

    async findOneWithUserName(userName: string) {
        return await this.userRepository.findOne({ where: { username: userName } });
    }

    async findwithID(id: number) {
        return await this.userRepository.findOne({ where: { id: id } });
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
        if (user) {
            if (data.username == '' || data.password == '' || data.email == '') { res.status(400).send({ message: "Kullanıcı adı, Şifre ya da Email boş değer olamaz." }); return; }
            user.firstname = data.firstname;
            user.lastname = data.lastname;
            user.username = data.username;
            user.email = data.email;
            user.password = await encrypt.hashPassword(data.password);
            user.img = data.img;
            await this.userRepository.save(user);
            res.status(200).send({ message: "Kullanıcı bilgileri güncellendi." });
        }
        else { res.status(400).send({ message: "Kullanıcı bilgileri güncellenemedi" }); }
    }

    async uploadPhoto(photoDto: UploadPhotoDto, uid: number) {
        const photo = this.imagesRepository.create(photoDto);
        await this.imagesRepository.save(photo);
        await this.userRepository.update({ id: uid }, { img: photo.iname });
        return `/users/${photo.iname}`;
    }
}
