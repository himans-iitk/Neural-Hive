import sanitizeHtml from 'sanitize-html';

export class SanitizeUtil {
  public static sanitizeHtml(value: string): string {
    return sanitizeHtml(value, sanitizeOptions);
  }
}

// サニタイズの設定（フロント側に合わせる）.
const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['div', 'p', 'a', 'strong', 'br'],
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    a: ['href', 'name', 'target'],
  },
  selfClosing: ['br'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
};
