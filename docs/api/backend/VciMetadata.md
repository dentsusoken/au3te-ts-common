# VCI Metadata

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/vci/metadata)

## 概要

Issuer の設定情報を取得するためのエンドポイント。

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

| パラメータ名 | データ型 | 必須 | 説明                                                 |
| ------------ | -------- | ---- | ---------------------------------------------------- |
| pretty       | boolean  | Yes  | メタデータを整形された形式で出力するかどうかのフラグ |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                                                                                        |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCode      | string   | API 呼び出しの結果コード                                                                                                                                                    |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                                                  |
| action          | string   | クレデンシャル発行者メタデータエンドポイント（`/.well-known/openid-credential-issuer`）の実装が次に取るべきアクション<br>許可値: `OK`、`NOT_FOUND`、`INTERNAL_SERVER_ERROR` |
| responseContent | string   | クレデンシャル発行者メタデータエンドポイントの実装がレスポンスを構築する際に使用すべきコンテンツ                                                                            |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/vci/metadata \
-H 'Content-Type: application/json' \
-u 'Authorization: Bearer {アクセストークン}' \
-d '{ "pretty": "false" }'
```

## サンプルレスポンス

```sh
{
  "resultCode": "string",
  "resultMessage": "string",
  "action": "OK",
  "responseContent": "string"
}
```
