import { Test, TestingModule } from '@nestjs/testing';
import {StationService} from '../../src/service/station.service';

describe('Station', () => {
  let provider: StationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationService],
    }).compile();

    provider = module.get<StationService>(StationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
