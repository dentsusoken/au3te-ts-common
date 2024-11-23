# Pushed Authorization Requests エンドポイント

## 概要

認可リクエストのパラメータを事前に送信し、それに対応する`request_uri`を取得するためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/par

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー | 必須 | 説明                                                                     |
| -------- | ---- | ------------------------------------------------------------------------ |
| DPoP     | No   | DPoP proof JWT ([RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)) |

### パラメータ

| パラメータ名          | データ型 | 必須 | 説明                                                                             |
| --------------------- | -------- | ---- | -------------------------------------------------------------------------------- |
| client_id             | string   | Yes  | クライアント ID                                                                  |
| response_type         | string   | Yes  | 認可リクエストのレスポンスタイプ                                                 |
| scope                 | string   | Yes  | 認可リクエストのスコープ                                                         |
| redirect_uri          | string   | Yes  | 認可リクエスト成功時のリダイレクト URI                                           |
| state                 | string   | No   | ランダムな state 値                                                              |
| code_challenge        | string   | No   | [PKCE](https://www.rfc-editor.org/rfc/rfc7636.html) のチャレンジ値               |
| code_challenge_method | string   | No   | [PKCE](https://www.rfc-editor.org/rfc/rfc7636.html) のチャレンジ値の検証メソッド |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名 | データ型 | 説明                                   |
| ------------ | -------- | -------------------------------------- |
| request_uri  | string   | 認可リクエストで使用するリクエスト URI |
| expires_in   | number   | request_uri の有効期限                 |

## サンプルリクエスト

```sh
curl -v https://issuer.g-trustedweb.workers.dev/api/par \
     -H "DPoP: {DPOP_PROOF_JWT} \
     -d client_id={クライアントID} \
     -d response_type=code \
     -d scope=org.iso.18013.5.1.mDL+openid \
     -d redirect_uri=eudi-openid4ci://authorize/ \
     -d state=7342EFBD-3D9F-4895-8445-18F365B8C66C \
     -d code_challenge=-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs \
     -d code_challenge_method=S256
```

## サンプルレスポンス

```json
{
  "expires_in": 600,
  "request_uri": "urn:ietf:params:oauth:request_uri:du-ptCtuukbVDi2MgOjYwwb99cl-ho0bzzLb0X0u1n0"
}
```
