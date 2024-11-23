# Token Issue

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/token/issue)

## 概要

トークンリクエストの成功レスポンスを生成するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/token/issue

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名      | データ型 | 必須 | 説明                                                                                               |
| ----------------- | -------- | ---- | -------------------------------------------------------------------------------------------------- |
| ticket            | string   | Yes  | Authlete `/auth/token` API から発行されたチケット                                                  |
| subject           | string   | Yes  | 認証されたユーザーのサブジェクト（一意の識別子）                                                   |
| properties        | object[] | No   | 新しく作成されるアクセストークンに関連付ける追加プロパティ（`application/json`形式でのみ受け付け） |
| properties.key    | string   | -    | プロパティのキー                                                                                   |
| properties.value  | string   | -    | プロパティの値                                                                                     |
| properties.hidden | boolean  | -    | クライアントアプリケーションからの可視性フラグ（`true`の場合は非表示）                             |
| jwtAtClaims       | string   | No   | `JWT`アクセストークンのペイロード部分に追加されるクレーム                                          |
| accessToken       | string   | No   | API 呼び出しの結果として発行される可能性のあるアクセストークンの表現                               |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名          | データ型 | 説明                                                                                                     |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| resultCode            | string   | API 呼び出しの結果コード                                                                                 |
| resultMessage         | string   | API 呼び出しの結果を説明する短いメッセージ                                                               |
| action                | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`OK`                            |
| responseContent       | string   | クライアントアプリケーションに返すべきコンテンツ（`JSON`形式）                                           |
| accessToken           | string   | 新しく発行されたアクセストークン（`action`が`OK`の場合のみ）                                             |
| accessTokenExpiresAt  | integer  | アクセストークンの有効期限（`UNIX`タイムスタンプ）                                                       |
| accessTokenDuration   | integer  | アクセストークンの有効期間（秒）                                                                         |
| refreshToken          | string   | リフレッシュトークン（`action`が`OK`でサービスがリフレッシュトークンフローをサポートする場合のみ）       |
| refreshTokenExpiresAt | integer  | リフレッシュトークンの有効期限（`UNIX`タイムスタンプ）                                                   |
| refreshTokenDuration  | integer  | リフレッシュトークンの有効期間（秒）                                                                     |
| clientId              | integer  | クライアント ID                                                                                          |
| clientIdAlias         | string   | クライアント ID エイリアス                                                                               |
| clientIdAliasUsed     | boolean  | クライアント ID エイリアスが使用されたかどうか                                                           |
| subject               | string   | アクセストークンのサブジェクト（`Client Credentials Flow`の場合は`null`）                                |
| scopes                | string[] | アクセストークンがカバーするスコープ                                                                     |
| properties            | object[] | アクセストークンに関連付けられた追加プロパティ                                                           |
| jwtAccessToken        | string   | `JWT`形式の新しく発行されたアクセストークン（サービスが`JWT`ベースのアクセストークン発行設定の場合のみ） |
| accessTokenResources  | string[] | アクセストークンのターゲットリソース                                                                     |
| authorizationDetails  | object   | 認可の詳細情報（`OAuth 2.0 Rich Authorization Requests`で定義）                                          |
| serviceAttributes     | object[] | クライアントアプリケーションが属するサービスの属性                                                       |
| clientAttributes      | object[] | クライアントの属性                                                                                       |
| clientEntityId        | string   | クライアントのエンティティ ID                                                                            |
| clientEntityIdUsed    | boolean  | アクセストークンリクエスト時にクライアントのエンティティ ID が使用されたかどうか                         |
| refreshTokenScopes    | string[] | リフレッシュトークンに関連付けられたスコープ                                                             |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/token/issue \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{ "ticket": "p7SXQ9JFjng7KFOZdCMBKcoR3ift7B54l1LGIgQXqEM", "subject": "john" }'
```

## サンプルレスポンス

```json
{
  "resultCode": "A054001",
  "resultMessage": "[A054001] The token request (grant_type=password) was processed successfully.",
  "accessToken": "OthV6TlZ2pPUtlBBvBSGFYzSdgVy87SSIPz2Zjwi-m0",
  "accessTokenDuration": 3600,
  "accessTokenExpiresAt": 1640331371876,
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
  "refreshToken": "ICPN0-sG3BH4szqiNqaFHZrWUGt7e0zaPuhys3ejQow",
  "refreshTokenDuration": 3600,
  "refreshTokenExpiresAt": 1640331371876,
  "responseContent": "{\"access_token\":\"OthV6TlZ2pPUtlBBvBSGFYzSdgVy87SSIPz2Zjwi-m0\",\"refresh_token\":\"ICPN0-sG3BH4szqiNqaFHZrWUGt7e0zaPuhys3ejQow\",\"scope\":null,\"token_type\":\"Bearer\",\"expires_in\":3600}",
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
