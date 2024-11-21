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
-H 'Authorization: Bearer {アクセストークン}' \
-d '{ "pretty": "false" }'
```

## サンプルレスポンス

```json
{
  "action": "OK",
  "responseContent": "{\"credential_issuer\":\"https://issuer.g-trustedweb.workers.dev\",\"credential_endpoint\":\"https://issuer.g-trustedweb.workers.dev/api/credential\",\"batch_credential_endpoint\":\"https://issuer.g-trustedweb.workers.dev/api/batch_credential\",\"deferred_credential_endpoint\":\"https://issuer.g-trustedweb.workers.dev/api/deferred_credential\",\"credential_response_encryption\":{\"alg_values_supported\":[\"RSA-OAEP-256\"],\"enc_values_supported\":[\"A128CBC-HS256\"],\"encryption_required\":false},\"credential_configurations_supported\":{\"org.iso.18013.5.1.mDL\":{\"format\":\"mso_mdoc\",\"doctype\":\"org.iso.18013.5.1.mDL\",\"claims\":{\"org.iso.18013.5.1\":{\"family_name\":{},\"given_name\":{},\"birth_date\":{},\"issue_date\":{},\"expiry_date\":{},\"issuing_country\":{},\"issuing_authority\":{},\"document_number\":{},\"portrait\":{},\"driving_privileges\":{},\"un_distinguishing_sign\":{},\"administrative_number\":{},\"sex\":{},\"height\":{},\"weight\":{},\"eye_colour\":{},\"hair_colour\":{},\"birth_place\":{},\"resident_address\":{},\"portrait_capture_date\":{},\"age_in_years\":{},\"age_birth_year\":{},\"issuing_jurisdiction\":{},\"nationality\":{},\"resident_city\":{},\"resident_state\":{},\"resident_postal_code\":{},\"resident_country\":{},\"family_name_national_character\":{},\"given_name_national_character\":{},\"signature_usual_mark\":{}}},\"scope\":\"org.iso.18013.5.1.mDL\",\"cryptographic_binding_methods_supported\":[\"jwk\"],\"credential_signing_alg_values_supported\":[\"ES256\"]},\"IdentityCredential\":{\"format\":\"vc+sd-jwt\",\"vct\":\"https://credentials.example.com/identity_credential\",\"claims\":{\"family_name\":{},\"given_name\":{},\"birthdate\":{}},\"scope\":\"identity_credential\",\"cryptographic_binding_methods_supported\":[\"jwk\"],\"credential_signing_alg_values_supported\":[\"ES256\"],\"display\":[{\"name\":\"Identity Credential\"}]}}}",
  "resultCode": "A364001",
  "resultMessage": "[A364001] Metadata of the credential issuer was prepared."
}
```
