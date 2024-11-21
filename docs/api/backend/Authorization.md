# Authorization

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/authorization)

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるための情報を提供するエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                                                                                                                                                           |
| ------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| parameters   | string   | Yes  | OAuth 2.0 認可リクエストのパラメータ。<br>- `GET`リクエストの場合：クエリ文字列全体<br>- `POST`リクエストの場合：`application/x-www-form-urlencoded`形式のリクエストボディ全体 |
| context      | string   | No   | オプションのコンテキスト情報                                                                                                                                                   |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名                             | データ型 | 説明                                                                                                                                        |
| ---------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCode                               | string   | API 呼び出しの結果コード                                                                                                                    |
| resultMessage                            | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                  |
| action                                   | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`BAD_REQUEST`、`LOCATION`、`FORM`、`NO_INTERACTION`、`INTERACTION` |
| service.number                           | integer  | サービスの連番（Authlete によって割り当てられる）                                                                                           |
| service.serviceName                      | string   | サービス名                                                                                                                                  |
| service.issuer                           | string   | サービスの発行者識別子（`https://`で始まる URL）                                                                                            |
| service.apiKey                           | integer  | Authlete API 呼び出しに使用されるサービス ID                                                                                                |
| service.supportedGrantTypes              | string[] | サービスがサポートするグラントタイプ<br>許可値: `AUTHORIZATION_CODE`、`IMPLICIT`、`PASSWORD`、`CLIENT_CREDENTIALS`等                        |
| service.supportedResponseTypes           | string[] | サポートするレスポンスタイプ<br>許可値: `NONE`、`CODE`、`TOKEN`、`ID_TOKEN`等                                                               |
| service.supportedAcrs                    | string[] | サポートする認証コンテキストクラス参照値                                                                                                    |
| service.supportedTokenAuthMethods        | string[] | トークンエンドポイントでサポートする認証方式<br>許可値: `NONE`、`CLIENT_SECRET_BASIC`、`CLIENT_SECRET_POST`等                               |
| client.number                            | integer  | クライアントの連番                                                                                                                          |
| client.clientId                          | integer  | Authlete API 呼び出しで使用されるクライアント識別子                                                                                         |
| client.clientIdAlias                     | string   | OAuth/OIDC 呼び出しで使用されるクライアント ID（`clientId`の文字列版）                                                                      |
| client.clientName                        | string   | クライアントアプリケーション名                                                                                                              |
| client.clientNames                       | object[] | 言語タグ付きのクライアント名                                                                                                                |
| client.clientNames.tag                   | string   | 言語タグ                                                                                                                                    |
| client.clientNames.value                 | string   | その言語での名称                                                                                                                            |
| client.clientType                        | string   | クライアントタイプ<br>許可値: `PUBLIC`、`CONFIDENTIAL`                                                                                      |
| client.logoUri                           | string   | クライアントのロゴ画像 URL                                                                                                                  |
| client.description                       | string   | クライアントの説明                                                                                                                          |
| display                                  | string   | クライアントアプリケーションが要求する表示モード<br>許可値: `PAGE`、`POPUP`、`TOUCH`、`WAP`                                                 |
| maxAge                                   | integer  | 最大認証経過時間（秒）                                                                                                                      |
| scopes                                   | object[] | 要求されたスコープ情報                                                                                                                      |
| scopes.name                              | string   | スコープ名                                                                                                                                  |
| scopes.description                       | string   | スコープの説明                                                                                                                              |
| uiLocales                                | string[] | UI のロケール設定（例: `en-US`、`ja-JP`）                                                                                                   |
| claimsLocales                            | string[] | クレーム値の言語タグ                                                                                                                        |
| claims                                   | object   | 要求されたクレーム情報                                                                                                                      |
| claims.userinfo                          | object   | `UserInfo`エンドポイントから要求されるクレーム                                                                                              |
| claims.id_token                          | object   | `ID`トークンに含めることが要求されるクレーム                                                                                                |
| acrValues                                | string[] | 要求された認証コンテキストクラス参照値                                                                                                      |
| subject                                  | string   | サブジェクト（ユーザー識別子）                                                                                                              |
| loginHint                                | string   | ログイン識別子のヒント                                                                                                                      |
| prompts                                  | string[] | プロンプトパラメータの値<br>許可値: `NONE`、`LOGIN`、`CONSENT`、`SELECT_ACCOUNT`                                                            |
| requestObjectPayload                     | string   | リクエストオブジェクトのペイロード部分                                                                                                      |
| resources                                | string[] | リソースインジケータ                                                                                                                        |
| purpose                                  | string   | ユーザーデータを取得する目的の説明（3-300 文字）                                                                                            |
| responseContent                          | string   | クライアントアプリケーションに返すべきコンテンツ                                                                                            |
| ticket                                   | string   | Authlete が発行したチケット                                                                                                                 |
| authorizationDetails.elements            | object[] | 認可の詳細情報                                                                                                                              |
| authorizationDetails.elements.type       | string   | 認可データの種類（必須）                                                                                                                    |
| authorizationDetails.elements.locations  | string[] | リソースまたはリソースサーバーの場所を示す`URI`配列                                                                                         |
| authorizationDetails.elements.actions    | string[] | リソースで実行される操作の種類                                                                                                              |
| authorizationDetails.elements.dataTypes  | string[] | リソースから要求されるデータの種類                                                                                                          |
| authorizationDetails.elements.identifier | string   | 特定のリソースの識別子                                                                                                                      |
| authorizationDetails.elements.privileges | string[] | リソースで要求される権限のタイプまたはレベル                                                                                                |
| dynamicScopes                            | object[] | 動的スコープ情報                                                                                                                            |
| dynamicScopes.name                       | string   | スコープ名                                                                                                                                  |
| dynamicScopes.value                      | string   | スコープ値                                                                                                                                  |
| grantId                                  | string   | グラント ID                                                                                                                                 |
| grant.scopes                             | object[] | グラントに関連付けられたスコープ情報                                                                                                        |
| grant.claims                             | string[] | グラントに関連付けられたクレーム                                                                                                            |
| grantSubject                             | string   | グラントを与えたユーザーのサブジェクト                                                                                                      |
| acr                                      | string   | 認証コンテキストクラス参照値                                                                                                                |
| authTime                                 | integer  | ユーザー認証が実行された時刻（`UNIX`タイムスタンプ）                                                                                        |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{
  "parameters": "response_type=code&client_id={クライアントID}&redirect_uri=eudi-openid4ci://authorize/&scope=org.iso.18013.5.1.mDL+openid&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256"
}'
```

## サンプルレスポンス

```json
{
  "resultCode": "A004001",
  "resultMessage": "[A004001] Authlete has successfully issued a ticket to the service (API Key = 21653835348762) for the authorization request from the client (ID = 26478243745571). [response_type=code, openid=false]",
  "acrEssential": false,
  "action": "INTERACTION",
  "client": {
    "clientId": 26478243745571,
    "clientIdAlias": "my-client",
    "clientIdAliasEnabled": true,
    "clientName": "My updated client",
    "logo_uri": "https://my-client.example.com/logo.png",
    "number": 6164
  },
  "clientIdAliasUsed": false,
  "display": "PAGE",
  "maxAge": 0,
  "scopes": [
    {
      "defaultEntry": false,
      "description": "A permission to read your history.",
      "name": "history.read"
    },
    {
      "defaultEntry": false,
      "description": "A permission to read your timeline.",
      "name": "timeline.read"
    }
  ],
  "service": {
    "apiKey": 21653835348762,
    "clientIdAliasEnabled": true,
    "number": 5041,
    "serviceName": "My updated service"
  },
  "ticket": "hXoY87t_t23enrVHWxpXNP5FfVDhDypD3T6H6lt4IPA"
}
```
