# VCI Single Parse

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/vci/single/parse)

## 概要

Verifiable Credential またはトランザクション ID を発行し、クレデンシャルレスポンスを発行するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/vci/single/parse

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名   | データ型 | 必須 | 説明                                               |
| -------------- | -------- | ---- | -------------------------------------------------- |
| accessToken    | string   | Yes  | クレデンシャルリクエストに付随するアクセストークン |
| requestContent | string   | Yes  | クレデンシャルリクエストのメッセージボディ         |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                                                      |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| resultCode      | string   | API 呼び出しの結果コード                                                                                                                  |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                |
| action          | string   | クレデンシャルエンドポイントが次に取るべきアクション<br>許可値: `OK`、`BAD_REQUEST`、`UNAUTHORIZED`、`FORBIDDEN`、`INTERNAL_SERVER_ERROR` |
| responseContent | string   | リクエスト送信者への応答コンテンツ                                                                                                        |
| info.identifier | string   | クレデンシャルオファーの識別子                                                                                                            |
| info.format     | string   | クレデンシャルリクエストの`format`パラメータの値                                                                                          |
| info.bindingKey | string   | クレデンシャルリクエストの`proof`で指定されたバインディングキー                                                                           |
| info.details    | string   | クレデンシャルリクエストに関する詳細情報                                                                                                  |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/vci/single/parse \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{
  "accessToken": "-LCEsM_ZQS62Wbe9d8tWMqhNZE9qB8uAimQWYydnVGw",
  "requestContent": "{\"format\":\"mso_mdoc\",\"doctype\":\"org.iso.18013.5.1.mDL\",\"claims\":{\"org.iso.18013.5.1\":{\"family_name\":{},\"given_name\":{},\"birth_date\":{},\"issue_date\":{},\"expiry_date\":{},\"issuing_country\":{},\"document_number\":{},\"driving_privileges\":{}}}}"
}'
```

## サンプルレスポンス

```json
{
  "action": "OK",
  "responseContent": null,
  "info": {
    "identifier": "JpP50g88mGcuOAE0ETSJW096m9_qc_2qGVNm6GUE7xE",
    "format": "mso_mdoc",
    "bindingKey": null,
    "bindingKeys": null,
    "details": "{\"doctype\":\"org.iso.18013.5.1.mDL\",\"claims\":{\"org.iso.18013.5.1\":{\"family_name\":{},\"given_name\":{},\"birth_date\":{},\"issue_date\":{},\"expiry_date\":{},\"issuing_country\":{},\"document_number\":{},\"driving_privileges\":{}}}}"
  },
  "resultCode": "A374001",
  "resultMessage": "[A374001] The credential request was parsed successfully."
}
```
