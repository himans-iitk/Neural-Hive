import { ApiProperty } from '@nestjs/swagger';
import { MatchingResultEntity } from '@/resources/entities/matching-result/matching-result.entity';

export class MatchingResultResponseDto {
  @ApiProperty({ type: [MatchingResultEntity] })
  public matchedResearcherList: MatchingResultEntity[];

  constructor(matchedResearcherList: MatchingResultEntity[]) {
    this.matchedResearcherList = matchedResearcherList;
  }
}
