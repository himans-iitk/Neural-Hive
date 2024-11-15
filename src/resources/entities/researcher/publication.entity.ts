import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum Publication {
  PAPER = '雑誌論文',
  BOOK = '図書',
  LECTURE = '学会発表',
  SYMPOSIUM = '帝京大学シンポジウム',
}

export class PublicationEntity {
  @Expose({ name: 'title' })
  @ApiProperty({ example: '胆嚢癌における血管合併切除の問題点とその意義' })
  public title?: string;

  @Expose({ name: 'authors' })
  @ApiProperty({ example: '宮崎勝,他' })
  public authors?: string;

  @Expose({ name: 'publisher' })
  @ApiProperty({ example: '胆と膵26,ページ:625-629' })
  public publisher?: string;

  constructor(partial: Partial<PublicationEntity>) {
    Object.assign(this, partial);
  }
}
