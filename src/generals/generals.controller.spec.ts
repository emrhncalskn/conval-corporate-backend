import { Test, TestingModule } from '@nestjs/testing';
import { GeneralsController } from './generals.controller';
import { GeneralsService } from './generals.service';

describe('GeneralsController', () => {
  let controller: GeneralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralsController],
      providers: [GeneralsService],
    }).compile();

    controller = module.get<GeneralsController>(GeneralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
