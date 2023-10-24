import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { Permissions } from './entities/permissions.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Roles } from './entities/roles.entity';
import { Functions } from './entities/functions.entity';
import { Repository } from 'typeorm';
import { PermissionsService } from './permissions.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('PermissionsController', () => {
  let controller: PermissionsController;
  let permissionRepository: Repository<Permissions>;
  let userRepository: Repository<Users>;
  let roleRepository: Repository<Roles>;
  let functionRepository: Repository<Functions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [PermissionsService,JwtService,
        {
          provide: getRepositoryToken(Permissions),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
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
          provide: getRepositoryToken(Functions), 
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    roleRepository = module.get<Repository<Roles>>(getRepositoryToken(Roles));
    functionRepository = module.get<Repository<Functions>>(getRepositoryToken(Functions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
