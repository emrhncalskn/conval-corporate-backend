import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Images } from '../../src/media/entities/images.entity';
import { Users } from '../../src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Blogs } from './entities/blogs.entity';
import { Permissions } from '../../src/permissions/entities/permissions.entity';

describe('BlogsController', () => {
  let controller: BlogsController;
  let blogRepository: Repository<Blogs>;
  let imagesRepository: Repository<Images>;
  let userRepository: Repository<Users>;
  let permissionRepository: Repository<Permissions>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [BlogsService,JwtService,
        {
          provide: getRepositoryToken(Blogs),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
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

    controller = module.get<BlogsController>(BlogsController);
    blogRepository = module.get<Repository<Blogs>>(getRepositoryToken(Blogs)); 
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users)); 
    imagesRepository = module.get<Repository<Images>>(getRepositoryToken(Images));
    permissionRepository = module.get<Repository<Permissions>>(getRepositoryToken(Permissions));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
