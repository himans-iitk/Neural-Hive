import { Transform } from '@nestjs/class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OfferAddRequestDto {
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  public offerName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  public matchingOfferName!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public subOfferName?: string | null;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  @Max(1000)
  public offerStatusId!: number;

  @ApiProperty({ type: `string`, format: `date-time` })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  public releaseDay?: Date | null;

  @ApiProperty({ example: '国立研究開発法人日本医療研究開発機構' })
  @IsString()
  @IsOptional()
  public fundingAgency?: string | null;

  @ApiProperty({ example: '2023' })
  @IsString()
  @IsOptional()
  public offerFiscalYear?: string | null;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  public applicationUnit?: string | null;

  @ApiProperty({ example: '研究者単位' })
  @IsString()
  @IsOptional()
  public organizationApprovalFlag?: string | null;

  @ApiProperty({ type: `string`, format: `date-time` })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  public startAcceptingTimestamp?: Date | null;

  @ApiProperty({ type: `string`, format: `date-time` })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  public endAcceptingTimestamp?: Date | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public researchFields?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public offerKeyword?: string | null;

  @ApiProperty({ example: '(最短) 1から (最長) 5年' })
  @IsString()
  @IsOptional()
  public researchPeriod?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public businessClassificationCategory?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public applicableTargetCategory?: string | null;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public limitApplicationAmountMin?: number | null;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  public limitApplicationAmountMax?: number | null;

  @ApiProperty({ example: '直接経費の30%を上限' })
  @IsString()
  @IsOptional()
  public limitIndirectRation?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public limitComissionFee?: string | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public offerAbstract!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public matchingOfferAbstract!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public applicableTarget?: string | null;

  @ApiProperty({ example: '国際戦略推進部 国際事業課' })
  @IsString()
  @IsOptional()
  public offererDepartment?: string | null;

  @ApiProperty({ example: 'ASPIRE担当' })
  @IsString()
  @IsOptional()
  public offererName?: string | null;

  @ApiProperty({ example: '03-6870-2216' })
  @IsString()
  @IsOptional()
  public offererPhoneNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public offererFaxNumber?: string | null;

  @ApiProperty({ example: 'amed-aspire@amed.go.jp' })
  @IsString()
  @IsOptional()
  public offererEmail?: string | null;

  @ApiProperty({
    example: 'https://www.e-rad.go.jp/eRad/E1031S03/?koboCd=K043884',
  })
  @IsString()
  @IsOptional()
  public offerGuideUrl?: string | null;

  @ApiProperty({
    example: 'https://www.amed.go.jp/koubo/15/01/1501B_00092.html',
  })
  @IsString()
  @IsOptional()
  public orgOfferUrl?: string | null;

  @ApiProperty({ example: 'e-rad' })
  @IsString()
  @IsOptional()
  public source?: string | null;
}
