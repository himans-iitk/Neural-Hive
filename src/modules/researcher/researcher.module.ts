import { Module } from '@nestjs/common';
import { ResearcherController } from './researcher.controller';
import { ResearcherService } from './researcher.service';
import { ResearcherRepository } from '@/resources/repositories/researcher.repository';
import { ResearcherSelectSql } from '@/resources/repositories/sql/researcher/researcher-select.sql';

@Module({
  controllers: [ResearcherController],
  providers: [ResearcherService, ResearcherRepository, ResearcherSelectSql],
})
export class ResearcherModule {}
