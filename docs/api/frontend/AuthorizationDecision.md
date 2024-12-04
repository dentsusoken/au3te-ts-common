# 認可決定 エンドポイント

## 概要

ユーザーからの同意を受け取り認可コードを発行するためのエンドポイント。

## URL

https://issuer-hono.g-trustedweb.workers.dev/api/authorization/decision

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー | 必須 | 説明                                                                                                |
| -------- | ---- | --------------------------------------------------------------------------------------------------- |
| Cookie   | Yes  | 認可エンドポイントへのリクエスト時に払い出されるセッション ID<br>形式： `_sessionId={セッションID}` |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                                   |
| ------------ | -------- | ---- | -------------------------------------- |
| loginId      | string   | Yes  | ログイン ID                            |
| password     | string   | Yes  | パスワード                             |
| authorized   | string   | No   | 認可リクエストを許可を示すパラメータ   |
| denied       | string   | No   | 認可リクエストへの拒否を示すパラメータ |

## レスポンス

### ヘッダー

| ヘッダー | 説明                             |
| -------- | -------------------------------- |
| Location | 認可コードを含むリダイレクト URI |

## サンプルリクエスト

```sh
curl -v https://issuer-hono.g-trustedweb.workers.dev/api/authorization/decision \
     -H "Cookie: _sessionId=c52ca74b-24a8-40cb-55de-e61a717ee3c9" \
     -d loginId=inga \
     -d password=inga \
     -d authorized=Authorize
```

## サンプルレスポンス

```text
eudi-openid4ci://authorize/?state=7342EFBD-3D9F-4895-8445-18F365B8C66C&code=Akyl_7V8J-Q35VlSX4b0prouiPr47S7eVkdc-VzbiqE&iss=https%3A%2F%2Fissuer-hono.g-trustedweb.workers.dev
```
