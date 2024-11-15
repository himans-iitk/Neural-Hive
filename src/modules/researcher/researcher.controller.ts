import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResearcherService } from './researcher.service';
import { Public } from '@/common/decorators/public.decorator';
import { ResearcherDetailResponseDto } from '@/resources/dtos/researcher/researcher-detail-response.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { ResearcherDetailEntity } from '@/resources/entities/researcher/researcher-detail.entity';

@Controller('researcher')
@ApiTags('/researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  // GET researcher details API
  @Public()
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ResearcherDetailResponseDto })
  public async findOne(
    @Param() urlParam: UrlRouteParamDto,
  ): Promise<ResearcherDetailEntity> {
    return await this.researcherService.findOne(urlParam);
  }
}
