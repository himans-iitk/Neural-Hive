import { SanitizeUtil } from '@/common/utils/sanitize.util';

describe('SanitizeUtil', () => {
  it('should be defined', () => {
    expect(new SanitizeUtil()).toBeDefined();
  });

  describe('sanitizeHtml function', () => {
    // 型を細かくチェックするようになった為、このテストは削除
    // it('should be empty', () => {
    //   const value = undefined;
    //   expect(SanitizeUtil.sanitizeHtml(value)).toEqual('');
    // });
    it('should be empty', () => {
      const value = '';
      expect(SanitizeUtil.sanitizeHtml(value)).toEqual('');
    });
    it('should be empty', () => {
      const value = `<img\/onerror='alert(0)'src=>`;
      expect(SanitizeUtil.sanitizeHtml(value)).toEqual('');
    });
    it('should be not discard', () => {
      const value = `<p><strong>【楊】問いかけ配信1000000007（２）</strong></p><p></p><p>&lt;script&gt;alert(document.cookie);&lt;/script&gt;</p><p></p><p>&lt;a href=javascript:alert(\"ALERT\");&gt;アラート&lt;/a&gt;</p><p></p>`;
      expect(SanitizeUtil.sanitizeHtml(value)).toEqual(value);
    });
    it('should be discard', () => {
      // <br> は <br />になり、無効なタグや属性値は取り除かれる.
      const value = `<p><strong>【楊】問いかけ配信1000000007（２）</strong></p><p><br></p><p><script>alert(document.cookie);</script></p><p><br></p><p><a href=javascript:alert(\"ALERT\"); name=\"aaa\" target=\"_blank\" title=\"bbb\">アラート</a></p><p><br></p>`;
      expect(SanitizeUtil.sanitizeHtml(value)).toEqual(
        `<p><strong>【楊】問いかけ配信1000000007（２）</strong></p><p><br /></p><p></p><p><br /></p><p><a name=\"aaa\" target=\"_blank\">アラート</a></p><p><br /></p>`,
      );
    });
  });
});
