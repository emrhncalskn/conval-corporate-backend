import { Test, TestingModule } from '@nestjs/testing';
import { SidebarsService } from './sidebars.service';

describe('SidebarsService', () => {
  let service: SidebarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SidebarsService],
    }).compile();

    service = module.get<SidebarsService>(SidebarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
