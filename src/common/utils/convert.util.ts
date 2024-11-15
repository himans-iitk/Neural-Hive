/* eslint-disable @typescript-eslint/no-explicit-any */
// 各種コードで気軽に使いたいのでInjectableではない.
export class ConvertUtil {
  public static maskString(value: any): string {
    return value ? ''.padEnd(value.toString().length, '*') : '';
  }
}
