import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MatchingResultService } from './matching-result.service';
import { Public } from '@/common/decorators/public.decorator';
import { MatchingResultResponseDto } from '@/resources/dtos/matching-result/matching-result-response.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

@Controller('matching-result')
export class MatchingResultController {
  constructor(private matchingResultService: MatchingResultService) {}

  // GET matching result API
  @Public()
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: MatchingResultResponseDto })
  public async findAll(
    @Param() urlParam: UrlRouteParamDto,
  ): Promise<MatchingResultResponseDto> {
    return await this.matchingResultService.findOne(urlParam);
  }
}
