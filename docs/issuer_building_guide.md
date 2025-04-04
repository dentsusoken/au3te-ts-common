# Issuer 構築

- [Issuer 構築](#issuer-構築)
  - [クライアントの登録](#クライアントの登録)
  - [Issuer のデプロイ（Cloudflare Workers)](#issuer-のデプロイcloudflare-workers)
    - [モジュールのクローン](#モジュールのクローン)
    - [KV の作成](#kv-の作成)
    - [設定ファイルを修正](#設定ファイルを修正)
    - [デプロイ](#デプロイ)
    - [シークレットの設定](#シークレットの設定)

## クライアントの登録

Authlete コンソール上で、クライアント（必要に応じて組織も）の登録を行う。
必要な設定情報

- サービス ID
- サービスのアクセストークン
- クライアント ID
- リダイレクト URL

設定方法は[こちら](https://www.authlete.com/ja/developers/tutorial/signup/)

## Issuer のデプロイ（Cloudflare Workers)

### モジュールのクローン

```bash
git clone https://github.com/dentsusoken/au3te-ts-hono
```

### KV の作成

作成済みの場合は不要。
コマンド実行後 ID が表示されるので控えておく。

```bash
npm i -g wrangler
npx wrangler login
npx wrangler kv namespace create "SESSION_KV"
```

### 設定ファイルを修正

```toml
# au3te-ts-hono/wrangler.toml

name = "<Issuerの名前>" # 適宜設定する

...

[[kv_namespaces]]
binding = "SESSION_KV"
id = "<KVのID>" # 控えておいたIDを設定する
```

### デプロイ

au3te-ts-hono ディレクトリで shell/deploy_issuer.[sh|bat] を実行する。
(Linux、MacOS の場合は deploy_issuer.sh を実行する。Windows の場合は deploy_issuer.bat を実行する。)

```bash
# Linux、MacOS の場合
sh ./shell/deploy_issuer.sh
```

```bash
# Windows の場合
./shell/deploy_issuer.bat
```

### シークレットの設定

[Cloudflare](https://dash.cloudflare.com/)のダッシュボードにアクセスし、画面左側のメニューから、`Compute` -> `Workers & Pages`を選択。
デプロイされた Workers をクリックする。
画面上部のメニューから`Settings`を選択。

`Variables and Secrets`の`Add`をクリックしてシークレットを追加する。

| Type     | Variable name  | Value                                                      |
| -------- | -------------- | ---------------------------------------------------------- |
| `Secret` | `API_BASE_URL` | Authlete のクラスターの URL（例：https://jp.authlete.com） |
| `Secret` | `API_VERSION`  | `V3`                                                       |
| `Secret` | `API_KEY`      | Authlete コンソールのサービス ID                           |
| `Secret` | `ACCESS_TOKEN` | Authlete コンソールで発行したサービスアクセストークン      |
