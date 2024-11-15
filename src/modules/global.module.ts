import { Module, Global } from '@nestjs/common';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';
import { DatabaseService } from '@/common/providers/database.service';

@Global() // グローバル宣言することでいちいち該当moduleのimportsに書かなくてよくなる.
@Module({
  providers: [DatabaseService, CloudLoggerService],
  exports: [DatabaseService, CloudLoggerService],
})
export class GlobalModule {}
