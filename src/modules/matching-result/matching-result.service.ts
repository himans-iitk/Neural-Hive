import { Injectable } from '@nestjs/common';
import { MatchingResultResponseDto } from '@/resources/dtos/matching-result/matching-result-response.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { MatchingResultEntity } from '@/resources/entities/matching-result/matching-result.entity';
import { MatchingResultRepository } from '@/resources/repositories/matching-result.repository';

@Injectable()
export class MatchingResultService {
  constructor(private matchingResultRepository: MatchingResultRepository) {}

  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<MatchingResultResponseDto> {
    const data = await this.matchingResultRepository.findOne(urlParam);
    data.matchedResearcherList = data.matchedResearcherList.map(
      researcher => new MatchingResultEntity(researcher),
    );

    return data;
  }
}
