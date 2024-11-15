import { Type } from '@nestjs/class-transformer';
import { IsNotEmpty, IsInt, Min, Max } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseListRequestDto {
  @ApiProperty({
    description: 'page number',
    minimum: 1,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2147483647) // URLの一部で攻撃を受けやすいためキツめにバリデーション
  @Type(p => (p?.object[p.property] === '' ? () => null : Number)) // Number('') = 0 の為、status=(空) の場合0扱いになるので考慮.
  public page!: number;

  @ApiProperty({
    description: 'count number',
    minimum: 1,
    example: 40,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2147483647) // URLの一部で攻撃を受けやすいためキツめにバリデーション
  @Type(p => (p?.object[p.property] === '' ? () => null : Number)) // Number('') = 0 の為、status=(空) の場合0扱いになるので考慮.
  public count!: number;

  public get offset(): number {
    return (this.page - 1) * this.count;
  }
}
