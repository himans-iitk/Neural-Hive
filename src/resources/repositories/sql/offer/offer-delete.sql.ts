import { Injectable } from '@nestjs/common';

import { PoolClient } from 'pg';
import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { OfferIdResponseDto } from '@/resources/dtos/offer/offer-id-response.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

/**
 * @export
 * @class OfferDeleteSql
 */
@Injectable()
export class OfferDeleteSql {
  constructor(private databaseService: DatabaseService) {}

  public async deleteOne(
    client: PoolClient,
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    const sql = `
      UPDATE
        m_offers_front
      SET
        delete_flag = TRUE,
        updated_timestamp = CURRENT_TIMESTAMP
      WHERE
        offer_id = %L AND delete_flag = %L
      RETURNING offer_id;
    `;

    const data = await this.databaseService.queryWithReturn<OfferIdResponseDto>(
      client,
      format(sql, urlParam.id, false),
    );

    return data[0];
  }
}
