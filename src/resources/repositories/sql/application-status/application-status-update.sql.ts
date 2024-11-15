import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { ApplicationStatusIdResponseDto } from '@/resources/dtos/application-status/application-status-id-response.dto';
import { ApplicationStatusUpdateRequestDto } from '@/resources/dtos/application-status/application-status-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

@Injectable()
export class ApplicationStatusUpdateSql {
  constructor(private databaseService: DatabaseService) {}

  public async updateOne(
    client: PoolClient,
    urlParam: UrlRouteParamDto,
    bodyParams: ApplicationStatusUpdateRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    const sql = `
      UPDATE
        m_researcher_applications
      SET
        status_id = %L,
        updated_timestamp = CURRENT_TIMESTAMP
      WHERE application_id = %L
      RETURNING application_id;
    `;

    const data =
      await this.databaseService.queryWithReturn<ApplicationStatusIdResponseDto>(
        client,
        format(sql, bodyParams.statusId, urlParam.id),
      );

    return data[0];
  }
}
