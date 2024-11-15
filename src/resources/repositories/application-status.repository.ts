import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationStatusAddRequestDto } from '../dtos/application-status/application-status-add-request.dto';
import { ApplicationStatusIdResponseDto } from '../dtos/application-status/application-status-id-response.dto';
import { ApplicationStatusUpdateRequestDto } from '../dtos/application-status/application-status-update-request.dto';
import { UrlRouteParamDto } from '../dtos/url-route-param.dto';
import { ApplicationStatusInsertSql } from './sql/application-status/application-status-insert.sql';
import { ApplicationStatusUpdateSql } from './sql/application-status/application-status-update.sql';
import { DatabaseService } from '@/common/providers/database.service';

/**
 * @export
 * @class ApplicationStatusRepository
 */
@Injectable()
export class ApplicationStatusRepository {
  constructor(
    private databaseService: DatabaseService,
    private applicationStatusInsertSql: ApplicationStatusInsertSql,
    private applicationStatusUpdateSql: ApplicationStatusUpdateSql,
  ) {}

  /**
   * add application status
   */
  public async addOne(
    bodyParams: ApplicationStatusAddRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    let data: ApplicationStatusIdResponseDto = { application_id: '' };
    await this.databaseService.executeQueries(async client => {
      const result = await this.applicationStatusInsertSql.addOne(
        client,
        bodyParams,
      );
      data = new ApplicationStatusIdResponseDto(result);
    });

    return data;
  }

  /**
   * update application status
   */
  public async updateOne(
    urlParam: UrlRouteParamDto,
    bodyParams: ApplicationStatusUpdateRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    let data: ApplicationStatusIdResponseDto = { application_id: '' };
    await this.databaseService.executeQueries(async client => {
      const result = await this.applicationStatusUpdateSql.updateOne(
        client,
        urlParam,
        bodyParams,
      );

      if (!result) {
        throw new NotFoundException('Application Status Not Found');
      }

      data = new ApplicationStatusIdResponseDto(result);
    });

    return data;
  }
}
