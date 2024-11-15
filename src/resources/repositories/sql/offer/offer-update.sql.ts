import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { OfferIdResponseDto } from '@/resources/dtos/offer/offer-id-response.dto';
import { OfferUpdateRequestDto } from '@/resources/dtos/offer/offer-update-request.dto';
import { UrlRouteParamDto } from '@/resources/dtos/url-route-param.dto';

/**
 * @export
 * @class OfferUpdateSql
 */
@Injectable()
export class OfferUpdateSql {
  constructor(private databaseService: DatabaseService) {}

  public async updateOne(
    client: PoolClient,
    bodyParams: OfferUpdateRequestDto,
    urlParam: UrlRouteParamDto,
  ): Promise<OfferIdResponseDto> {
    const updateData = {
      offer_name: bodyParams.offerName,
      matching_offer_name: bodyParams.matchingOfferName,
      sub_offer_name: bodyParams.subOfferName,
      offer_status_id: bodyParams.offerStatusId,
      release_day: bodyParams.releaseDay,
      funding_agency: bodyParams.fundingAgency,
      offer_fiscal_year: bodyParams.offerFiscalYear,
      application_unit: bodyParams.applicationUnit,
      organization_approval_flag: bodyParams.organizationApprovalFlag,
      start_accepting_timestamp: bodyParams.startAcceptingTimestamp,
      end_accepting_timestamp: bodyParams.endAcceptingTimestamp,
      research_fields: bodyParams.researchFields,
      offer_keyword: bodyParams.offerKeyword,
      research_period: bodyParams.researchPeriod,
      business_classification_category:
        bodyParams.businessClassificationCategory,
      applicable_target_category: bodyParams.applicableTargetCategory,
      limit_application_amount_min: bodyParams.limitApplicationAmountMin,
      limit_application_amount_max: bodyParams.limitApplicationAmountMax,
      limit_indirect_ration: bodyParams.limitIndirectRation,
      limit_comission_fee: bodyParams.limitComissionFee,
      offer_abstract: bodyParams.offerAbstract,
      matching_offer_abstract: bodyParams.matchingOfferAbstract,
      applicable_target: bodyParams.applicableTarget,
      offerer_department: bodyParams.offererDepartment,
      offerer_name: bodyParams.offererName,
      offerer_phone_number: bodyParams.offererPhoneNumber,
      offerer_fax_number: bodyParams.offererFaxNumber,
      offerer_email: bodyParams.offererEmail,
      offer_guide_url: bodyParams.offerGuideUrl,
      org_offer_url: bodyParams.orgOfferUrl,
      source: bodyParams.source,
      insufficient_flag: bodyParams.insufficientFlag,
      offer_search_text: [
        bodyParams.fundingAgency,
        bodyParams.offerName,
        bodyParams.offerAbstract,
        // マッチング用の項目が異なる場合にのみ連結する
        bodyParams.matchingOfferName === bodyParams.offerName
          ? ''
          : bodyParams.matchingOfferName,
        bodyParams.matchingOfferAbstract === bodyParams.offerAbstract
          ? ''
          : bodyParams.matchingOfferAbstract,
        bodyParams.researchFields,
      ].join(' '),
    };

    const updates = Object.entries(updateData).map(([col, value]) => {
      return format('%I = %L', col, value, col);
    });

    const sql = `
      UPDATE m_offers_front
      SET
        %s,
        updated_timestamp = CURRENT_TIMESTAMP
      WHERE offer_id = %L AND delete_flag = FALSE
      RETURNING offer_id;
    `;

    const data = await this.databaseService.queryWithReturn(
      client,
      format(sql, updates, urlParam.id),
    );

    return data[0];
  }
}
