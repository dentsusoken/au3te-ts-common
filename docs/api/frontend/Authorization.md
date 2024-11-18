# 認可エンドポイント

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/authorization

## リクエスト

### メソッド

- POST

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
| request_uri           | string   | Yes  | PAR エンドポイントで取得した request_uri、client_id 以外のパラメータと排他       |

## レスポンス

### フォーマット

- HTML

## サンプルリクエスト

### パターン 1

```sh
curl -v  https://issuer.g-trustedweb.workers.dev/api/par \
     -d client_id={CLIENT_ID} \
     -d response_type=code \
     -d scope=org.iso.18013.5.1.mDL openid \
     -d redirect_uri=eudi-openid4ci://authorize/ \
     -d state=7342EFBD-3D9F-4895-8445-18F365B8C66C \
     -d code_challenge=-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs \
     -d code_challenge_method=S256
```

### パターン 2

```sh
curl -v  https://issuer.g-trustedweb.workers.dev/api/par \
     -d client_id={CLIENT_ID} \
     -d request_uri=urn:ietf:params:oauth:request_uri:du-ptCtuukbVDi2MgOjYwwb99cl-ho0bzzLb0X0u1n0 \
```

## サンプルレスポンス

```sh
<!doctype html>
<html>
...
</html>
```
