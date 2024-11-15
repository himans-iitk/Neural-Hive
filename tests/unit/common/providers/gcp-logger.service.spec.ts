import { Test, TestingModule } from '@nestjs/testing';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

describe('CloudLoggerService', () => {
  let service: CloudLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudLoggerService],
    }).compile();

    service = module.get<CloudLoggerService>(CloudLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
