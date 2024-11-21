# Introspection

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/introspection)

## 概要

アクセストークンに関連する情報を取得するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/introspection

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名       | データ型 | 必須 | 説明                                                                                                                                                       |
| ------------------ | -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token              | string   | Yes  | イントロスペクション対象のアクセストークン                                                                                                                 |
| scopes             | string[] | No   | 保護リソースエンドポイントが要求するスコープ名の配列。指定されたスコープがアクセストークンでカバーされていない場合、`action=FORBIDDEN`が返される           |
| subject            | string   | No   | 保護リソースエンドポイントが要求するサブジェクト。指定された値がアクセストークンに関連付けられたサブジェクトと一致しない場合、`action=FORBIDDEN`が返される |
| clientCertificate  | string   | No   | `PEM`形式のクライアント証明書（`TLS`クライアント証明書確認方式での検証に使用）                                                                             |
| dpop               | string   | No   | クライアントがリソースサーバーに提示した`DPoP`ヘッダー                                                                                                     |
| htm                | string   | No   | クライアントから保護リソースエンドポイントへのリクエストの`HTTP`メソッド（`DPoP`ヘッダー検証用）                                                           |
| htu                | string   | No   | 保護リソースエンドポイントの`URL`（`DPoP`ヘッダー検証用）                                                                                                  |
| resources          | string[] | No   | トークンリクエストで指定されたリソースインジケータ                                                                                                         |
| acrValues          | string[] | No   | アクセストークン発行時のユーザー認証で満たすべき認証コンテキストクラス参照値                                                                               |
| maxAge             | integer  | No   | アクセストークン発行時のユーザー認証からの最大経過時間                                                                                                     |
| requiredComponents | string[] | No   | 署名に必要な`HTTP`メッセージコンポーネント（デフォルト: `["@method", "@target-uri", "authorization"]`）                                                    |
| uri                | string   | No   | `userinfo`エンドポイントの完全な`URL`                                                                                                                      |
| message            | string   | No   | リクエストの`HTTP`メッセージボディ（存在する場合）                                                                                                         |
| headers            | object[] | No   | 署名処理に含める`HTTP`ヘッダー                                                                                                                             |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名          | データ型 | 説明                                                                                                                      |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| resultCode            | string   | API 呼び出しの結果コード                                                                                                  |
| resultMessage         | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                |
| action                | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`BAD_REQUEST`、`UNAUTHORIZED`、`FORBIDDEN`、`OK` |
| responseContent       | string   | エラー時に`WWW-Authenticate`ヘッダーの値として使用できるコンテンツ                                                        |
| clientId              | integer  | クライアント ID                                                                                                           |
| clientIdAlias         | string   | クライアント ID エイリアス                                                                                                |
| clientIdAliasUsed     | boolean  | クライアント ID エイリアスが使用されたかどうか                                                                            |
| expiresAt             | integer  | アクセストークンの有効期限（`UNIX`タイムスタンプ）                                                                        |
| subject               | string   | アクセストークンに関連付けられたサブジェクト（`Client Credentials Flow`の場合は`null`）                                   |
| scopes                | string[] | アクセストークンがカバーするスコープ                                                                                      |
| existent              | boolean  | アクセストークンが存在するかどうか                                                                                        |
| usable                | boolean  | アクセストークンが使用可能（存在し、有効期限内）かどうか                                                                  |
| sufficient            | boolean  | アクセストークンが十分かどうか                                                                                            |
| refreshable           | boolean  | アクセストークンがリフレッシュ可能かどうか                                                                                |
| properties            | object[] | アクセストークンに関連付けられた追加プロパティ                                                                            |
| certificateThumbprint | string   | アクセストークンの検証に使用されたクライアント証明書のサムプリント                                                        |
| resources             | string[] | ターゲットリソース                                                                                                        |
| accessTokenResources  | string[] | アクセストークンのターゲットリソース（`resource`プロパティとは異なる場合がある）                                          |
| authorizationDetails  | object   | 認可の詳細情報（`OAuth 2.0 Rich Authorization Requests`で定義）                                                           |
| serviceAttributes     | object[] | クライアントアプリケーションが属するサービスの属性                                                                        |
| clientAttributes      | object[] | クライアントの属性                                                                                                        |
| scopeDetails          | object[] | スコープの詳細情報（名前、説明、属性等）                                                                                  |
| grantId               | string   | グラント ID                                                                                                               |
| grant                 | object   | グラント情報（スコープ、クレーム、認可詳細等）                                                                            |
| forExternalAttachment | boolean  | 外部添付用のアクセストークンかどうか                                                                                      |
| consentedClaims       | string[] | ユーザーがクライアントアプリケーションに開示を同意したクレーム                                                            |
| grantType             | string   | アクセストークン作成時のグラントタイプ                                                                                    |
| acr                   | string   | アクセストークン発行時のユーザー認証の`Authentication Context Class Reference`                                            |
| authTime              | integer  | アクセストークン発行時のユーザー認証が実行された時刻                                                                      |
| clientEntityId        | string   | クライアントのエンティティ ID                                                                                             |
| clientEntityIdUsed    | boolean  | アクセストークンリクエスト時にクライアントのエンティティ ID が使用されたかどうか                                          |
| forCredentialIssuance | boolean  | クレデンシャル発行用のトークンかどうか                                                                                    |
| cnonce                | string   | `c_nonce`の値                                                                                                             |
| cnonceExpiresAt       | integer  | `c_nonce`の有効期限                                                                                                       |
| issuableCredentials   | string   | アクセストークンを提示することで取得可能なクレデンシャル                                                                  |
| dpopNonce             | string   | `DPoP proof JWT`で使用される予期される`nonce`値（`DPoP-Nonce HTTP`ヘッダーの値として使用）                                |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/introspection \
-H 'Content-Type:application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{
  "token": "-LCEsM_ZQS62Wbe9d8tWMqhNZE9qB8uAimQWYydnVGw",
  "scopes": [
    "org.iso.18013.5.1.mDL",
    "openid"
  ]
}'
```

## サンプルレスポンス

```json
{
  "resultCode": "A056001",
  "resultMessage": "[A056001] The access token is valid.",
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
  "existent": true,
  "expiresAt": 1640416873000,
  "refreshable": true,
  "responseContent": "Bearer error='invalid_request'",
  "scopes": ["history.read", "timeline.read"],
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
  "subject": "john",
  "sufficient": true,
  "usable": true
}

```
