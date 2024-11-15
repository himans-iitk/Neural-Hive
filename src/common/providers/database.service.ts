/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  GatewayTimeoutException,
} from '@nestjs/common';
import { Pool, PoolClient, QueryResultRow, types } from 'pg';
import { CloudLoggerService } from '@/common/providers/cloud-logger.service';
import { DateUtil } from '@/common/utils/date.util';

// Postgresの一部型はNode上で、例えばDateやtimestampがUTC表示になるなど形式が異なるので変換が必要.
// 1082 for date type (UTCに変換しない、さらにTつける)
types.setTypeParser(1082, function (stringValue) {
  return DateUtil.format(stringValue);
});

// 1114 for timestamp without time zone type(UTCに変換しない、さらにTつける)
types.setTypeParser(1114, function (stringValue) {
  return DateUtil.format(stringValue);
});

// 1700 for numeric type (文字列表示になる為数値に変換)
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

// 20 for numeric type (文字列表示になる為数値に変換)
types.setTypeParser(20, function (val) {
  return parseInt(val);
});

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private pool!: Pool;
  constructor(private logger: CloudLoggerService) {}

  public async onModuleInit(): Promise<void> {
    this.logger.verbose(
      `DatabaseService onModuleInit start: ${process.env.NODE_ENV}, ${process.env.DATABASE_HOST}`,
    );

    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // statement_timeout、connectionTimeoutMillisはmain.tsのserver.setTimeoutと同じ設定する.
      statement_timeout: Number(process.env.DATABASE_TIMEOUT_MS) || 25000, // SQLが実行されてから終了するまでのタイムアウト.
      // query_timeout: 1000, SQL発行から実際に実行されるまでのタイムアウト、statement_timeoutで事足りそうなので使用しない.
      connectionTimeoutMillis: Number(process.env.DATABASE_TIMEOUT_MS) || 25000, // プールクライアントに接続するまでのタイムアウト.
      // idle_in_transaction_session_timeout: 10000, ライブラリ側でエラーになりサーバ落ちる、うまくハンドリングできないので使用しない.
      // PostgreSQLのプール設定.
      idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MS) || 600000, // 自動切断時間(ミリ秒)
      max: Number(process.env.DATABASE_CONNECTION_MAX) || 20, // 保持するコネクション数.
      // min: 2, // 必要なら設定する、現状は未設定.
    });

    // Connect時にSchemaをセット
    this.pool.on('connect', client => {
      client.query(`SET search_path TO ${process.env.DATABASE_TABLE_SCHEMA}`);
    });
  }

  public async onApplicationShutdown(signal?: string): Promise<void> {
    await this.pool.end();
    this.logger.verbose(`Shutting down on signal ${signal}`, {
      pool: this.pool,
    });
  }

  //
  /**
   * SELECT文1回でデータ取得する場合に使用
   * @param sql SQL文
   * @param values $1,$2,...を順番に配列に指定
   * @returns T[] ※countなどとる場合は取得後の変数[0]にてデータ取得する
   */
  public async executeQueryWithReturn<T extends QueryResultRow>(
    sql: string,
    values?: any[],
  ): Promise<T[]> {
    let client: PoolClient | undefined;

    try {
      client = await this.pool.connect(); // プール枯渇時はconnectionTimeoutMillis経過でタイムアウトエラー.
      return await this.queryWithReturn<T>(client, sql, values);
    } catch (error: any) {
      // タイムアウト系のエラーは504にする(main.tsのserver.setTimeoutでソケットが切れるのでフロントには504は返らない).
      if (error?.message?.includes('timeout'))
        throw new GatewayTimeoutException(error);
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  //
  /**
   * SELECT文複数回読んだり、トランザクション処理する場合に使用（queries内で直接client.query()を使用しないこと）.
   * @param queries client.queryではなくDatabaseService.queryWithReturn or queryWithoutReturnを使う
   * @param isTransaction トランザクション処理の場合はtrueを指定する
   */
  public async executeQueries(
    queries: (client: PoolClient) => Promise<void>,
    isTransaction = false,
  ): Promise<void> {
    let client: PoolClient | undefined;

    try {
      client = await this.pool.connect(); // プール枯渇時はconnectionTimeoutMillis経過でタイムアウトエラー.
      if (isTransaction) await client.query('BEGIN');
      await queries(client);
      if (isTransaction) await client.query('COMMIT');
    } catch (error: any) {
      if (client && isTransaction) await client.query('ROLLBACK');
      // タイムアウト系のエラーは504にする(main.tsのserver.setTimeoutでソケットが切れるのでフロントには504は返らない).
      if (error?.message?.includes('timeout'))
        throw new GatewayTimeoutException(error);
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  //
  /**
   * executeQueriesのqueries(client)で使用する.
   * SELECT文など戻り値を参照するクエリを実行する場合.
   * @param client PoolClient
   * @param sql SQL文
   * @param values $1,$2,...を順番に配列に指定
   * @param maskedValueIndexes マスクしたい値のインデックス(0,1,...)配列を指定
   * @returns T[]
   */
  public async queryWithReturn<T extends QueryResultRow>(
    client: PoolClient,
    sql: string,
    values?: any[],
  ): Promise<T[]> {
    this.logger.verbose(sql, { values });
    const data = await client.query<T>(sql, values);
    return data.rows;
  }

  //
  /**
   * executeQueriesのqueries(client)で使用する.
   * DELETE文など戻り値を参照する必要がないクエリを実行する場合.
   * @param client PoolClient
   * @param sql SQL文
   * @param values $1,$2,...を順番に配列に指定
   * @param maskedValueIndexes マスクしたい値のインデックス(0,1,...)配列を指定
   */
  public async queryWithoutReturn(
    client: PoolClient,
    sql: string,
    values?: any[],
  ): Promise<void> {
    this.logger.verbose(sql, { values });
    await client.query(sql, values);
  }

  /**
   * LIKEやILIKEを使う際に特殊文字（%と_）をエスケープする。
   * @param keyword エスケープする文字列
   * @returns エスケープされた文字列
   */
  public escapeStringForLike(keyword: string): string {
    return keyword.replace(/_/g, '\\_').replace(/%/g, '\\%');
  }
}
