# Token

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/token)

## 概要

リクエストパラメータを解析して、トークンリクエストの処理を進めるための情報を提供するエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/token

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名          | データ型 | 必須 | 説明                                                                                                          |
| --------------------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------- |
| parameters            | string   | Yes  | クライアントアプリケーションから受け取ったトークンリクエストボディ（`application/x-www-form-urlencoded`形式） |
| clientId              | string   | No   | `Authorization`ヘッダーから抽出されたクライアント ID（`Basic`認証をサポートする場合）                         |
| clientSecret          | string   | No   | `Authorization`ヘッダーから抽出されたクライアントシークレット（`Basic`認証をサポートする場合）                |
| clientCertificate     | string   | No   | クライアントアプリケーションからの`MTLS`接続で使用されたクライアント証明書                                    |
| clientCertificatePath | string   | No   | クライアント認証時に提示された証明書パス（`PEM`形式）                                                         |
| properties            | string   | No   | アクセストークンに関連付ける追加プロパティ                                                                    |
| dpop                  | string   | No   | クライアントが提示した`DPoP`ヘッダー（署名付き`JWT`）                                                         |
| htm                   | string   | No   | トークンリクエストの`HTTP`メソッド（`DPoP`検証用、デフォルト: `POST`）                                        |
| htu                   | string   | No   | トークンエンドポイントの`URL`（`DPoP`検証用、未指定時はサービスの`tokenEndpoint`プロパティを使用）            |
| accessToken           | string   | No   | API 呼び出しの結果として発行される可能性のあるアクセストークンの表現                                          |
| jwtAtClaims           | string   | No   | `JWT`アクセストークンのペイロード部分に追加されるクレーム                                                     |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名          | データ型 | 説明                                                                                                                                                       |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCode            | string   | API 呼び出しの結果コード                                                                                                                                   |
| resultMessage         | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                                 |
| action                | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`INVALID_CLIENT`、`BAD_REQUEST`、`PASSWORD`、`OK`、`TOKEN_EXCHANGE`、`JWT_BEARER` |
| responseContent       | string   | クライアントアプリケーションに返すべきコンテンツ                                                                                                           |
| username              | string   | パスワードグラント時の`username`パラメータの値                                                                                                             |
| password              | string   | パスワードグラント時の`password`パラメータの値                                                                                                             |
| ticket                | string   | `/auth/token/fail`または`/auth/token/issue` API を呼び出すために必要なチケット                                                                             |
| accessToken           | string   | 新しく発行されたアクセストークン                                                                                                                           |
| accessTokenExpiresAt  | integer  | アクセストークンの有効期限（`UNIX`タイムスタンプ）                                                                                                         |
| accessTokenDuration   | integer  | アクセストークンの有効期間（秒）                                                                                                                           |
| refreshToken          | string   | 新しく発行されたリフレッシュトークン                                                                                                                       |
| refreshTokenExpiresAt | integer  | リフレッシュトークンの有効期限（`UNIX`タイムスタンプ）                                                                                                     |
| refreshTokenDuration  | integer  | リフレッシュトークンの有効期間（秒）                                                                                                                       |
| idToken               | string   | 新しく発行された`ID`トークン（認可リクエストの`response_type`に`code`、`scope`に`openid`が含まれる場合のみ）                                               |
| grantType             | string   | トークンリクエストのグラントタイプ                                                                                                                         |
| clientIdAlias         | string   | トークンリクエスト時に使用されたクライアント ID エイリアス                                                                                                 |
| clientIdAliasUsed     | boolean  | クライアント ID エイリアスが使用されたかどうか                                                                                                             |
| subject               | string   | アクセストークンのサブジェクト（リソースオーナーの ID）                                                                                                    |
| scopes                | string[] | アクセストークンがカバーするスコープ                                                                                                                       |
| properties            | object[] | アクセストークンに関連付けられた追加プロパティ                                                                                                             |
| jwtAccessToken        | string   | `JWT`形式の新しく発行されたアクセストークン（サービスが`JWT`ベースのアクセストークン発行設定の場合のみ）                                                   |
| dpopNonce             | string   | `DPoP proof JWT`で使用される予期される`nonce`値（`DPoP-Nonce HTTP`ヘッダーの値として使用）                                                                 |
| cnonce                | string   | `c_nonce`の値                                                                                                                                              |
| cnonceExpiresAt       | integer  | `c_nonce`の有効期限（`UNIX`タイムスタンプ）                                                                                                                |
| cnonceDuration        | integer  | `c_nonce`の有効期間（秒）                                                                                                                                  |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/token \
-H 'Content-Type: application/json' \
-u 'Authorization: Bearer {アクセストークン}' \
-d '{ "parameters": "grant_type=authorization_code&code=Xv_su944auuBgc5mfUnxXayiiQU9Z4-T_Yae_UfExmo&redirect_uri=https%3A%2F%2Fmy-client.example.com%2Fcb1&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk", "clientId": "57297408867", "clientSecret": "J_3C7P0nDTP7CwCg_HyPQh7bTQ1696CC8GWot-EjesZmdBiU5Gsidq5Ve3tMaN2x2_VcKV1UE1U3ZdGKRuTs7A" }'

```

## サンプルレスポンス

```sh
{
  "resultCode": "A050001",
  "resultMessage": "[A050001] The token request (grant_type=authorization_code) was processed successfully.",
  "accessToken": "C4SrUTijIj2IxqE1xBASr3dxQWgso3BpY49g8CyjGjQ",
  "accessTokenDuration": 3600,
  "accessTokenExpiresAt": 1640252942736,
  "action": "OK",
  "clientAttributes": [
    {
      "key": "attribute1-key",
      "value": "attribute1-value"
    },
    {
      "key": "attribute2-key",
      "value": "attribute2-value"
    }
  ],
  "clientId": 26478243745571,
  "clientIdAlias": "my-client",
  "clientIdAliasUsed": false,
  "grantType": "AUTHORIZATION_CODE",
  "refreshToken": "60k0cZ38sJcpTgdxvG9Sqa-3RG5AmGExGpFB-1imSxo",
  "refreshTokenDuration": 3600,
  "refreshTokenExpiresAt": 1640252942736,
  "responseContent": "{\\\"access_token\\\":\\\"C4SrUTijIj2IxqE1xBASr3dxQWgso3BpY49g8CyjGjQ\\\",\\\"refresh_token\\\":\\\"60k0cZ38sJcpTgdxvG9Sqa-3RG5AmGExGpFB-1imSxo\\\",\\\"scope\\\":\\\"history.read timeline.read\\\",\\\"token_type\\\":\\\"Bearer\\\",\\\"expires_in\\\":3600}",
  "scopes": [
    "history.read",
    "timeline.read"
  ],
  "serviceAttributes": [
    {
      "key": "attribute1-key",
      "value": "attribute1-value"
    },
    {
      "key": "attribute2-key",
      "value": "attribute2-value"
    }
  ],
  "subject": "john"
}
```
