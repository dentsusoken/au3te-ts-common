# VCI Single Issue

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/vci/single/issue)

## 概要

受け取ったクレデンシャルリクエストを解析して有効性を確認し、クレデンシャルリクエストの情報を取得するためのエンドポイント。

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

| パラメータ名             | データ型 | 必須 | 説明                                               |
| ------------------------ | -------- | ---- | -------------------------------------------------- |
| accessToken              | string   | Yes  | クレデンシャルリクエストに付随するアクセストークン |
| order.requestIdentifier  | string   | Yes  | クレデンシャルリクエストの識別子                   |
| order.credentialPayload  | string   | No   | 発行されるクレデンシャルに追加される追加ペイロード |
| order.issuanceDeferred   | boolean  | No   | クレデンシャル発行を延期するかどうかのフラグ       |
| order.credentialDuration | integer  | No   | 発行されるクレデンシャルの有効期間                 |
| order.signingKeyId       | string   | No   | クレデンシャルの署名に使用する秘密鍵のキー ID      |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                                                                         |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| resultCode      | string   | API 呼び出しの結果コード                                                                                                                                     |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                                   |
| action          | string   | クレデンシャルエンドポイントの実装が次に取るべきアクション<br>許可値: `OK`、`ACCEPTED`、`UNAUTHORIZED`、`FORBIDDEN`、`INTERNAL_SERVER_ERROR`、`CALLER_ERROR` |
| responseContent | string   | クレデンシャルエンドポイントの実装が返すべきレスポンスのコンテンツ                                                                                           |
| transactionId   | string   | 発行されたトランザクション ID                                                                                                                                |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/vci/single/issue \
-H 'Content-Type: application/json' \
-u 'Authorization: Bearer {アクセストークン}' \
-d '{
  "accessToken": "string",
  "order": {
    "requestIdentifier": "string",
    "credentialPayload": "string",
    "issuanceDeferred": false,
    "credentialDuration": 0,
    "signingKeyId": "string"
  }
}'
```

## サンプルレスポンス

```sh
{
  "resultCode": "string",
  "resultMessage": "string",
  "action": "OK",
  "responseContent": "string",
  "transactionId": "string"
}
```
