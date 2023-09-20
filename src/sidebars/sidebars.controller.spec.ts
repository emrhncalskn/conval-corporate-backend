import { Test, TestingModule } from '@nestjs/testing';
import { SidebarsController } from './sidebars.controller';
import { SidebarsService } from './sidebars.service';

describe('SidebarsController', () => {
  let controller: SidebarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SidebarsController],
      providers: [SidebarsService],
    }).compile();

    controller = module.get<SidebarsController>(SidebarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
