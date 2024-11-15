import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OfferDetailEntity {
  @Expose({ name: 'offerId' })
  @ApiProperty({ format: 'uuid' })
  public offer_id!: string;

  @Expose({ name: 'offerCd' })
  @ApiProperty({ example: 'K043884' })
  public offer_cd?: string;

  @Expose({ name: 'offerStatusId' })
  @ApiProperty({ default: 0 })
  public offer_status_id!: number;

  @Expose({ name: 'offerStatusName' })
  @ApiProperty({ example: '未確認' })
  public offer_status_name!: string;

  @Expose({ name: 'releaseDay' })
  @ApiProperty({ type: `string`, format: `date-time` })
  public release_day?: Date;

  @Expose({ name: 'fundingAgency' })
  @ApiProperty({ example: '国立研究開発法人日本医療研究開発機構' })
  public funding_agency?: string;

  @Expose({ name: 'offerFiscalYear' })
  @ApiProperty({ example: '2023' })
  public offer_fiscal_year?: string;

  @Expose({ name: 'offerName' })
  @ApiProperty({
    example: '先端国際共同研究推進プログラム aspire 健康医療分野aタイプ',
  })
  public offer_name!: string;

  @Expose({ name: 'matchingOfferName' })
  @ApiProperty({
    example: '先端国際共同研究推進プログラム aspire 健康医療分野aタイプ',
  })
  public matching_offer_name!: string;

  @Expose({ name: 'subOfferName' })
  @ApiProperty()
  public sub_offer_name?: string;

  @Expose({ name: 'applicationUnit' })
  @ApiProperty({ example: '' })
  public application_unit?: string;

  @Expose({ name: 'organizationApprovalFlag' })
  @ApiProperty({ example: '研究者単位' })
  public organization_approval_flag?: string;

  @Expose({ name: 'startAcceptingTimestamp' })
  @ApiProperty({ type: `string`, format: `date-time` })
  public start_accepting_timestamp?: Date;

  @Expose({ name: 'endAcceptingTimestamp' })
  @ApiProperty({ type: `string`, format: `date-time` })
  public end_accepting_timestamp?: Date;

  @Expose({ name: 'researchFields' })
  @ApiProperty()
  public research_fields?: string;

  @Expose({ name: 'offerKeyword' })
  @ApiProperty()
  public offer_keyword?: string;

  @Expose({ name: 'researchPeriod' })
  @ApiProperty({ example: '(最短) 1から (最長) 5年' })
  public research_period?: string;

  @Expose({ name: 'businessClassificationCategory' })
  @ApiProperty()
  public business_classification_category?: string;

  @Expose({ name: 'applicableTargetCategory' })
  @ApiProperty()
  public applicable_target_category?: string;

  @Expose({ name: 'limitApplicationAmountMin' })
  @ApiProperty()
  public limit_application_amount_min?: string;

  @Expose({ name: 'limitApplicationAmountMax' })
  @ApiProperty()
  public limit_application_amount_max?: string;

  @Expose({ name: 'limitIndirectRation' })
  @ApiProperty({ example: '直接経費の30%を上限' })
  public limit_indirect_ration?: string;

  @Expose({ name: 'limitComissionFee' })
  @ApiProperty()
  public limit_comission_fee?: string;

  @Expose({ name: 'offerAbstract' })
  @ApiProperty()
  public offer_abstract!: string;

  @Expose({ name: 'matchingOfferAbstract' })
  @ApiProperty()
  public matching_offer_abstract!: string;

  @Expose({ name: 'applicableTarget' })
  @ApiProperty()
  public applicable_target?: string;

  @Expose({ name: 'offererDepartment' })
  @ApiProperty({ example: '国際戦略推進部 国際事業課' })
  public offerer_department?: string;

  @Expose({ name: 'offererName' })
  @ApiProperty({ example: 'ASPIRE担当' })
  public offerer_name?: string;

  @Expose({ name: 'offererPhoneNumber' })
  @ApiProperty({ example: '03-6870-2216' })
  public offerer_phone_number?: string;

  @Expose({ name: 'offererFaxNumber' })
  @ApiProperty()
  public offerer_fax_number?: string;

  @Expose({ name: 'offererEmail' })
  @ApiProperty({ example: 'amed-aspire@amed.go.jp' })
  public offerer_email?: string;

  @Expose({ name: 'offerGuideUrl' })
  @ApiProperty({
    example: 'https://www.e-rad.go.jp/eRad/E1031S03/?koboCd=K043884',
  })
  public offer_guide_url?: string;

  @Expose({ name: 'orgOfferUrl' })
  @ApiProperty({
    example: 'https://www.amed.go.jp/koubo/15/01/1501B_00092.html',
  })
  public org_offer_url?: string;

  @Expose({ name: 'source' })
  @ApiProperty({ example: 'e-rad' })
  public source?: string;

  @Expose({ name: 'insufficientFlag' })
  @ApiProperty({ default: false })
  public insufficient_flag!: boolean;

  constructor(partial: Partial<OfferDetailEntity>) {
    Object.assign(this, partial);
  }
}
