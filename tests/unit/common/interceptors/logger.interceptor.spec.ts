import { LoggerInterceptor } from '@/common/interceptors/logger.interceptor';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

describe('LoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggerInterceptor(new CloudLoggerService())).toBeDefined();
  });
});
