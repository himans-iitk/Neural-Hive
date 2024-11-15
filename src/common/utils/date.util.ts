import dayjs = require('dayjs');

// Dockerfileでタイムゾーン指定`ENV TZ Asia/Tokyo`すればJSでのタイムゾーンはおそらく不要.
// JSでタイムゾーンを指定して取得する必要があればコメントアウトを戻す.
// import timezone from 'dayjs/plugin/timezone';
// import utc from 'dayjs/plugin/utc';
// dayjs.extend(utc);
// dayjs.extend(timezone);

export const DatetimeFormat = {
  Y_M_D: 'YYYY-MM-DD',
  YMD: 'YYYYMMDD',
  YMDHMS: 'YYYYMMDDHHmmss',
  YMDHM: 'YYYY/MM/DD HH:mm',
  YMDDHMS: 'YYYY/M/D(ddd) H:mm:ss',
  Y_M_D_H_M_S: 'YYYY-MM-DD HH:mm:ss',
  Y_M_D_T_H_M_S: 'YYYY-MM-DDTHH:mm:ss',
} as const;
export type DatetimeFormat =
  (typeof DatetimeFormat)[keyof typeof DatetimeFormat];

export const DayJSUnit = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
  HOUR: 'hour',
  MILLISECONDS: 'milliseconds',
} as const;
export type DayJSUnit = (typeof DayJSUnit)[keyof typeof DayJSUnit];

// database.service.tsのtypes.setTypeParserで使いたいのでInjectableではない.
export class DateUtil {
  public static format(
    dateString: dayjs.ConfigType,
    format: DatetimeFormat = DatetimeFormat.Y_M_D_T_H_M_S,
  ): string {
    return this.isValid(dateString) ? dayjs(dateString).format(format) : '';
  }

  public static getNow(): Date {
    // const now = dayjs().tz('Asia/Tokyo');
    const now = dayjs();
    if (this.isValid(process.env.X_TIMESTAMP)) {
      return dayjs(process.env.X_TIMESTAMP)
        .set('hour', now.hour())
        .set('minute', now.minute())
        .set('second', now.second())
        .set('millisecond', now.millisecond())
        .toDate();
    }
    return now.toDate();
  }

  public static getNowString(
    format: DatetimeFormat = DatetimeFormat.Y_M_D_T_H_M_S,
  ): string {
    return this.format(this.getNow(), format);
  }

  public static get1YearAgoDate(): Date {
    const date = this.getNow();
    return dayjs(date).add(-1, DayJSUnit.YEAR).toDate();
  }

  public static get1YearAgoString(
    format: DatetimeFormat = DatetimeFormat.Y_M_D_T_H_M_S,
  ): string {
    return this.format(this.get1YearAgoDate(), format);
  }

  public static startOf(
    date: dayjs.ConfigType,
    unit: DayJSUnit = DayJSUnit.YEAR,
  ): string {
    return dayjs(date).startOf(unit).format(DatetimeFormat.Y_M_D_T_H_M_S);
  }

  public static add(
    date: dayjs.ConfigType,
    length: number,
    unit: DayJSUnit = DayJSUnit.YEAR,
  ): string {
    return dayjs(date).add(length, unit).format(DatetimeFormat.Y_M_D_T_H_M_S);
  }

  /**
   * date1がdate2よりもあとの日付かどうか（true：date1>date2, false: date1<=date2）
   */
  // eslint-disable-next-line max-len
  public static isAfterDate(
    date1: dayjs.ConfigType,
    date2: dayjs.ConfigType,
    unit: DayJSUnit = DayJSUnit.MILLISECONDS,
  ): boolean {
    return dayjs(date1).isAfter(dayjs(date2), unit);
  }

  public static isSameDatetime(
    date1: dayjs.ConfigType,
    date2: dayjs.ConfigType,
  ): boolean {
    return dayjs(date1).isSame(dayjs(date2));
  }

  // dateStringがundefinedの場合は現在日時になるので先に判定する.
  private static isValid(dateString: dayjs.ConfigType): boolean {
    return !!dateString && dayjs(dateString).isValid();
  }
}
