import { IsInt, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ApplicationStatusUpdateRequestDto {
  @ApiProperty({
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public statusId!: number;
}
