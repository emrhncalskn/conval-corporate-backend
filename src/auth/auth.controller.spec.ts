import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../src/users/entities/users.entity';
import { UsersService } from '../../src/users/users.service';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Images } from '../../src/media/entities/images.entity';
import { Roles } from '../../src/permissions/entities/roles.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let userRepository: Repository<Users>;
  let imagesRepository: Repository<Images>;
  let rolesRepository: Repository<Roles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,UsersService,JwtService,
        {
          provide: getRepositoryToken(Users),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Images),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Roles),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    rolesRepository = module.get<Repository<Roles>>(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
