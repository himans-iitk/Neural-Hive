import { Module } from '@nestjs/common';
import { OfferController } from '@/modules/offer/offer.controller';
import { OfferService } from '@/modules/offer/offer.service';
import { UserInfoService } from '@/modules/user-info/user-info.service';
import { OfferRepository } from '@/resources/repositories/offer.repository';
import { OfferDeleteSql } from '@/resources/repositories/sql/offer/offer-delete.sql';
import { OfferInsertSql } from '@/resources/repositories/sql/offer/offer-insert.sql';
import { OfferSelectSql } from '@/resources/repositories/sql/offer/offer-select.sql';
import { OfferUpdateSql } from '@/resources/repositories/sql/offer/offer-update.sql';
import { UserInfoSelectSql } from '@/resources/repositories/sql/user-info/user-info-select.sql';
import { UserInfoRepository } from '@/resources/repositories/user-info.repository';

@Module({
  controllers: [OfferController],
  providers: [
    OfferService,
    UserInfoService,
    UserInfoRepository,
    UserInfoSelectSql,
    OfferRepository,
    OfferSelectSql,
    OfferUpdateSql,
    OfferInsertSql,
    OfferDeleteSql,
  ],
})
export class OfferModule {}
