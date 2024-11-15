import { IsInt, IsNotEmpty, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplicationStatusAddRequestDto {
  @ApiProperty({
    required: true,
    type: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  public offerId!: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    type: 'uuid',
  })
  public researcherId!: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    required: true,
    type: 'number',
  })
  public statusId!: string;
}
