import { Test, TestingModule } from '@nestjs/testing';
import { GeneralsService } from './generals.service';
import { Images } from '../../src/media/entities/images.entity';
import { Repository } from 'typeorm';
import { Generals } from './entities/generals.entity';
import { Users } from '../../src/users/entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Permissions } from '../../src/permissions/entities/permissions.entity';

describe('GeneralsService', () => {
  let service: GeneralsService;
  let imagesRepository: Repository<Images>;
  let generalRepository: Repository<Generals>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralsService,JwtService,
        {
          provide: getRepositoryToken(Generals),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
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

    service = module.get<GeneralsService>(GeneralsService);
    generalRepository = module.get<Repository<Generals>>(getRepositoryToken(Generals)); 
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
