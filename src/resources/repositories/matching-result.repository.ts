import { Injectable } from '@nestjs/common';
import { MatchingResultResponseDto } from '../dtos/matching-result/matching-result-response.dto';
import { UrlRouteParamDto } from '../dtos/url-route-param.dto';
import { MatchingResultSelectSql } from './sql/matching-result/matching-result-select.sql';
import { DatabaseService } from '@/common/providers/database.service';

@Injectable()
export class MatchingResultRepository {
  constructor(
    private databaseService: DatabaseService,
    private matchingResultSelectSql: MatchingResultSelectSql,
  ) {}

  /**
   * matching result
   */
  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<MatchingResultResponseDto> {
    let data: MatchingResultResponseDto = { matchedResearcherList: [] };
    await this.databaseService.executeQueries(async client => {
      const result = await this.matchingResultSelectSql.findOneItem(
        client,
        urlParam,
      );

      data = new MatchingResultResponseDto(result);
    });

    return data;
  }
}
