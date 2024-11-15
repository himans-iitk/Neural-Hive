<a name="2.0.1"></a>

# 2.0.1

## Fixes

- Windows 環境下でのビルドが通らない問題を修正
- SWC の影響で day.js の読み込みががエラーとなっていた問題を修正

<a name="2.0.0"></a>

# 2.0.0

## Changes

- Formatter 有効化
- pnpm 化
- nvm -> nodenv に
- import 文のソート処理追加
- eslint/prettier のルール修正
- 脆弱性 CVE-2019-18413 対応 https://github.com/nestjs/nest/issues/8562
- Audit.js による脆弱性診断処理追加
- 利用ライブラリ一覧出力コマンドの追加
- d.ts 自動生成コマンドの追加
- Node.js のバージョンをアップデート(18.15.0)
- マルチデータベース対応
- OpenAPI(Swagger)対応。開発時に http://localhost:3000/api へアクセスすることで立ち上がる。
- Jest による UT の高速化
- any 使いすぎ問題への対応（"strict": true "strictNullChecks": true）
- Prisma の Schema 定義から DTO を生成できるように pnpm run prisma:gen。
- すでに存在する DB 情報から schema.prisma を構築する prisma:pull コマンドの追加 (https://www.prisma.io/docs/concepts/components/introspection#the-prisma-db-pull-command)。
- VSCode 経由のデバッグ時に SourceMap が有効にならない問題を改善。ブレークポイントが打てるように。
- Jest による Test を VSCode から実施できるように。同時にブレークポイント打ってデバッグもできるように。
- i18n に対応
- ACTS 基準にエラーレスポンスを修正
- SQL ログ出力処理に対応
- SQL ログのマスク処理に対応
- サンプル SQL のエラー修正
- HMR に対応
- ビルド処理を SWC に変更
- asciidoc の pdf 出力に対応
- 開発ドキュメントに全体的な開発の流れ、Prisma による DB 管理などを記載
- GCPLogger を CloudLogger に変更
