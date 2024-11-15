import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new Reflector())).toBeDefined();
  });
});
