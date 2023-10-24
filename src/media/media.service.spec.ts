import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Images } from './entities/images.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MediaService', () => {
  let service: MediaService;
  let imagesRepository: Repository<Images>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        }],
    }).compile();

    service = module.get<MediaService>(MediaService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
