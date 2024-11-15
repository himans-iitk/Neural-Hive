import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { ApplicationStatusAddRequestDto } from '@/resources/dtos/application-status/application-status-add-request.dto';
import { ApplicationStatusIdResponseDto } from '@/resources/dtos/application-status/application-status-id-response.dto';

@Injectable()
export class ApplicationStatusInsertSql {
  constructor(private databaseService: DatabaseService) {}

  public async addOne(
    client: PoolClient,
    bodyParams: ApplicationStatusAddRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    const sql = `
      INSERT INTO m_researcher_applications (
        application_id,
        offer_id,
        researcher_id,
        status_id,
        created_timestamp,
        updated_timestamp
      )
      VALUES (
        gen_random_uuid(),
        %L,
        %L,
        %L,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING application_id;
    `;

    const data =
      await this.databaseService.queryWithReturn<ApplicationStatusIdResponseDto>(
        client,
        format(
          sql,
          bodyParams.offerId,
          bodyParams.researcherId,
          bodyParams.statusId,
        ),
      );

    return data[0];
  }
}
