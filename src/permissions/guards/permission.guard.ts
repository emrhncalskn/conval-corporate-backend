import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Permissions } from '../entities/permissions.entity';
import { Functions } from 'services/functions/functions';
import { JwtService } from '@nestjs/jwt';

const func = new Functions;

@Injectable()
export class PermissionGuard {

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
    private jwtService: JwtService,
    private reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext) {
    const key = this.reflector.get<number[]>('permission_key', context.getHandler());
    if (isNaN(key[0])) { return true; } //her kullanıcı ulaşabilir
    const check = context.switchToHttp().getRequest().headers.authorization;
    if (key === undefined || check === undefined) { throw new HttpException("Önce giriş yapınız.", HttpStatus.BAD_REQUEST); }
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const uid = this.jwtService.decode(jwt);
    if (!uid['sub']['id']) { throw new HttpException("Bu fonksiyonu kullanmaya yetkiniz yok!", HttpStatus.BAD_REQUEST); }
    const user = await this.userRepository.findOne({ where: { id: uid['sub']['id'] } });
    const funcs = await this.permissionsRepository.find({ where: { func_id: key[0], role_id: user.role_id }, relations: ['roles', 'functions'] });
    if (funcs.length < 1) { throw new HttpException("Bu fonksiyonu kullanmaya yetkiniz yok!", HttpStatus.BAD_REQUEST); }
    return true;
  }
}








