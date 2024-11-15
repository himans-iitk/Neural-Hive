import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApplicationStatusIdResponseDto {
  @Expose({ name: 'applicationId' })
  @ApiProperty({
    required: true,
    type: 'uuid',
  })
  public application_id!: string;

  constructor(partial: Partial<ApplicationStatusIdResponseDto>) {
    Object.assign(this, partial);
  }
}
