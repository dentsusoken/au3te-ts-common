# クレデンシャルエンドポイント

## 概要

認可リクエストのパラメータを解析し、認可リクエストの処理を進めるためのエンドポイント。

## URL

https://issuer.g-trustedweb.workers.dev/api/credential

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                                                                     |
| ------------- | ---- | ------------------------------------------------------------------------ |
| DPoP          | No   | DPoP proof JWT ([RFC 9449](https://www.rfc-editor.org/rfc/rfc9449.html)) |
| Authorization | Yes  | `Bearer {アクセストークン}`                                              |

### パラメータ

| パラメータ名 | データ型 | 必須 | 説明                               |
| ------------ | -------- | ---- | ---------------------------------- |
| format       | string   | Yes  | 発行する VC のフォーマット         |
| doctype      | string   | Yes  | 発行する VC のタイプ               |
| claims       | string   | Yes  | 発行する VC に含めるクレームの指定 |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名       | データ型 | 説明                                 |
| ------------------ | -------- | ------------------------------------ |
| credential         | string   | 発行された VC                        |
| c_nonce            | string   | アクセストークンに紐づくランダムな値 |
| c_nonce_expires_in | number   | c_nonce の有効期限                   |

## サンプルリクエスト

```sh
curl -s https://issuer.g-trustedweb.workers.dev/api/credential \
     -H "DPoP: {DPOP_PROOF_JWT} \
     -H "Authorization: Bearer {アクセストークン}" \
     -H "Content-Type: application/json" \
     --data '{
  "format": "mso_mdoc",
  "doctype": "org.iso.18013.5.1.mDL",
  "claims": {
    "org.iso.18013.5.1": {
      "family_name": {},
      "given_name": {},
      "birth_date": {},
      "issue_date": {},
      "expiry_date": {},
      "issuing_country": {},
      "document_number": {},
      "driving_privileges": {}
    }
  }
}'
```

## サンプルレスポンス

```sh
{
    "credential": "ompuYW1lU3BhY2VzoXFvcmcuaXNvLjE4MDEzLjUuMYLYGFhSpGhkaWdlc3RJRAFmcmFuZG9tUPGem_IYC8NsHr4qYrWNfntxZWxlbWVudElkZW50aWZpZXJqZ2l2ZW5fbmFtZWxlbGVtZW50VmFsdWVkSW5nYdgYWFukaGRpZ2VzdElEAmZyYW5kb21QGya5f76b71Iu9cT09yM4dXFlbGVtZW50SWRlbnRpZmllcm9kb2N1bWVudF9udW1iZXJsZWxlbWVudFZhbHVlaDEyMzQ1Njc4amlzc3VlckF1dGiEQ6EBJqEYIVkBsjCCAa4wggFVoAMCAQICFDuCRjhSoUs2mD8rCF3ZzZgN5I67MAoGCCqGSM49BAMCMC0xKzApBgNVBAMMInR3MjQtb2F1dGgtc2VydmVyLmFuLnIuYXBwc3BvdC5jb20wHhcNMjQwMzI3MDczNjQxWhcNMzQwMzI1MDczNjQxWjAtMSswKQYDVQQDDCJ0dzI0LW9hdXRoLXNlcnZlci5hbi5yLmFwcHNwb3QuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyhzAZM_A8qPwoefys0VST9VtIaoPUrc4y95kS1X0Jl_sFDDGPdarLhd4l7vvYPYdnj1BzLlSG4VYLTPvd9ossKNTMFEwHQYDVR0OBBYEFFGFZ3lZYJZlgn-fPBqnj6D08hQOMB8GA1UdIwQYMBaAFFGFZ3lZYJZlgn-fPBqnj6D08hQOMA8GA1UdEwEB_wQFMAMBAf8wCgYIKoZIzj0EAwIDRwAwRAIgMhj4kQ8Y0AEpy_qfhMNfJxUAMYsvQkIaonbidQwOchcCIEjfvW6CK7NWPJbivxL_HhZkMecDwcj_e4zid7WOuA0MWQEb2BhZARalZ3ZlcnNpb25jMS4wb2RpZ2VzdEFsZ29yaXRobWdTSEEtMjU2bHZhbHVlRGlnZXN0c6Fxb3JnLmlzby4xODAxMy41LjGiAVggEQkCb5aTgjQfQbt_Xhdh_mTLmBCawVQa2W8dJOH5P54CWCCVZ7Zrine6jOZx5I8zpPq3Mx0AcTr5seq0hSx5i4VZG2dkb2NUeXBldW9yZy5pc28uMTgwMTMuNS4xLm1ETGx2YWxpZGl0eUluZm-jZnNpZ25lZMB0MjAyNC0xMS0xOFQwMTowMTo1NVppdmFsaWRGcm9twHQyMDI0LTExLTE4VDAxOjAxOjU1Wmp2YWxpZFVudGlswHQyMDI1LTExLTE4VDAxOjAxOjU1WlhA8rKXRqAMYV0ywM8TiMykzhZZTApFErrVu3he40O_9pr_8soDKC9L4-Y77t14-CIezA0U3P_eauBGIHzVtUolLw",
    "c_nonce": "vyO469c8_zg-HsT9wjJYnFnvvY2VE7GWfqTBCU-6His",
    "c_nonce_expires_in": 86307
}
```
