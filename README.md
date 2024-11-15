# 帝京大学 ​ 研究システム API

## 環境構築

### 1. 開発ツール

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/) をインストールする。

_構文チェックやコードフォーマッタなど。VS Code でこのプロジェクトを開いた際に推奨プラグインとして表示されるので、それを全てインストールする。_

### 2. Git Clone

- ソースコード一式をローカルに Clone する。

```bash
git clone https://innersource.accenture.com/scm/edudx/teikyo_research_api.git
```

### 3. nodenv,fnm

- 他のプロジェクトの開発や、今後の npm の複数バージョン管理も考慮して、nodenv,fnm をインストールする。
- ［Windows］[fnm github ページ](https://github.com/Schniz/fnm#using-cargo-linuxmacoswindows)から fnm をインストールする。指定されている`cargo`は[Rust のパッケージマネージャー](https://www.rust-lang.org/ja/tools/install)である。[Scoop](https://github.com/ScoopInstaller/Scoop), [Chocolatey](https://chocolatey.org/install#installing-chocolatey)を利用しても良い。
- ［Mac］[anyenv](https://github.com/anyenv/anyenv) から nodenv をインストールする。
- Windows 向けにこれまで推奨とされていた `nodist` は既に更新が終了されているため非推奨となる。

fnm でのインストール

```bash
fnm install 18.15.0
```

nodenv でのインストール

```bash
nodenv install 18.15.0
```

### 4. pnpm の導入

- このアーキでは、Node.js のパッケージマネージャは、`npm` の代わりに[pnpm](https://pnpm.io/)を採用する。
  以下のコマンドでインストールする。

```bash
corepack enable
corepack prepare pnpm@8.5.1 --activate
```

> ※[corepack](https://nodejs.org/api/corepack.html)は node.js 公式の、パッケージマネージャを管理するパッケージマネージャである。

### 5. npm パッケージをインストール

- @nestjs/cli をインストールする。

```bash
pnpm i -g @nestjs/cli@9.3.0
```

- 下記コマンドで、実行に必要なパッケージのインストールをする。

```bash
pnpm run ci
```

### 6. デバック実行

- 下記コマンドで、Nest.js がデバッグモードで起動する。

```bash
pnpm run start:dev
```

ローカル実行時の URL： <http://localhost:3000/{api_endpoint}>

### 7. VSCode からのステップ実行

- Run & Debug より、`Debug Nest Framework`を選択することで、VSCode からデバッグモードで NestJS が立ち上がり、ステップ実行が VSCode から可能となる。
- Run & Debug より、`Debug Jest Tests`を選択することで、Jest のテストのステップ実行が VSCode から可能となる。

## 開発

### 1. Code Formatter

基本的にファイルをセーブする際に自動的に format してくれるが、手動で動かしたい場合は以下のコマンドを利用する。

```text
On Windows Shift + Alt + F
On Mac     Shift + Option + F
```

### 2. Testing

#### 2.1 Unit Tests

- `pnpm test`で Jest による UT が実行される。
- CI 環境で実行するには、`pnpm test:ci`を実行する。結果が `reports/ut-results.xml`に JUnit 形式で出力される。
- CI モードのみ`coverage/`に istanbul(lcov) 形式でカバレッジレポートが出力される。

#### 2.2 End-To-End Tests

- `pnpm run test:e2e`で Playwright による E2E が実行される。
- CI 環境で実行するには、`pnpm test:e2e:ci`を実行する。結果が `reports/e2e-results.xml`に JUnit 形式で出力される。

### 3. CI/CD

#### 3.1 Linter の実行

- `pnpm run lint`で ESLint による Linter が実行される。

#### 3.2 脆弱性確認

- `pnpm run audit` で現在使われているパッケージに対する OWASP 基準での脆弱性チェックが実行される。
- Junit 基準でのフォーマットのレポートが `reports/scan_node_modules.xml` に出力される。

#### 3.3 資源の本番向けビルド

- `pnpm run build` で現在の資源をビルドする。
- ビルド資源は `dist` フォルダに配置される。
- ビルドされた資源を動かす場合、 `node dist/main` コマンドを利用する。

### 4. dts-gen

周辺ライブラリが Typescript の対応を実施していない場合、 `dts-gen` コマンドを利用し、`d.ts` ファイルを作成する。

作られたファイルは、 `src/types/` ディレクトリに配置する。
なお、VSCode は再起動しないと正しく `d.ts` を読み込まない事に注意。

```bash
pnpm run dts-gen -- -m {d.tsを作りたいnpm名}
```

### 5. Openapi との連携

#### 5.1. Swagger UI の起動

`pnpm run start:dev` でアプリを起動した場合、以下の URL で Swagger UI が立ち上がる。
これは NestJS が定める[Decorator より自動生成される。](https://docs.nestjs.com/openapi/types-and-parameters)つまり、API の Controller を実装すれば API のドキュメントが完成する。
<http://localhost:3000/api>

Json や Yaml 形式で出力したい場合は以下の URL を叩く。
<http://localhost:3000/api-yaml>
<http://localhost:3000/api-json>

#### 5.2. openapi 定義

逆に OpenAPI 定義をすでに別システムで作っている場合は、定義から NestJS の API を自動生成することができる。
ただし完全な出力は難しいため、適宜修正を行うこと。

```bash
pnpm run openapi-gen -- -i {OpenAPIの定義が置いてあるパス}/base.yaml -output ./generated -g typescript-nestjs
```

### 6. 利用ライブラリの一覧とライセンス情報出力

以下のコマンドで`licenses.csv`が出力される。

```bash
pnpm run license-checker
```
