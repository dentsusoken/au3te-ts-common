# Token Fail

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/token/fail)

## 概要

認可サーバーがクライアントアプリケーションに返すトークンリクエストのエラーレスポンスのコンテンツを生成するエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/token/fail

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                                                                                                                                                                       |
| ------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ticket       | string   | Yes  | Authlete `/auth/token` API から発行されたチケット                                                                                                                                          |
| reason       | string   | Yes  | トークンリクエストが失敗した理由<br>許可値:<br>- `UNKNOWN`: 不明な理由<br>- `INVALID_RESOURCE_OWNER_CREDENTIALS`: リソースオーナーの認証情報が無効<br>- `INVALID_TARGET`: 無効なターゲット |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                 |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| resultCode      | string   | API 呼び出しの結果コード                                                                             |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                           |
| action          | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`BAD_REQUEST`               |
| responseContent | string   | クライアントアプリケーションに返すべきコンテンツ（`action`パラメータの値に応じてフォーマットが変化） |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/token/fail \
-H 'Content-Type: application/json' \
-u 'Authorization: Bearer {アクセストークン}' \
-d '{ "ticket": "83BNqKIhGMyrkvop_7jQjv2Z1612LNdGSQKkvkrf47c", "reason": "INVALID_RESOURCE_OWNER_CREDENTIALS" }'
```

## サンプルレスポンス

```sh
{
"resultCode": "A067301",
"resultMessage": "[A067301] The credentials (username & password) passed to the token endpoint are invalid.",
"action": "BAD_REQUEST",
"responseContent": "{\"error_description\":\"[A067301] The credentials (username & password) passed to the token endpoint are invalid.\",\"error\":\"invalid_request\",\"error_uri\":\"https://docs.authlete.com/#A067301\"}"
}
```
