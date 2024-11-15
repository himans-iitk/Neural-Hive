import { Injectable } from '@nestjs/common';
import { ResearcherDetailResponseDto } from '@/resources/dtos/researcher/researcher-detail-response.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { ResearcherRepository } from '@/resources/repositories/researcher.repository';

@Injectable()
export class ResearcherService {
  constructor(private researcherRepository: ResearcherRepository) {}

  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<ResearcherDetailResponseDto> {
    return await this.researcherRepository.findOne(urlParam);
  }
}
