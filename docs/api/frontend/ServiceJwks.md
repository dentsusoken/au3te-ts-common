# Service JWKS エンドポイント

## 概要

IDトークンの検証に使用する JWKS を取得するエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/jwks

## リクエスト

### メソッド

- GET

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                                                                                         |
| ------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------------ |
| pretty       | boolean  | No   | レスポンスの JSON を整形するかどうかのフラグ。`true`の場合、JSON が整形されて返される（デフォルト: `false`） |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名 | データ型 | 説明               |
| ------------ | -------- | ------------------ |
| keys         | JSON[]   | JWKSのキーのリスト |

## サンプルリクエスト

```sh
curl -v https://issuer.g-trustedweb.workers.dev/api/jwks
```

## サンプルレスポンス

```json
{
  "keys": [
    {
      "kid": "1234567890",
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "n": "...",
      "e": "..."
    }
  ]
}
```
