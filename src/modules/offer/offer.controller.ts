import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInfoService } from '../user-info/user-info.service';
import { Public } from '@/common/decorators/public.decorator';
import { OfferService } from '@/modules/offer/offer.service';
import { OfferAddRequestDto } from '@/resources/dtos/offer/offer-add-request.dto';
import { OfferDetailResponseDto } from '@/resources/dtos/offer/offer-detail-response.dto';
import { OfferIdResponseDto } from '@/resources/dtos/offer/offer-id-response.dto';
import { OfferListRequestDto } from '@/resources/dtos/offer/offer-list-request.dto';
import { OfferListResponseDto } from '@/resources/dtos/offer/offer-list-response.dto';
import { OfferUpdateRequestDto } from '@/resources/dtos/offer/offer-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

@Controller('offer')
@ApiTags('/offer')
export class OfferController {
  constructor(
    private offerService: OfferService,
    private userInfoService: UserInfoService,
  ) {}

  // GET offer list API
  @Public()
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: OfferListResponseDto })
  public async findAll(
    @Req() req,
    @Query() queryParams: OfferListRequestDto,
  ): Promise<OfferListResponseDto> {
    const user = await this.userInfoService.findOne(req.user);
    return await this.offerService.findAll(user, queryParams);
  }

  // GET offer details API
  @Public()
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: OfferDetailResponseDto })
  public async findOne(
    @Param() urlParam: UrlRouteParamDto,
  ): Promise<OfferDetailResponseDto> {
    return await this.offerService.findOne(urlParam);
  }

  // POST update offer API
  @Public()
  @Post('update/:id')
  public async updateOffer(
    @Body() bodyParams: OfferUpdateRequestDto,
    @Param() urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerService.updateOne(bodyParams, urlParam);
  }

  // POST add offer API
  @Public()
  @Post('add')
  public async addOne(
    @Body() bodyParams: OfferAddRequestDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerService.addOne(bodyParams);
  }

  // POST delete offer API
  @Public()
  @Post('delete/:id')
  public async deleteOne(
    @Param() urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerService.deleteOne(urlParam);
  }
}
