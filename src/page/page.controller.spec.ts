import { Test, TestingModule } from '@nestjs/testing';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { Repository } from 'typeorm';
import { Component } from './entities/component.entity';
import { ComponentFile } from './entities/component_file.entity';
import { ComponentType } from './entities/component_type.entity';
import { Page } from './entities/page.entity';
import { PageComponent } from './entities/page_component.entity';
import { PageConfig } from './entities/page_config.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PageController', () => {
  let controller: PageController;
  let pageRepository: Repository<Page>;
  let pageConfigRepository: Repository<PageConfig>;
  let pageComponentRepository: Repository<PageComponent>;
  let componentRepository: Repository<Component>;
  let componentFileRepository: Repository<ComponentFile>;
  let componentTypeRepository: Repository<ComponentType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageController],
      providers: [PageService,
        {
          provide: getRepositoryToken(Page),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PageConfig),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PageComponent),  // Servicelere enjekte edilen repositoryler burayada enjekte ediliyor.
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Component), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ComponentFile), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ComponentType), 
          useClass: Repository,
        }
      ],
    }).compile();

    controller = module.get<PageController>(PageController);
    pageRepository = module.get<Repository<Page>>(getRepositoryToken(Page)); 
    pageConfigRepository = module.get<Repository<PageConfig>>(getRepositoryToken(PageConfig));
    pageComponentRepository = module.get<Repository<PageComponent>>(getRepositoryToken(PageComponent));
    componentRepository = module.get<Repository<Component>>(getRepositoryToken(Component));
    componentFileRepository = module.get<Repository<ComponentFile>>(getRepositoryToken(ComponentFile));
    componentTypeRepository = module.get<Repository<ComponentType>>(getRepositoryToken(ComponentType));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
