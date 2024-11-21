# Credential Issuer メタデータエンドポイント

## 概要

Issuer の設定情報を取得するためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/.well-known/openid-credential-issuer

## リクエスト

### メソッド

- GET

### ヘッダー

| ヘッダー     | 必須 | 説明                             |
| ------------ | ---- | -------------------------------- |
| Content-Type | No   | `application/json;charset=utf-8` |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                                 |
| ------------ | -------- | ---- | ---------------------------------------------------- |
| pretty       | boolean  | Yes  | メタデータを整形された形式で出力するかどうかのフラグ |

## レスポンス

### フォーマット

- JSON

### パラメータ

> [!NOTE]
> 以下は主要なレスポンスの一部です。完全なパラメータリストについては[Credential Issuer Metadata](https://openid.github.io/OpenID4VCI/openid-4-verifiable-credential-issuance-wg-draft.html#name-credential-issuer-metadata-p)を参照してください。

| パラメータ名          | データ型 | 説明                                     |
| --------------------- | -------- | ---------------------------------------- |
| credential_issuer     | string   | クレデンシャル発行者の URL               |
| credential_endpoint   | string   | クレデンシャル発行エンドポイントの URL   |
| credentials_supported | string[] | サポートされているクレデンシャルのタイプ |


## サンプルリクエスト

```sh
curl -v https://issuer.g-trustedweb.workers.dev/.well-known/openid-credential-issuer
```

## サンプルレスポンス

```json
{
  "credential_issuer": "https://issuer.g-trustedweb.workers.dev",
  "credential_endpoint": "https://issuer.g-trustedweb.workers.dev/api/credential",
  "credentials_supported": [
    {
      "format": "mso_mdoc",
      "doctype": "org.iso.18013.5.1.mDL",
      "claims": {
        "org.iso.18013.5.1": {
          "family_name": {},
          "given_name": {},
          "birth_date": {},
          "issue_date": {},
          "expiry_date": {},
          "issuing_country": {},
          "document_number": {},
          "driving_privileges": {}
        }
      }
    }
  ]
}
```
