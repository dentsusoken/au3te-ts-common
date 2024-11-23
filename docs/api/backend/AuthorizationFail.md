# Authorization Fail

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/auth/authorization/fail)

## 概要

認可サーバーがクライアントアプリケーションに返す認可リクエストのエラーレスポンスのコンテンツを生成するエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization/fail

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ  | データ型 | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ticket      | string   | Yes  | Authlete `/auth/authorization` API から発行されたチケット                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| reason      | string   | Yes  | 認可リクエストが失敗した理由<br>許可値:<br>- `UNKNOWN`: 不明な理由<br>- `NOT_LOGGED_IN`: ログインしていない<br>- `MAX_AGE_NOT_SUPPORTED`: `max_age`がサポートされていない<br>- `EXCEEDS_MAX_AGE`: `max_age`を超過<br>- `DIFFERENT_SUBJECT`: 異なるサブジェクト<br>- `ACR_NOT_SATISFIED`: `ACR`要件を満たしていない<br>- `DENIED`: 拒否された<br>- `SERVER_ERROR`: サーバーエラー<br>- `NOT_AUTHENTICATED`: 認証されていない<br>- `ACCOUNT_SELECTION_REQUIRED`: アカウント選択が必要<br>- `CONSENT_REQUIRED`: 同意が必要<br>- `INTERACTION_REQUIRED`: インタラクションが必要<br>- `INVALID_TARGET`: 無効なターゲット |
| description | string   | No   | 認可失敗に関するカスタム説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                       |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| resultCode      | string   | API 呼び出しの結果コード                                                                                   |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                                 |
| action          | string   | 認可サーバーが次に取るべきアクション<br>許可値: `INTERNAL_SERVER_ERROR`、`BAD_REQUEST`、`LOCATION`、`FORM` |
| responseContent | string   | クライアントアプリケーションに返すべきコンテンツ（`action`パラメータの値に応じてフォーマットが変化）       |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/auth/authorization/fail \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{ "ticket": "c4iy3TWGn74UMO7ihRl0ZS8OEUzV9axBlBbJbqxH-9Q", "reason": "NOT_AUTHENTICATED" }'
```

## サンプルレスポンス

```json
{
  "resultCode": "A004201",
  "resultMessage": "[A004201] The authorization request from the service does not contain 'parameters' parameter.",
  "action": "BAD_REQUEST",
  "responseContent": "{\"error_description\":\"[A004201] The authorization request from the service does not contain 'parameters' parameter.\",\"error\":\"invalid_request\",\"error_uri\":\"https://docs.authlete.com/#A004201\"}"
}
```
