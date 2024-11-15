import { Injectable } from '@nestjs/common';

import { PoolClient } from 'pg';
import format = require('pg-format');
import { DatabaseService } from '@/common/providers/database.service';
import { UserInfoEntity } from '@/resources/entities/user-info/user-info.entity';

@Injectable()
export class UserInfoSelectSql {
  constructor(private databaseService: DatabaseService) {}

  public async findOneItem(
    client: PoolClient,
    email: string,
  ): Promise<UserInfoEntity> {
    const sql = `
      SELECT
        usr.user_id,
        usr.email,
        usr.researcher_id,
        usr.type
      FROM
        m_users usr
      WHERE
        usr.email = %L;
    `;

    const data = await this.databaseService.queryWithReturn<UserInfoEntity>(
      client,
      format(sql, email),
    );

    return data[0];
  }
}
