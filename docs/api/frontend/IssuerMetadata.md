# Credential Issuer メタデータエンドポイント

## 概要

Issuer の設定情報を取得するためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/.well-known/openid-credential-issuer

## リクエスト

### メソッド

- GET

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
curl -v https://issuer.g-trustedweb.workers.dev/.well-known/openid-credential-issuer
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
