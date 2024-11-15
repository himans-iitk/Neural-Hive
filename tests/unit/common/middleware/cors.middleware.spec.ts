import { CorsMiddleware } from '@/common/middleware/cors.middleware';

describe('CorsMiddleware', () => {
  it('should be defined', () => {
    expect(new CorsMiddleware()).toBeDefined();
  });
});
