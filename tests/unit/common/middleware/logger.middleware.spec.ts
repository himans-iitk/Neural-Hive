import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware(new CloudLoggerService())).toBeDefined();
  });
});
