# Authorization Issue

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/authorization/issue)

## 概要

認可コードを発行するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization/issue

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名         | データ型 | 必須 | 説明                                                                                                           |
| -------------------- | -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| ticket               | string   | Yes  | Authlete `/auth/authorization` API から発行されたチケット                                                      |
| subject              | string   | Yes  | クライアントアプリケーションに認可を与えたユーザーのサブジェクト（サービスで管理されているユーザーアカウント） |
| authTime             | integer  | No   | エンドユーザーの認証が行われた時刻（`UNIX`タイムスタンプ）                                                     |
| acr                  | string   | No   | 実行された認証の`Authentication Context Class Reference`                                                       |
| claims               | string   | No   | エンドユーザーのクレーム情報（`JSON`形式）                                                                     |
| properties           | object[] | No   | アクセストークンや認可コードに関連付ける追加プロパティ                                                         |
| scopes               | string[] | No   | アクセストークンや認可コードに関連付けるスコープ。指定された場合、元の認可リクエストのスコープを置き換える     |
| sub                  | string   | No   | `ID`トークンに埋め込む`sub`クレームの値。未指定の場合は`subject`パラメータの値が使用される                     |
| idtHeaderParams      | string   | No   | 発行される`ID`トークンの`JWS`ヘッダーに追加するパラメータ（`JSON`形式）                                        |
| claimsForTx          | string   | No   | 変換されたクレームの計算に使用されるクレームのキーと値のペア                                                   |
| consentedClaims      | string[] | No   | ユーザーがクライアントアプリケーションに開示を同意したクレーム                                                 |
| authorizationDetails | object   | No   | 認可の詳細情報（`OAuth 2.0 Rich Authorization Requests`で定義）                                                |
| jwtAtClaims          | string   | No   | `JWT`アクセストークンのペイロード部分に追加されるクレーム                                                      |
| accessToken          | string   | No   | API 呼び出しの結果として発行される可能性のあるアクセストークンの表現                                           |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名         | データ型 | 説明                                                                                                       |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| resultCode           | string   | API 呼び出しの結果コード                                                                                   |
| resultMessage        | string   | API 呼び出しの結果を説明する短いメッセージ                                                                 |
| action               | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`BAD_REQUEST`、`LOCATION`、`FORM` |
| responseContent      | string   | クライアントアプリケーションに返すべきコンテンツ（`action`パラメータの値に応じてフォーマットが変化）       |
| accessToken          | string   | 新しく発行されたアクセストークン（`response_type`に`token`が含まれる場合のみ発行）                         |
| accessTokenExpiresAt | integer  | 新しく発行されたアクセストークンの有効期限（`UNIX`タイムスタンプ）                                         |
| accessTokenDuration  | integer  | 新しく発行されたアクセストークンの有効期間（秒）                                                           |
| idToken              | string   | 新しく発行された`ID`トークン（`response_type`に`id_token`が含まれる場合のみ発行）                          |
| authorizationCode    | string   | 新しく発行された認可コード（`response_type`に`code`が含まれる場合のみ発行）                                |
| jwtAccessToken       | string   | `JWT`形式で新しく発行されたアクセストークン（サービスが`JWT`ベースのアクセストークン発行設定の場合のみ）   |
| ticketInfo           | string   | チケットに関する情報                                                                                       |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization/issue \
-H 'Content-Type: application/json' \
-u 'Authorization: Bearer {アクセストークン}' \
-d '{ "ticket": "FFgB9gwb_WXh6g1u-UQ8ZI-d_k4B-o-cm7RkVzI8Vnc", "subject": "john" }'
```

## サンプルレスポンス

```sh
{
"resultCode": "A040001",
"resultMessage": "[A040001] The authorization request was processed successfully.",
"accessTokenDuration": 0,
"accessTokenExpiresAt": 0,
"action": "LOCATION",
"authorizationCode": "Xv_su944auuBgc5mfUnxXayiiQU9Z4-T_Yae_UfExmo",
"responseContent": "https://my-client.example.com/cb1?code=Xv_su944auuBgc5mfUnxXayiiQU9Z4-T_Yae_UfExmo&iss=https%3A%2F%2Fmy-service.example.com"
}
```
