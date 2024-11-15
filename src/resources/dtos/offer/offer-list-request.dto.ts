import { Transform, Type } from '@nestjs/class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseListRequestDto } from '@/resources/dtos/base-list-request.dto';

export enum OfferSortFields {
  LIMIT_APPLICATION_MAX = 'limit_application_amount_max',
  LIMIT_APPLICATION_MIN = 'limit_application_amount_min',
  START_ACCEPTING_TIME = 'start_accepting_timestamp',
  END_ACCEPTING_TIME = 'end_accepting_timestamp',
  FUNDING_AGENCY = 'funding_agency',
  OFFER_STATUS_ID = 'offer_status_id',
  RECOMMENDED = 'recommended',
}

export class OfferListRequestDto extends BaseListRequestDto {
  @ApiProperty({
    description: '応募上限額の下限',
    required: false,
    example: 100,
  })
  @IsInt()
  @Min(0)
  @Max(999999999)
  @IsOptional()
  @Type(p => (p?.object[p.property] === '' ? () => null : Number))
  public minAmount?: number;

  @ApiProperty({
    description: '応募上限額の上限',
    required: false,
    example: 2000,
  })
  @IsInt()
  @Min(0)
  @Max(999999999)
  @IsOptional()
  @Type(p => (p?.object[p.property] === '' ? () => null : Number))
  public maxAmount?: number;

  @ApiProperty({
    description: 'カンマ区切りのステータス',
    example: '0, 1, 2',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value?.toString().split(',').map(Number))
  @IsArray()
  @IsInt({ each: true })
  public status?: number[];

  @ApiProperty({
    description: 'カンマ区切りの検索キーワード',
    example: '癌研究, インターナショナル',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value?.toString().split(','))
  @IsArray()
  @IsString({ each: true })
  public keyword?: string[];

  @ApiProperty({
    description: 'ソート項目',
    required: false,
    example: 'status',
  })
  @IsOptional()
  @IsString()
  // Snake Caseに変換
  @Transform(({ value }) =>
    value?.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`),
  )
  @IsIn(Object.values(OfferSortFields))
  public sortField?: string;

  @ApiProperty({
    description: 'ソート順',
    required: false,
    default: 'desc',
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  public sortOrder = 'desc';

  @ApiProperty({
    description: '受付開始日',
    type: `string`,
    format: `date-time`,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  public startAcceptingDate?: Date;

  @ApiProperty({
    description: '受付終了日',
    type: `string`,
    format: `date-time`,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  public endAcceptingDate?: Date;
}
