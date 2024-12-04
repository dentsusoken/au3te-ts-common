# 認可エンドポイント

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるためのエンドポイント。

## URL

https://issuer-hono.g-trustedweb.workers.dev/api/authorization

## リクエスト

### メソッド

- GET
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

### ヘッダー

| ヘッダー   | 必須 | 説明                                                                                                |
| ---------- | ---- | --------------------------------------------------------------------------------------------------- |
| Set-Cookie | Yes  | 認可エンドポイントへのリクエスト時に払い出されるセッション ID<br>形式： `_sessionId={セッションID}` |

### フォーマット

- HTML

### レスポンスボディ

- 同意画面を表示するためのHTML

## サンプルリクエスト

### パターン 1

```sh
curl -v "https://issuer-hono.g-trustedweb.workers.dev/api/authorization?\
client_id={クライアントID}&\
response_type=code&\
scope=org.iso.18013.5.1.mDL+openid&\
redirect_uri=eudi-openid4ci://authorize/&\
state=7342EFBD-3D9F-4895-8445-18F365B8C66C&\
code_challenge=-wWUU3X62rCR7Z-zsCrfT7wPxLrticYIzI6mrXSqgzs&\
code_challenge_method=S256"
```

### パターン 2

```sh
curl -v "https://issuer-hono.g-trustedweb.workers.dev/api/authorization?\
client_id={クライアントID}&\
request_uri=urn:ietf:params:oauth:request_uri:Sv6EwBP0zBYwImCGJS3ewOt-jM43xk2C3SFLINSEctQ"
```

## サンプルレスポンス

```html
<!doctype html>
<html>
...
</html>
```
