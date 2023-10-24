import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Permissions } from '../../src/permissions/entities/permissions.entity';
import { MenuType } from './entities/menu_type.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

describe('MenuController', () => {
  let controller: MenuController;
  let menuRepository: Repository<Menu>;
  let menuTypeRepository: Repository<MenuType>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
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
        }
      ],
    }).compile();

    controller = module.get<MenuController>(MenuController);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    menuRepository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
    menuTypeRepository = module.get<Repository<MenuType>>(getRepositoryToken(MenuType));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
