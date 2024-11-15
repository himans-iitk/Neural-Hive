import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferAddRequestDto } from '../dtos/offer/offer-add-request.dto';
import { OfferDetailResponseDto as OfferDetailResponseDto } from '../dtos/offer/offer-detail-response.dto';
import { OfferIdResponseDto } from '../dtos/offer/offer-id-response.dto';
import { OfferUpdateRequestDto } from '../dtos/offer/offer-update-request.dto';
import { UrlRouteParamDto } from '../dtos/url-route-param.dto';
import {
  UserInfoEntity,
  UserType,
} from '../entities/user-info/user-info.entity';
import { OfferInsertSql } from './sql/offer/offer-insert.sql';
import { OfferUpdateSql } from './sql/offer/offer-update.sql';
import { DatabaseService } from '@/common/providers/database.service';
import {
  OfferListRequestDto,
  OfferSortFields,
} from '@/resources/dtos/offer/offer-list-request.dto';
import { OfferListResponseDto } from '@/resources/dtos/offer/offer-list-response.dto';
import { OfferDeleteSql } from '@/resources/repositories/sql/offer/offer-delete.sql';
import { OfferSelectSql } from '@/resources/repositories/sql/offer/offer-select.sql';

/**
 * @export
 * @class OfferRepository
 */
@Injectable()
export class OfferRepository {
  constructor(
    private databaseService: DatabaseService,
    private offerSelectSql: OfferSelectSql,
    private offerUpdateSql: OfferUpdateSql,
    private offerInsertSql: OfferInsertSql,
    private offerDeleteSql: OfferDeleteSql,
  ) {}

  /**
   * offer list
   */
  public async findAll(
    user: UserInfoEntity,
    queryParams: OfferListRequestDto,
  ): Promise<OfferListResponseDto> {
    let data: OfferListResponseDto = { offerList: [] };

    await this.databaseService.executeQueries(async client => {
      const result =
        user.type === UserType.RESEARCHER &&
        queryParams.sortField === OfferSortFields.RECOMMENDED
          ? await this.offerSelectSql.findAllMatchedItems(
              client,
              user,
              queryParams,
            )
          : await this.offerSelectSql.findAllItems(client, user, queryParams);

      data = new OfferListResponseDto(result);
    });

    return data;
  }

  /**
   * offer detail
   */
  public async findOne(
    urlParam: UrlRouteParamDto,
  ): Promise<OfferDetailResponseDto> {
    let data: OfferDetailResponseDto;
    await this.databaseService.executeQueries(async client => {
      const result = await this.offerSelectSql.findOneItem(client, urlParam);

      if (!result) {
        throw new NotFoundException('Offer not found');
      }
      data = new OfferDetailResponseDto(result);
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return data!;
  }

  /*
   * add offer
   */
  public async addOne(
    bodyParams: OfferAddRequestDto,
  ): Promise<OfferIdResponseDto> {
    let data: OfferIdResponseDto = {};
    await this.databaseService.executeQueries(async client => {
      const result = await this.offerInsertSql.addOne(client, bodyParams);

      if (!result) {
        throw new NotFoundException('Offer not found.');
      }

      data = new OfferIdResponseDto(result);
    });

    return data;
  }

  /**
   * update offer
   */
  public async updateOne(
    bodyParams: OfferUpdateRequestDto,
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    let data: OfferIdResponseDto = {};
    await this.databaseService.executeQueries(async client => {
      const result = await this.offerUpdateSql.updateOne(
        client,
        bodyParams,
        urlParam,
      );

      if (!result) {
        throw new NotFoundException('Offer not found.');
      }

      data = new OfferIdResponseDto(result);
    });

    return data;
  }

  /*
   * delete offer
   */
  public async deleteOne(
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    let data: OfferIdResponseDto = {};
    await this.databaseService.executeQueries(async client => {
      const result = await this.offerDeleteSql.deleteOne(client, urlParam);

      if (!result) {
        throw new NotFoundException('Offer not found.');
      }

      data = new OfferIdResponseDto(result);
    });

    return data;
  }
}
