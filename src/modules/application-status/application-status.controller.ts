import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApplicationStatusService } from './application-status.service';
import { Public } from '@/common/decorators/public.decorator';
import { ApplicationStatusAddRequestDto } from '@/resources/dtos/application-status/application-status-add-request.dto';
import { ApplicationStatusIdResponseDto } from '@/resources/dtos/application-status/application-status-id-response.dto';
import { ApplicationStatusUpdateRequestDto } from '@/resources/dtos/application-status/application-status-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

@Controller('application-status')
export class ApplicationStatusController {
  constructor(private applicationStatusService: ApplicationStatusService) {}

  @Public()
  @Post('add')
  @ApiResponse({ status: HttpStatus.OK, type: ApplicationStatusAddRequestDto })
  public async addOne(
    @Body() bodyParams: ApplicationStatusAddRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    return await this.applicationStatusService.addOne(bodyParams);
  }

  @Public()
  @Post('update/:id')
  @ApiResponse({ status: HttpStatus.OK, type: ApplicationStatusIdResponseDto })
  public async updateOne(
    @Param() urlParam: UrlRouteParamDto,
    @Body() bodyParams: ApplicationStatusUpdateRequestDto,
  ): Promise<ApplicationStatusIdResponseDto> {
    return await this.applicationStatusService.updateOne(urlParam, bodyParams);
  }
}
