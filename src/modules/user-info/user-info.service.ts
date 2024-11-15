import { Injectable } from '@nestjs/common';
import { UserInfoResponseDto } from '@/resources/dtos/user-info/user-info-response.dto';
import { UserInfoRepository } from '@/resources/repositories/user-info.repository';

@Injectable()
export class UserInfoService {
  constructor(private userInfoRepository: UserInfoRepository) {}

  /**
   * fetch user
   */
  public async findOne(email: string): Promise<UserInfoResponseDto> {
    return await this.userInfoRepository.findOne(email);
  }
}
