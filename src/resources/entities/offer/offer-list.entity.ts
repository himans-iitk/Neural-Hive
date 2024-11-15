import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class OfferListEntity {
  @Expose({ name: 'offerId' })
  @ApiProperty({ format: 'uuid' })
  public offer_id!: string;

  @Expose({ name: 'offerStatusId' })
  @ApiProperty({ default: 0 })
  public offer_status_id!: number;

  @Expose({ name: 'offerStatusName' })
  @ApiProperty({ example: '未検討' })
  public offer_status_name!: string;

  @Expose({ name: 'candidatesNum' })
  @ApiProperty({ default: 0, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public candidates_num!: number;

  @Expose({ name: 'fundingAgency' })
  @ApiProperty({ example: '国立研究開発法人日本医療研究開発機構' })
  public funding_agency?: string;

  @Expose({ name: 'organizationApprovalFlag' })
  @ApiProperty({ example: '研究者単位' })
  public organization_approval_flag?: string;

  @Expose({ name: 'offerName' })
  @ApiProperty()
  public offer_name!: string;

  @Expose({ name: 'subOfferName' })
  @ApiProperty()
  public sub_offer_name?: string;

  @Expose({ name: 'startAcceptingTimestamp' })
  @ApiProperty({ type: `string`, format: `date-time` })
  public start_accepting_timestamp?: Date;

  @Expose({ name: 'endAcceptingTimestamp' })
  @ApiProperty({ type: `string`, format: `date-time` })
  public end_accepting_timestamp?: Date;

  @Expose({ name: 'limitApplicationAmountMin' })
  @ApiProperty({ example: '1' })
  public limit_application_amount_min?: number;

  @Expose({ name: 'limitApplicationAmountMax' })
  @ApiProperty({ example: '494000' })
  public limit_application_amount_max?: number;

  @Expose({ name: 'insufficientFlag' })
  @ApiProperty({ default: false })
  public insufficient_flag!: boolean;

  constructor(partial: Partial<OfferListEntity>) {
    Object.assign(this, partial);
  }
}
