import { ApiProperty } from '@nestjs/swagger';
import { OfferListEntity } from '@/resources/entities/offer/offer-list.entity';

export class OfferListResponseDto {
  @ApiProperty({ type: [OfferListEntity] })
  public offerList: OfferListEntity[];

  constructor(offerList: OfferListEntity[]) {
    this.offerList = offerList;
  }
}
