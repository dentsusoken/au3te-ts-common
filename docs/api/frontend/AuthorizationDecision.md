# 認可決定 エンドポイント

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/authorization/decision

## リクエスト

### メソッド

- POST

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
curl -s https://issuer.g-trustedweb.workers.dev/api/authorization/decision \
     -d loginId=inga \
     -d password=inga \
     -d authorized=Authorize
```

## サンプルレスポンス

```sh
eudi-openid4ci://authorize/?state=7342EFBD-3D9F-4895-8445-18F365B8C66C&code=Akyl_7V8J-Q35VlSX4b0prouiPr47S7eVkdc-VzbiqE&iss=https%3A%2F%2Fissuer.g-trustedweb.workers.dev
```
