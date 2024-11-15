/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { OfferListRequestDto } from '@/resources/dtos/offer/offer-list-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { OfferDetailEntity } from '@/resources/entities/offer/offer-detail.entity';
import { OfferListEntity } from '@/resources/entities/offer/offer-list.entity';
import { UserInfoEntity } from '@/resources/entities/user-info/user-info.entity';

/**
 * @export
 * @class OfferSelectSql
 */
@Injectable()
export class OfferSelectSql {
  constructor(private databaseService: DatabaseService) {}

  // 類似度の閾値
  similarity = 0.61;

  // 事務員用公募一覧取得
  public async findAllItems(
    client: PoolClient,
    user: UserInfoEntity,
    params: OfferListRequestDto,
  ): Promise<OfferListEntity[]> {
    let sql = `
      WITH candidate_counts AS (
        SELECT
          offer_id,
          COUNT(*) AS candidates_num
        FROM
          matching_result
        WHERE
          similarity >= %L
        GROUP BY
          offer_id
      )
      SELECT
        off.offer_id,
        off.offer_status_id,
        off.funding_agency,
        off.organization_approval_flag,
        off.offer_name,
        off.sub_offer_name,
        off.start_accepting_timestamp,
        off.end_accepting_timestamp,
        off.limit_application_amount_min,
        off.limit_application_amount_max,
        off.insufficient_flag,
        sta.status_name AS offer_status_name,
        COALESCE(canc.candidates_num, 0) AS candidates_num
      FROM
        m_offers_front AS off
        INNER JOIN m_offer_statuses AS sta ON off.offer_status_id = sta.offer_status_id
        LEFT JOIN candidate_counts AS canc ON off.offer_id = canc.offer_id
      WHERE off.delete_flag = FALSE
      `;

    // SQLに埋め込む値
    const values: (number | number[])[] = [this.similarity];

    sql += this.assembleWhereConditions(params, values);

    sql += `ORDER BY\n`;

    // sortFieldの指定がある場合は第一ソートに入れる
    if (params.sortField != undefined) {
      sql += `off.${params.sortField} ${params.sortOrder} NULLS LAST,\n`;
    }

    sql += `
        off.offer_status_id ASC,
        off.end_accepting_timestamp ASC,
        off.funding_agency ASC,
        off.updated_timestamp DESC,
        off.offer_id ASC
      LIMIT %L OFFSET %L;
      `;

    values.push(params.count, params.offset);

    const data = await this.databaseService.queryWithReturn<OfferListEntity>(
      client,
      format(sql, ...values),
    );

    return data;
  }

  // マッチング公募一覧取得
  public async findAllMatchedItems(
    client: PoolClient,
    user: UserInfoEntity,
    params: OfferListRequestDto,
  ): Promise<OfferListEntity[]> {
    let sql = `
      SELECT
        off.offer_id,
        off.offer_status_id,
        off.funding_agency,
        off.organization_approval_flag,
        off.offer_name,
        off.sub_offer_name,
        off.start_accepting_timestamp,
        off.end_accepting_timestamp,
        off.limit_application_amount_min,
        off.limit_application_amount_max,
        off.insufficient_flag,
        mat.similarity,
        mat.similarity_std
      FROM
        m_offers_front AS off
        INNER JOIN matching_result AS mat ON mat.offer_id = off.offer_id
      WHERE off.delete_flag = FALSE
      AND mat.researcher_id = %L
      AND mat.similarity >= %L
      `;

    // SQLに埋め込む値
    const values: (number | number[] | string)[] = [
      user.researcher_id!,
      this.similarity,
    ];

    sql += this.assembleWhereConditions(params, values);

    sql += `
      ORDER BY
        mat.similarity DESC,
        off.offer_status_id ASC,
        off.end_accepting_timestamp ASC,
        off.funding_agency ASC,
        off.updated_timestamp DESC,
        off.offer_id ASC
      LIMIT %L OFFSET %L;
      `;

    values.push(params.count, params.offset);

    const data = await this.databaseService.queryWithReturn<OfferListEntity>(
      client,
      format(sql, ...values),
    );

    return data;
  }

  // 公募詳細取得
  public async findOneItem(
    client: PoolClient,
    urlParam: UrlRouteParamDto,
  ): Promise<OfferDetailEntity> {
    const sql = `
      SELECT
        off.offer_id,
        off.offer_cd,
        off.offer_status_id,
        off.release_day,
        off.funding_agency,
        off.offer_fiscal_year,
        off.offer_name,
        off.matching_offer_name,
        off.sub_offer_name,
        off.application_unit,
        off.organization_approval_flag,
        off.start_accepting_timestamp,
        off.end_accepting_timestamp,
        off.research_fields,
        off.offer_keyword,
        off.research_period,
        off.business_classification_category,
        off.applicable_target_category,
        off.limit_application_amount_min,
        off.limit_application_amount_max,
        off.limit_indirect_ration,
        off.limit_comission_fee,
        off.offer_abstract,
        off.matching_offer_abstract,
        off.applicable_target,
        off.offerer_department,
        off.offerer_name,
        off.offerer_phone_number,
        off.offerer_fax_number,
        off.offerer_email,
        off.offer_guide_url,
        off.org_offer_url,
        off.source,
        off.insufficient_flag,
        sta.status_name AS offer_status_name
      FROM
        m_offers_front AS off
        INNER JOIN m_offer_statuses AS sta ON off.offer_status_id = sta.offer_status_id
      WHERE
        off.offer_id = %L AND off.delete_flag = %L;
    `;

    const data = await this.databaseService.queryWithReturn<OfferDetailEntity>(
      client,
      format(sql, urlParam.id, false),
    );

    return data[0];
  }

  // WHERE分のAND条件をパラメータの内容で組み立てる
  private assembleWhereConditions(
    params: OfferListRequestDto,
    values: (number | number[] | string | Date)[],
  ): string {
    let sql = '';

    // 公募ステータス
    if (params.status != undefined) {
      sql += `AND off.offer_status_id = ANY(ARRAY[%L::smallint])\n`;
      values.push(params.status);
    }

    // 応募上限金額の上限/下限
    if (params.minAmount != undefined) {
      sql += `AND off.limit_application_amount_max >= %L\n`;
      values.push(params.minAmount);
    }
    if (params.maxAmount != undefined) {
      sql += `AND off.limit_application_amount_max <= %L\n`;
      values.push(params.maxAmount);
    }

    // 受付開始/終了日
    if (params.startAcceptingDate != undefined) {
      sql += `AND off.start_accepting_timestamp >= %L\n`;
      values.push(params.startAcceptingDate);
    }
    if (params.endAcceptingDate != undefined) {
      sql += `AND off.end_accepting_timestamp <= %L\n`;
      values.push(params.endAcceptingDate);
    }

    // 検索キーワード
    if (params.keyword != undefined && params.keyword.length > 0) {
      params.keyword.forEach(key => {
        sql += `AND off.offer_search_text ILIKE %L\n`;
        values.push(`%${key}%`);
      });
    }

    return sql;
  }
}
