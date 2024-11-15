import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OfferIdResponseDto {
  @Expose({ name: 'offerId' })
  @ApiProperty({ format: 'uuid' })
  public offer_id?: string;

  constructor(partial: Partial<OfferIdResponseDto>) {
    Object.assign(this, partial);
  }
}
