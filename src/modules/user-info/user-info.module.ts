import { Module } from '@nestjs/common';
import { UserInfoController } from '@/modules/user-info/user-info.controller';
import { UserInfoService } from '@/modules/user-info/user-info.service';
import { UserInfoSelectSql } from '@/resources/repositories/sql/user-info/user-info-select.sql';
import { UserInfoRepository } from '@/resources/repositories/user-info.repository';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository, UserInfoSelectSql],
})
export class UserInfoModule {}
