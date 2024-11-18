# トークンエンドポイント

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/token

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー | 必須 | 説明                                                                     |
| -------- | ---- | ------------------------------------------------------------------------ |
| DPoP     | No   | DPoP proof JWT ([RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)) |

### パラメータ

| パラメータ名  | データ型 | 必須 | 説明                                                         |
| ------------- | -------- | ---- | ------------------------------------------------------------ |
| client_id     | string   | Yes  | クライアント ID                                              |
| grant_type    | string   | Yes  | 認可タイプ                                                   |
| code          | string   | Yes  | 認可リクエストで発行した認可コード                           |
| redirect_uri  | string   | Yes  | 認可リクエストで送信したものと同じリダイレクト URI           |
| code_verifier | string   | No   | [PKCE](https://www.rfc-editor.org/rfc/rfc7636.html) の検証値 |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名       | データ型 | 説明                                 |
| ------------------ | -------- | ------------------------------------ |
| access_token       | string   | アクセストークン                     |
| refresh_token      | string   | リフレッシュトークン                 |
| id_token           | string   | ID トークン                          |
| token_type         | string   | トークンタイプ                       |
| expires_in         | number   | アクセストークンの有効期限           |
| scope              | string   | アクセストークンのスコープ           |
| c_nonce            | string   | アクセストークンに紐づくランダムな値 |
| c_nonce_expires_in | number   | c_nonce の有効期限                   |

## サンプルリクエスト

```sh
curl -v  https://issuer.g-trustedweb.workers.dev/api/token \
     -d client_id={CLIENT_ID} \
     -d grant_type=code \
     -d code=org.iso.18013.5.1.mDL openid \
     -d redirect_uri=eudi-openid4ci://authorize/ \
     -d code_verifier=-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs
```

## サンプルレスポンス

```sh
{
    "access_token": "SW69lPuZJiS4kvwp6KlDFC7d9WISswnZipD32prLHyo",
    "token_type": "Bearer",
    "expires_in": 86400,
    "scope": "openid org.iso.18013.5.1.mDL",
    "refresh_token": "qT2VKgCSpDUmSVVy-fpcjx14UCylxfIRl-zAFPrQsCk",
    "id_token": "eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2lzc3Vlci5nLXRydXN0ZWR3ZWIud29ya2Vycy5kZXYiLCJzdWIiOiIxMDA0IiwiYXVkIjoidHcyNC53YWxsZXQuZGVudHN1c29rZW4uY29tIiwiZXhwIjoxNzMxOTc4MDIyLCJpYXQiOjE3MzE4OTE2MjIsImF1dGhfdGltZSI6MTczMTg5MTU1Mywic19oYXNoIjoiNHhGSVpOSnRtX0NMVHNJanFmWHpyZyJ9.mOKMbnu4_r7Hy89qxu8FX7I0SrNFAB7P0NfZhk0Bbh7fpYHe8R-BxoQjsEILNnqxOVxJDJODru-AndvyKRWETw",
    "c_nonce": "vyO469c8_zg-HsT9wjJYnFnvvY2VE7GWfqTBCU-6His",
    "c_nonce_expires_in": 86400
}
```
