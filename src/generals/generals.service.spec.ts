import { Test, TestingModule } from '@nestjs/testing';
import { GeneralsService } from './generals.service';

describe('GeneralsService', () => {
  let service: GeneralsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralsService],
    }).compile();

    service = module.get<GeneralsService>(GeneralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
