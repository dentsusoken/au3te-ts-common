# Service Configuration

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#get-/api/-serviceId-/service/configuration)

## 概要

認可サーバーの設定情報を取得するエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/service/configuration

## リクエスト

### メソッド

- GET

### ヘッダー

| ヘッダー      | 必須 | 説明                        |
| ------------- | ---- | --------------------------- |
| Authorization | Yes  | `Bearer {アクセストークン}` |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                                                                                         |
| ------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------------ |
| pretty       | boolean  | No   | レスポンスの JSON を整形するかどうかのフラグ。`true`の場合、JSON が整形されて返される（デフォルト: `false`） |
| patch        | string   | No   | 適用する JSON Patch（`RFC 6902 JavaScript Object Notation (JSON) Patch`）                                    |

## レスポンス

### フォーマット

- JSON

### パラメータ

> [!NOTE]
> 以下は主要なレスポンスの一部です。完全なパラメータリストについては[OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)を参照してください。

| パラメータ名                          | データ型 | 説明                                           |
| ------------------------------------- | -------- | ---------------------------------------------- |
| issuer                                | string   | 発行者の識別子                                 |
| authorization_endpoint                | string   | 認可エンドポイントの URL                       |
| token_endpoint                        | string   | トークンエンドポイントの URL                   |
| userinfo_endpoint                     | string   | `UserInfo`エンドポイントの URL                 |
| jwks_uri                              | string   | `JSON Web Key Set`の URL                       |
| registration_endpoint                 | string   | 動的クライアント登録エンドポイントの URL       |
| scopes_supported                      | string[] | サポートされているスコープ                     |
| response_types_supported              | string[] | サポートされているレスポンスタイプ             |
| grant_types_supported                 | string[] | サポートされているグラントタイプ               |
| subject_types_supported               | string[] | サポートされているサブジェクトタイプ           |
| id_token_signing_alg_values_supported | string[] | `ID`トークン署名に使用可能なアルゴリズム       |
| token_endpoint_auth_methods_supported | string[] | トークンエンドポイントでサポートされる認証方式 |
| claims_supported                      | string[] | サポートされているクレーム                     |

## サンプルリクエスト

```sh
curl -v https://nextdev-api.authlete.net/api/{サービスID}/service/configuration?pretty=true \
-u 'Authorization: Bearer {アクセストークン}'
```

## サンプルレスポンス

```sh
{
"issuer": "https://my-service.example.com",
"authorization_endpoint": "https://my-service.example.com/authz",
"token_endpoint": "https://my-service.example.com/token",
"scopes_supported": [
"history.read",
"timeline.read"
],
"response_types_supported": [
"code"
],
"response_modes_supported": [
"query",
"fragment",
"form_post",
"query.jwt",
"fragment.jwt",
"form_post.jwt",
"jwt"
],
"grant_types_supported": [
"authorization_code",
"password",
"refresh_token"
],
"subject_types_supported": [
"public",
"pairwise"
],
"id_token_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"id_token_encryption_alg_values_supported": [
"RSA1_5",
"RSA-OAEP",
"RSA-OEAP-256",
"ECDH-ES",
"ECDH-ES+A128KW",
"ECDH-ES+A192KW",
"ECDH-ES+A256KW",
"A128KW",
"A192KW",
"A256KW",
"dir",
"A128GCMKW",
"A192GCMKW",
"A256GCMKW",
"PBES2-HS256+A128KW",
"PBES2-HS384+A192KW",
"PBES2-HS512+A256KW"
],
"id_token_encryption_enc_values_supported": [
"A128CBC-HS256",
"A192CBC-HS384",
"A256CBC-HS512",
"A128GCM",
"A192GCM",
"A256GCM"
],
"userinfo_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA",
"none"
],
"userinfo_encryption_alg_values_supported": [
"RSA1_5",
"RSA-OAEP",
"RSA-OEAP-256",
"ECDH-ES",
"ECDH-ES+A128KW",
"ECDH-ES+A192KW",
"ECDH-ES+A256KW",
"A128KW",
"A192KW",
"A256KW",
"dir",
"A128GCMKW",
"A192GCMKW",
"A256GCMKW",
"PBES2-HS256+A128KW",
"PBES2-HS384+A192KW",
"PBES2-HS512+A256KW"
],
"userinfo_encryption_enc_values_supported": [
"A128CBC-HS256",
"A192CBC-HS384",
"A256CBC-HS512",
"A128GCM",
"A192GCM",
"A256GCM"
],
"request_object_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"request_object_encryption_alg_values_supported": [
"RSA1_5",
"RSA-OAEP",
"RSA-OEAP-256",
"ECDH-ES",
"ECDH-ES+A128KW",
"ECDH-ES+A192KW",
"ECDH-ES+A256KW",
"A128KW",
"A192KW",
"A256KW",
"dir",
"A128GCMKW",
"A192GCMKW",
"A256GCMKW",
"PBES2-HS256+A128KW",
"PBES2-HS384+A192KW",
"PBES2-HS512+A256KW"
],
"request_object_encryption_enc_values_supported": [
"A128CBC-HS256",
"A192CBC-HS384",
"A256CBC-HS512",
"A128GCM",
"A192GCM",
"A256GCM"
],
"authorization_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"authorization_encryption_alg_values_supported": [
"RSA1_5",
"RSA-OAEP",
"RSA-OEAP-256",
"ECDH-ES",
"ECDH-ES+A128KW",
"ECDH-ES+A192KW",
"ECDH-ES+A256KW",
"A128KW",
"A192KW",
"A256KW",
"dir",
"A128GCMKW",
"A192GCMKW",
"A256GCMKW",
"PBES2-HS256+A128KW",
"PBES2-HS384+A192KW",
"PBES2-HS512+A256KW"
],
"authorization_encryption_enc_values_supported": [
"A128CBC-HS256",
"A192CBC-HS384",
"A256CBC-HS512",
"A128GCM",
"A192GCM",
"A256GCM"
],
"token_endpoint_auth_methods_supported": [
"client_secret_basic"
],
"token_endpoint_auth_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"display_values_supported": [
"page"
],
"claim_types_supported": [
"normal"
],
"claims_parameter_supported": true,
"request_parameter_supported": true,
"request_uri_parameter_supported": true,
"require_request_uri_registration": true,
"revocation_endpoint": "https://my-service.example.com/revocation",
"revocation_endpoint_auth_methods_supported": [ ],
"revocation_endpoint_auth_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"introspection_endpoint": "https://my-service.example.com/introspection",
"introspection_endpoint_auth_methods_supported": [ ],
"introspection_endpoint_auth_signing_alg_values_supported": [
"HS256",
"HS384",
"HS512",
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"code_challenge_methods_supported": [
"plain",
"S256"
],
"tls_client_certificate_bound_access_tokens": false,
"backchannel_token_delivery_modes_supported": [ ],
"backchannel_authentication_request_signing_alg_values_supported": [
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"backchannel_user_code_parameter_supported": false,
"require_pushed_authorization_requests": false,
"authorization_details_supported": true,
"verified_claims_supported": false,
"dpop_signing_alg_values_supported": [
"RS256",
"RS384",
"RS512",
"PS256",
"PS384",
"PS512",
"ES256",
"ES384",
"ES512",
"ES256K",
"EdDSA"
],
"require_signed_request_object": false,
"authorization_response_iss_parameter_supported": true
}
```
