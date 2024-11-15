import { Injectable } from '@nestjs/common';
import { ApplicationStatusAddRequestDto } from '@/resources/dtos/application-status/application-status-add-request.dto';
import { ApplicationStatusIdResponseDto } from '@/resources/dtos/application-status/application-status-id-response.dto';
import { ApplicationStatusUpdateRequestDto } from '@/resources/dtos/application-status/application-status-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { ApplicationStatusRepository } from '@/resources/repositories/application-status.repository';

@Injectable()
export class ApplicationStatusService {
  constructor(
    private applicationStatusRepository: ApplicationStatusRepository,
  ) {}

  public async addOne(
    bodyParam: ApplicationStatusAddRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    return await this.applicationStatusRepository.addOne(bodyParam);
  }

  public async updateOne(
    urlParam: UrlRouteParamDto,
    bodyParam: ApplicationStatusUpdateRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    return await this.applicationStatusRepository.updateOne(
      urlParam,
      bodyParam,
    );
  }
}
