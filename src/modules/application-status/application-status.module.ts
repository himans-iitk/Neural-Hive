import { Module } from '@nestjs/common';
import { ApplicationStatusController } from './application-status.controller';
import { ApplicationStatusService } from './application-status.service';
import { ApplicationStatusRepository } from '@/resources/repositories/application-status.repository';
import { ApplicationStatusInsertSql } from '@/resources/repositories/sql/application-status/application-status-insert.sql';
import { ApplicationStatusUpdateSql } from '@/resources/repositories/sql/application-status/application-status-update.sql';

@Module({
  controllers: [ApplicationStatusController],
  providers: [
    ApplicationStatusService,
    ApplicationStatusRepository,
    ApplicationStatusInsertSql,
    ApplicationStatusUpdateSql,
  ],
})
export class ApplicationStatusModule {}
