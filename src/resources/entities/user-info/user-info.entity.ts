import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum UserType {
  FACULTY = 1,
  RESEARCHER = 2,
}

export class UserInfoEntity {
  @Expose({ name: 'userId' })
  @ApiProperty({ type: 'uuid' })
  public user_id!: string;

  @Expose({ name: 'email' })
  @ApiProperty({ example: '胆嚢癌における血管合併切除の問題点とその意義' })
  public email!: string;

  @Expose({ name: 'researcherId' })
  @ApiProperty({ type: 'uuid' })
  public researcher_id?: string;

  @Expose({ name: 'type' })
  @ApiProperty({ example: 1 })
  public type!: number;

  constructor(partial: Partial<UserInfoEntity>) {
    Object.assign(this, partial);
  }
}
