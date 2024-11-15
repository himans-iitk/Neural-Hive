import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';

describe('GlobalExceptionFilter', () => {
  it('should be defined', () => {
    expect(new GlobalExceptionFilter(new CloudLoggerService())).toBeDefined();
  });
});
