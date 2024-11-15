import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { PublicationEntity } from './publication.entity';

export class ResearcherDetailEntity {
  @Expose({ name: 'researcherId' })
  @ApiProperty({ type: 'uuid' })
  public researcher_id?: string;

  @Expose({ name: 'kakenId' })
  @ApiProperty({ example: '00127151' })
  public kaken_id?: string;

  @Expose({ name: 'jglobalId' })
  @ApiProperty({ example: '200901017393692535' })
  public jglobal_id?: string;

  @Expose({ name: 'researchmapId' })
  @ApiProperty({ example: '5000035702' })
  public researchmap_id?: string;

  @Expose({ name: 'fullName' })
  @ApiProperty({
    example: '山田花子(田中花子)',
  })
  public full_name?: string;

  @Expose({ name: 'affiliationDetail' })
  @ApiProperty({
    example: '2023年度: 帝京大学,薬学部,特任教授',
  })
  public affiliation_detail?: string;

  @Expose({ name: 'department' })
  @ApiProperty({
    example: '医学部',
  })
  public department?: string;

  @Expose({ name: 'jobTitle' })
  @ApiProperty({
    example: '特任教授',
  })
  public job_title?: string;

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

  @Expose({ name: 'researchKeywordsKakenPrimary' })
  @ApiProperty({
    example: 'pharmacokinetics/ニューキノロン系抗菌薬/ペンタミジン',
  })
  public research_keywords_kaken_primary?: string;

  @Expose({ name: 'researchKeywordsKakenSecondary' })
  @ApiProperty({
    example: '薬物治療/医薬品開発/生理活性物質',
  })
  public research_keywords_kaken_secondary?: string;

  @Expose({ name: 'researchKeywordsResearchmap' })
  @ApiProperty({
    example: '薬物血中濃度モニタリング,薬力学,薬物動態学',
  })
  public research_keywords_researchmap?: string;

  @Expose({ name: 'paperList' })
  @ApiProperty({ type: [PublicationEntity] })
  // ARRAYAGGではnullも含まれるのでここで除外
  @Transform(({ value }) =>
    value?.filter((v: PublicationEntity | null) => v != null),
  )
  public paper_list?: PublicationEntity[];

  @Expose({ name: 'bookList' })
  @ApiProperty({ type: [PublicationEntity] })
  // ARRAYAGGではnullも含まれるのでここで除外
  @Transform(({ value }) =>
    value?.filter((v: PublicationEntity | null) => v != null),
  )
  public book_list?: PublicationEntity[];

  @Expose({ name: 'lectureList' })
  @ApiProperty({ type: [PublicationEntity] })
  // ARRAYAGGではnullも含まれるのでここで除外
  @Transform(({ value }) =>
    value?.filter((v: PublicationEntity | null) => v != null),
  )
  public lecture_list?: PublicationEntity[];

  @Expose({ name: 'symposiumList' })
  @ApiProperty({ type: [PublicationEntity] })
  // ARRAYAGGではnullも含まれるのでここで除外
  @Transform(({ value }) =>
    value?.filter((v: PublicationEntity | null) => v != null),
  )
  public symposium_list?: PublicationEntity[];

  constructor(partial: Partial<ResearcherDetailEntity>) {
    Object.assign(this, partial);
  }
}
