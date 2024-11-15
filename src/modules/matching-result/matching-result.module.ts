import { Module } from '@nestjs/common';
import { MatchingResultController } from './matching-result.controller';
import { MatchingResultService } from './matching-result.service';
import { MatchingResultRepository } from '@/resources/repositories/matching-result.repository';
import { MatchingResultSelectSql } from '@/resources/repositories/sql/matching-result/matching-result-select.sql';

@Module({
  controllers: [MatchingResultController],
  providers: [
    MatchingResultService,
    MatchingResultRepository,
    MatchingResultSelectSql,
  ],
})
export class MatchingResultModule {}
