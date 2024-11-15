/**
 * SQLの整形に利用するClass
 *
 * @export
 * @class SqlUtil
 */
export class SqlUtil {
  /**
   * LIKEやILIKEを使う際に特殊文字（%と_）をエスケープする。
   * @param keyword エスケープする文字列
   * @returns エスケープされた文字列
   */
  public static escapeStringForLike(keyword: string): string {
    return keyword.replace(/_/g, '\\_').replace(/%/g, '\\%');
  }
}
