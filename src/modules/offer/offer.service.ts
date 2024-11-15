import { BadRequestException, Injectable } from '@nestjs/common';
import { OfferAddRequestDto } from '@/resources/dtos/offer/offer-add-request.dto';
import { OfferDetailResponseDto } from '@/resources/dtos/offer/offer-detail-response.dto';
import { OfferIdResponseDto } from '@/resources/dtos/offer/offer-id-response.dto';
import {
  OfferListRequestDto,
  OfferSortFields,
} from '@/resources/dtos/offer/offer-list-request.dto';
import { OfferListResponseDto } from '@/resources/dtos/offer/offer-list-response.dto';
import { OfferUpdateRequestDto } from '@/resources/dtos/offer/offer-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';
import { OfferListEntity } from '@/resources/entities/offer/offer-list.entity';
import {
  UserInfoEntity,
  UserType,
} from '@/resources/entities/user-info/user-info.entity';
import { OfferRepository } from '@/resources/repositories/offer.repository';

@Injectable()
export class OfferService {
  constructor(private offerRepository: OfferRepository) {}

  /**
   * fetch offer list
   */
  public async findAll(
    user: UserInfoEntity,
    queryParams: OfferListRequestDto,
  ): Promise<OfferListResponseDto> {
    // ロールが事務員でsortFieldがrecommendedの場合は400エラーを返す
    if (
      user.type === UserType.FACULTY &&
      queryParams.sortField === OfferSortFields.RECOMMENDED
    ) {
      throw new BadRequestException('Invalid parameter in the request.');
    }

    const data = await this.offerRepository.findAll(user, queryParams);
    // serialization（オブジェクトを作り直すことでDTOのシリアライズを実施する）
    data.offerList = data.offerList.map(offer => new OfferListEntity(offer));

    return data;
  }

  /**
   * fetch offer detail
   */
  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<OfferDetailResponseDto> {
    return await this.offerRepository.findOne(urlParam);
  }

  /**
   * update offer
   */
  public async updateOne(
    bodyParams: OfferUpdateRequestDto,
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerRepository.updateOne(bodyParams, urlParam);
  }

  /**
   * add offer
   */
  public async addOne(
    bodyParams: OfferAddRequestDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerRepository.addOne(bodyParams);
  }

  /**
   * delete offer
   */
  public async deleteOne(
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    return await this.offerRepository.deleteOne(urlParam);
  }
}
