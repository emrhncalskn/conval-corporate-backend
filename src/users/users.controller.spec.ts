import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { Images } from '../../src/media/entities/images.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Roles } from '../../src/permissions/entities/roles.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let imagesRepository: Repository<Images>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>
  let rolesRepository: Repository<Roles>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,JwtService,
        {
          provide: getRepositoryToken(Images),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Users),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Roles),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Permissions), 
          useClass: Repository,
        }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    rolesRepository = module.get<Repository<Roles>>(getRepositoryToken(Roles));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
