# Openid Configuration エンドポイント

## 概要

認可サーバーの設定情報を取得するエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/.well-known/openid-configuration

## リクエスト

### メソッド

- GET

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
curl -v https://issuer.g-trustedweb.workers.dev/.well-known/openid-configuration
```

## サンプルレスポンス

```json
{
  "issuer": "https://issuer.g-trustedweb.workers.dev",
  "authorization_endpoint": "https://issuer.g-trustedweb.workers.dev/api/authorization",
  "token_endpoint": "https://issuer.g-trustedweb.workers.dev/api/token",
  "jwks_uri": "https://issuer.g-trustedweb.workers.dev/api/jwks",
  "scopes_supported": ["openid", "org.iso.18013.5.1.mDL"],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "pushed_authorization_request_endpoint": "https://issuer.g-trustedweb.workers.dev/api/par"
}
```
