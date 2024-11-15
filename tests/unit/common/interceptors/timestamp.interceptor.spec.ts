import { TimestampInterceptor } from '@/common/interceptors/timestamp.interceptor';

describe('TimestampInterceptor', () => {
  it('should be defined', () => {
    expect(new TimestampInterceptor()).toBeDefined();
  });
});
