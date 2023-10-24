import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { MenuType } from './entities/menu_type.entity';

describe('MenuService', () => {
  let service: MenuService;
  let menuRepository: Repository<Menu>;
  let menuTypeRepository: Repository<MenuType>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService,JwtService,
        {
          provide: getRepositoryToken(Menu),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MenuType),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
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

    service = module.get<MenuService>(MenuService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    menuRepository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
    menuTypeRepository = module.get<Repository<MenuType>>(getRepositoryToken(MenuType));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
