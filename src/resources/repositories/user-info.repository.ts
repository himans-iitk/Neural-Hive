import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfoResponseDto } from '../dtos/user-info/user-info-response.dto';
import { UserInfoSelectSql } from './sql/user-info/user-info-select.sql';
import { DatabaseService } from '@/common/providers/database.service';

@Injectable()
export class UserInfoRepository {
  constructor(
    private databaseService: DatabaseService,
    private userInfoSelectSql: UserInfoSelectSql,
  ) {}

  /**
   * user detail
   */
  public async findOne(email: string): Promise<UserInfoResponseDto> {
    let data = new UserInfoResponseDto({});
    await this.databaseService.executeQueries(async client => {
      const result = await this.userInfoSelectSql.findOneItem(client, email);

      if (!result) {
        throw new UnauthorizedException('User not found.');
      }

      data = new UserInfoResponseDto(result);
    });

    return data;
  }
}
