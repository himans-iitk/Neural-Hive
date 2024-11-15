import { Injectable } from '@nestjs/common';

import { PoolClient } from 'pg';
import format = require('pg-format');

import { DatabaseService } from '@/common/providers/database.service';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { MatchingResultEntity } from '@/resources/entities/matching-result/matching-result.entity';
import { Publication } from '@/resources/entities/researcher/publication.entity';

@Injectable()
export class MatchingResultSelectSql {
  constructor(private databaseService: DatabaseService) {}

  public async findOneItem(
    client: PoolClient,
    urlParam: UrlRouteParamDto,
  ): Promise<MatchingResultEntity[]> {
    const sql = `
      WITH publication_counts AS (
        SELECT
          researcher_id,
          COUNT(CASE WHEN type = %L THEN 1 ELSE NULL END) AS paper_num,
          COUNT(CASE WHEN type = %L THEN 1 ELSE NULL END) AS book_num,
          COUNT(CASE WHEN type = %L THEN 1 ELSE NULL END) AS lecture_num
        FROM
          m_publications
        GROUP BY
          researcher_id
      ),
      award_counts AS (
        SELECT
          researcher_id,
          COUNT(*) AS award_num
        FROM
          m_awards
        GROUP BY
          researcher_id
      )
      SELECT
        res.researcher_id,
        res.full_name,
        res.department,
        res.research_fields_kaken_primary,
        res.research_fields_kaken_secondary,
        res.research_fields_researchmap,
        mat.similarity,
        mat.similarity_std,
        pubc.paper_num,
        pubc.book_num,
        pubc.lecture_num,
        rapp.application_id,
        rapp.status_id,
        COALESCE(awa.award_num, 0) AS award_num
      FROM
        m_researchers res
        INNER JOIN matching_result mat ON res.researcher_id = mat.researcher_id
        AND mat.offer_id = %L
        AND res.delete_flag = FALSE
        LEFT JOIN publication_counts pubc ON res.researcher_id = pubc.researcher_id
        LEFT JOIN award_counts awa ON res.researcher_id = awa.researcher_id
        LEFT JOIN m_researcher_applications rapp ON res.researcher_id = rapp.researcher_id
      ORDER BY
        mat.similarity DESC,
        res.researcher_id ASC;
    `;

    const data =
      await this.databaseService.queryWithReturn<MatchingResultEntity>(
        client,
        format(
          sql,
          Publication.PAPER,
          Publication.BOOK,
          Publication.LECTURE,
          urlParam.id,
        ),
      );

    return data;
  }
}
