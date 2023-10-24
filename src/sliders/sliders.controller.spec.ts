import { Test, TestingModule } from '@nestjs/testing';
import { SlidersController } from './sliders.controller';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { Sliders } from './entities/sliders.entity';
import { Images } from '../../src/media/entities/images.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { SlidersService } from './sliders.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SlidersController', () => {
  let controller: SlidersController;
  let slidersRepository: Repository<Sliders>;
  let imagesRepository: Repository<Images>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlidersController],
      providers: [SlidersService,JwtService,
        {
          provide: getRepositoryToken(Images),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Users),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Sliders),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Permissions), 
          useClass: Repository,
        }],
    }).compile();

    controller = module.get<SlidersController>(SlidersController);
    slidersRepository = module.get<Repository<Sliders>>(getRepositoryToken(Sliders));
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
