import 'reflect-metadata'; // use 'class-validator' in jest
import { BaseListRequestDto } from '@/resources/dtos/base-list-request.dto';

describe('BaseListRequestDto', () => {
  it('should be defined', () => {
    expect(new BaseListRequestDto()).toBeDefined();
  });
});
