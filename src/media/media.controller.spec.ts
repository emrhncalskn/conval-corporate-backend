import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Images } from './entities/images.entity';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MediaController', () => {
  let controller: MediaController;
  let imagesRepository: Repository<Images>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService,JwtService,
        {
          provide: getRepositoryToken(Images),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Users),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Permissions), 
          useClass: Repository,
        }
      ],
    }).compile();

    controller = module.get<MediaController>(MediaController);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
