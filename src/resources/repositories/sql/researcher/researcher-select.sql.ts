import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { Publication } from '@/resources/entities/researcher/publication.entity';
import { ResearcherDetailEntity } from '@/resources/entities/researcher/researcher-detail.entity';

/**
 * @export
 * @class ResearcherSelectSql
 */
@Injectable()
export class ResearcherSelectSql {
  constructor(private databaseService: DatabaseService) {}

  public async findOneItem(
    client: PoolClient,
    urlParam: UrlRouteParamDto,
  ): Promise<ResearcherDetailEntity> {
    const sql = `
      WITH publication_data AS (
        SELECT
          pub.researcher_id,
          ARRAY_AGG(
            CASE WHEN pub.type = %L
            THEN json_build_object('title', pub.title, 'authors', pub.authors, 'publisher', pub.publisher) END
          ) AS paper_list,
          ARRAY_AGG(
            CASE WHEN pub.type = %L
            THEN json_build_object('title', pub.title, 'authors', pub.authors, 'publisher', pub.publisher) END
          ) AS book_list,
          ARRAY_AGG(
            CASE WHEN pub.type = %L
            THEN json_build_object('title', pub.title, 'authors', pub.authors, 'publisher', pub.publisher) END
          ) AS lecture_list,
          ARRAY_AGG(
            CASE WHEN pub.type = %L
            THEN json_build_object('title', pub.title, 'authors', pub.authors, 'publisher', pub.publisher) END
          ) AS symposium_list
        FROM m_publications AS pub
        WHERE pub.researcher_id = %L
        GROUP BY pub.researcher_id
      )
      SELECT
        res.researcher_id,
        res.kaken_id,
        res.jglobal_id,
        res.researchmap_id,
        res.full_name,
        res.affiliation_detail,
        res.department,
        res.job_title,
        res.research_fields_kaken_primary,
        res.research_fields_kaken_secondary,
        res.research_fields_researchmap,
        res.research_keywords_kaken_primary,
        res.research_keywords_kaken_secondary,
        res.research_keywords_researchmap,
        pubd.paper_list,
        pubd.book_list,
        pubd.lecture_list,
        pubd.symposium_list
      FROM m_researchers AS res
      INNER JOIN publication_data AS pubd ON res.researcher_id = pubd.researcher_id
      AND res.researcher_id = %L AND res.delete_flag = %L;
    `;

    const data =
      await this.databaseService.queryWithReturn<ResearcherDetailEntity>(
        client,
        format(
          sql,
          Publication.PAPER,
          Publication.BOOK,
          Publication.LECTURE,
          Publication.SYMPOSIUM,
          urlParam.id,
          urlParam.id,
          false,
        ),
      );

    return data[0];
  }
}
