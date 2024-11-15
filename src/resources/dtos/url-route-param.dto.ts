import { IsNotEmpty, IsUUID } from '@nestjs/class-validator';

// URLに含まれるパスパラメータ（resourceのuuidを受け取る）
export class UrlRouteParamDto {
  @IsNotEmpty()
  @IsUUID()
  public id!: string;
}
