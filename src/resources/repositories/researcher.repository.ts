import { Injectable, NotFoundException } from '@nestjs/common';
import { ResearcherDetailResponseDto } from '../dtos/researcher/researcher-detail-response.dto';
import { UrlRouteParamDto } from '../dtos/url-route-param.dto';
import { ResearcherSelectSql } from './sql/researcher/researcher-select.sql';
import { DatabaseService } from '@/common/providers/database.service';

@Injectable()
export class ResearcherRepository {
  constructor(
    private databaseService: DatabaseService,
    private researcherSelectSql: ResearcherSelectSql,
  ) {}

  /**
   * researcher detail
   */
  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<ResearcherDetailResponseDto> {
    let data = new ResearcherDetailResponseDto({});
    await this.databaseService.executeQueries(async client => {
      await this.researcherSelectSql
        .findOneItem(client, urlParam)
        .then(result => {
          if (!result) {
            throw new NotFoundException('Researcher not found.');
          }

          data = new ResearcherDetailResponseDto(result);
        });
    });

    return data;
  }
}
