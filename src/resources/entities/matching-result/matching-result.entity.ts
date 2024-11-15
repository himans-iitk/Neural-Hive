import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class MatchingResultEntity {
  @Expose({ name: 'similarity' })
  @ApiProperty({ example: 0.745803926639897, type: 'number' })
  @Transform(({ value }) => parseFloat(value))
  public similarity?: number;

  @Expose({ name: 'similarityStd' })
  @ApiProperty({ example: 0.745803926639897, type: 'number' })
  @Transform(({ value }) => parseFloat(value))
  public similarity_std?: number;

  @Expose({ name: 'applicationId' })
  @ApiProperty({ type: 'uuid' })
  public application_id?: string;

  @Expose({ name: 'statusId' })
  @ApiProperty({ type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public status_id?: number;

  @Expose({ name: 'awardNum' })
  @ApiProperty({ default: 0, example: 3, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public award_num?: number;

  @Expose({ name: 'paperNum' })
  @ApiProperty({ default: 0, example: 3, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public paper_num?: number;

  @Expose({ name: 'bookNum' })
  @ApiProperty({ default: 0, example: 2, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public book_num?: number;

  @Expose({ name: 'lectureNum' })
  @ApiProperty({ default: 0, example: 0, type: 'number' })
  @Transform(({ value }) => parseInt(value))
  public lecture_num?: number;

  @Expose({ name: 'researcherId' })
  @ApiProperty({ type: 'uuid' })
  public researcher_id?: string;

  @Expose({ name: 'fullName' })
  @ApiProperty({
    example: '山田花子(田中花子)',
  })
  public full_name?: string;

  @Expose({ name: 'department' })
  @ApiProperty({
    example: '医学部',
  })
  public department?: string;

  @Expose({ name: 'researchFieldsKakenPrimary' })
  @ApiProperty({
    example:
      '精神神経科学/神経内科学/小区分52020:神経内科学関連/小区分52030:精神神経科学関連',
  })
  public research_fields_kaken_primary?: string;

  @Expose({ name: 'researchFieldsKakenSecondary' })
  @ApiProperty({
    example:
      '睡眠科学/リハビリテーション科学・福祉工学/小区分58050:基礎看護学関連',
  })
  public research_fields_kaken_secondary?: string;

  @Expose({ name: 'researchFieldsResearchmap' })
  @ApiProperty({
    example: 'ライフサイエンス/神経内科学/,ライフサイエンス/医療薬学',
  })
  public research_fields_researchmap?: string;

  constructor(partial: Partial<MatchingResultEntity>) {
    Object.assign(this, partial);
  }
}
