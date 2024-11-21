# Pushed Authorization Request

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/pushed_auth_req)

## 概要

Pushed Authorization Request を実行するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/pushed_auth_req

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名              | データ型 | 必須 | 説明                                                                                                            |
| ------------------------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------- |
| parameters                | string   | Yes  | クライアントアプリケーションから受け取った認可リクエストボディ（`application/x-www-form-urlencoded`形式）       |
| clientId                  | string   | No   | クライアントアプリケーションからの認可リクエストの`Authorization`ヘッダーから抽出されたクライアント ID          |
| clientSecret              | string   | No   | クライアントアプリケーションからの認可リクエストの`Authorization`ヘッダーから抽出されたクライアントシークレット |
| clientCertificate         | string   | No   | クライアントアプリケーションからの`MTLS`接続で使用されたクライアント証明書                                      |
| clientCertificatePath     | string   | No   | クライアント認証時に提示された証明書パス（`PEM`形式の文字列）                                                   |
| dpop                      | string   | No   | `DPoP`ヘッダー                                                                                                  |
| htm                       | string   | No   | `HTTP`メソッド（`DPoP`検証用）                                                                                  |
| htu                       | string   | No   | `HTTP`ベース`URL`（`DPoP`検証用）                                                                               |
| oauthClientAttestation    | string   | No   | OAuth-Client-Attestation HTTP ヘッダの値                                                                        |
| oauthClientAttestationPop | string   | No   | OAuth-Client-Attestation-PoP HTTP ヘッダの値                                                                    |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名     | データ型 | 説明                                                                                                                                                                                                                                          |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCode       | string   | API 呼び出しの結果コード                                                                                                                                                                                                                      |
| resultMessage    | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                                                                                                                    |
| action           | string   | 認可サーバーが次に取るべきアクション（`"CREATED"`以外は失敗として扱う）<br>許可値: `CREATED`、`BAD_REQUEST`、`UNAUTHORIZED`、`FORBIDDEN`、`PAYLOAD_TOO_LARGE`、`INTERNAL_SERVER_ERROR`                                                        |
| requestUri       | string   | クライアントに発行された`request_uri`（認可リクエスト時の`request_uri`パラメータとして使用される）                                                                                                                                            |
| responseContent  | string   | クライアントアプリケーションに返すべきコンテンツ                                                                                                                                                                                              |
| clientAuthMethod | string   | クライアントアプリケーションがトークンエンドポイントで使用すると宣言している認証方式<br>許可値: `NONE`、`CLIENT_SECRET_BASIC`、`CLIENT_SECRET_POST`、`CLIENT_SECRET_JWT`、`PRIVATE_KEY_JWT`、`TLS_CLIENT_AUTH`、`SELF_SIGNED_TLS_CLIENT_AUTH` |
| dpopNonce        | string   | `DPoP proof JWT`で使用される予期される`nonce`の値（`DPoP-Nonce HTTP`ヘッダーの値として使用される）                                                                                                                                            |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/pushed_auth_req \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{ 
    "parameters": "response_type=code%20id_token&client_id=5921531358155430&redirect_uri=https%3A%2F%2Fserver.example.com%2Fcb&state=SOME_VALUE_ABLE_TO_PREVENT_CSRF&scope=openid&nonce=SOME_VALUE_ABLE_TO_PREVENT_REPLAY_ATTACK&code_challenge=5ZWDQJiryK3eaLtSeFV8y1XySMCWtyITxICLaTwvK8g&code_challenge_method=S256",
 "clientId": "5921531358155430"
}'
```

## サンプルレスポンス

```json
{
  "resultCode": "A245001",
  "resultMessage": "[A245001] Successfully registered a request object for client (5921531358155430), URI is urn:ietf:params:oauth:request_uri:CAK9YEtNorwXE3UwSyihsBOL0jFrqUup7yAACw5y5Zg.",
  "action": "CREATED",
  "requestUri": "urn:ietf:params:oauth:request_uri:CAK9YEtNorwXE3UwSyihsBOL0jFrqUup7yAACw5y5Zg",
  "responseContent": "{'expires_in':600,'request_uri':'urn:ietf:params:oauth:request_uri:CAK9YEtNorwXE3UwSyihsBOL0jFrqUup7yAACw5y5Zg'}"
}
```
