# VCI Single Issue

> [!NOTE]
> より詳細な情報は以下を参照してください。
> [参照: Authlete API リファレンス](https://docs.authlete.com/en/shared/latest#post-/api/-serviceId-/vci/single/issue)

## 概要

受け取ったクレデンシャルリクエストを解析して有効性を確認し、クレデンシャルリクエストの情報を取得するためのエンドポイント。

## URL

https://nextdev-api.authlete.net/api/{サービスID}/vci/single/issue

## リクエスト

### メソッド

- POST

### ヘッダー

| ヘッダー      | 必須 | 説明                             |
| ------------- | ---- | -------------------------------- |
| Content-Type  | Yes  | `application/json;charset=utf-8` |
| Authorization | Yes  | `Bearer {アクセストークン}`      |

### パラメータ

| パラメータ名             | データ型 | 必須 | 説明                                               |
| ------------------------ | -------- | ---- | -------------------------------------------------- |
| accessToken              | string   | Yes  | クレデンシャルリクエストに付随するアクセストークン |
| order.requestIdentifier  | string   | Yes  | クレデンシャルリクエストの識別子                   |
| order.credentialPayload  | string   | No   | 発行されるクレデンシャルに追加される追加ペイロード |
| order.issuanceDeferred   | boolean  | No   | クレデンシャル発行を延期するかどうかのフラグ       |
| order.credentialDuration | integer  | No   | 発行されるクレデンシャルの有効期間                 |
| order.signingKeyId       | string   | No   | クレデンシャルの署名に使用する秘密鍵のキー ID      |

## レスポンス

### フォーマット

- JSON

### パラメータ

| パラメータ名    | データ型 | 説明                                                                                                                                                         |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| resultCode      | string   | API 呼び出しの結果コード                                                                                                                                     |
| resultMessage   | string   | API 呼び出しの結果を説明する短いメッセージ                                                                                                                   |
| action          | string   | クレデンシャルエンドポイントの実装が次に取るべきアクション<br>許可値: `OK`、`ACCEPTED`、`UNAUTHORIZED`、`FORBIDDEN`、`INTERNAL_SERVER_ERROR`、`CALLER_ERROR` |
| responseContent | string   | クレデンシャルエンドポイントの実装が返すべきレスポンスのコンテンツ                                                                                           |
| transactionId   | string   | 発行されたトランザクション ID                                                                                                                                |

## サンプルリクエスト

```sh
curl -v -X POST https://nextdev-api.authlete.net/api/{サービスID}/vci/single/issue \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {アクセストークン}' \
-d '{
  "accessToken": "-LCEsM_ZQS62Wbe9d8tWMqhNZE9qB8uAimQWYydnVGw",
  "order": {
    "requestIdentifier": "toOnsBUXw3k39IZPafbYR8LcixG2zOtfWiziM-Xd-WI",
    "credentialPayload": "{\"doctype\":\"org.iso.18013.5.1.mDL\",\"claims\":{\"org.iso.18013.5.1\":{\"family_name\":{},\"given_name\":{},\"birth_date\":{},\"issue_date\":{},\"expiry_date\":{},\"issuing_country\":{},\"document_number\":{},\"driving_privileges\":{}}}}"
  }
}'
```

## サンプルレスポンス

```json
{
  "action": "OK",
  "responseContent": "{\"credential\":\"ompuYW1lU3BhY2VzoXFvcmcuaXNvLjE4MDEzLjUuMYjYGFhPpGhkaWdlc3RJRAFmcmFuZG9tUJN8fssakoBu0N5r0Lu44hFxZWxlbWVudElkZW50aWZpZXJrZmFtaWx5X25hbWVsZWxlbWVudFZhbHVloNgYWE6kaGRpZ2VzdElEAmZyYW5kb21Q4RPSGFTXQ_jF7iTStCdlYnFlbGVtZW50SWRlbnRpZmllcmpnaXZlbl9uYW1lbGVsZW1lbnRWYWx1ZaDYGFhOpGhkaWdlc3RJRANmcmFuZG9tUAxYuO8jWPuLAxVvxBPAB_pxZWxlbWVudElkZW50aWZpZXJqYmlydGhfZGF0ZWxlbGVtZW50VmFsdWWg2BhYTqRoZGlnZXN0SUQEZnJhbmRvbVD2w-6V68cmKf4HAewXwIvocWVsZW1lbnRJZGVudGlmaWVyamlzc3VlX2RhdGVsZWxlbWVudFZhbHVloNgYWE-kaGRpZ2VzdElEBWZyYW5kb21QPSEYn0rPbswoOYiXj-uvJHFlbGVtZW50SWRlbnRpZmllcmtleHBpcnlfZGF0ZWxlbGVtZW50VmFsdWWg2BhYU6RoZGlnZXN0SUQGZnJhbmRvbVBJXfLDYy5P_q2Itde8lLNRcWVsZW1lbnRJZGVudGlmaWVyb2lzc3VpbmdfY291bnRyeWxlbGVtZW50VmFsdWWg2BhYU6RoZGlnZXN0SUQHZnJhbmRvbVAWRbnTuzXe6kv8d0fGH6YhcWVsZW1lbnRJZGVudGlmaWVyb2RvY3VtZW50X251bWJlcmxlbGVtZW50VmFsdWWg2BhYVqRoZGlnZXN0SUQIZnJhbmRvbVBpKBKKmbrArOa70d6Bpdb3cWVsZW1lbnRJZGVudGlmaWVycmRyaXZpbmdfcHJpdmlsZWdlc2xlbGVtZW50VmFsdWWgamlzc3VlckF1dGiEQ6EBJqEYIVkBsjCCAa4wggFVoAMCAQICFDuCRjhSoUs2mD8rCF3ZzZgN5I67MAoGCCqGSM49BAMCMC0xKzApBgNVBAMMInR3MjQtb2F1dGgtc2VydmVyLmFuLnIuYXBwc3BvdC5jb20wHhcNMjQwMzI3MDczNjQxWhcNMzQwMzI1MDczNjQxWjAtMSswKQYDVQQDDCJ0dzI0LW9hdXRoLXNlcnZlci5hbi5yLmFwcHNwb3QuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyhzAZM_A8qPwoefys0VST9VtIaoPUrc4y95kS1X0Jl_sFDDGPdarLhd4l7vvYPYdnj1BzLlSG4VYLTPvd9ossKNTMFEwHQYDVR0OBBYEFFGFZ3lZYJZlgn-fPBqnj6D08hQOMB8GA1UdIwQYMBaAFFGFZ3lZYJZlgn-fPBqnj6D08hQOMA8GA1UdEwEB_wQFMAMBAf8wCgYIKoZIzj0EAwIDRwAwRAIgMhj4kQ8Y0AEpy_qfhMNfJxUAMYsvQkIaonbidQwOchcCIEjfvW6CK7NWPJbivxL_HhZkMecDwcj_e4zid7WOuA0MWQHt2BhZAeilZ3ZlcnNpb25jMS4wb2RpZ2VzdEFsZ29yaXRobWdTSEEtMjU2bHZhbHVlRGlnZXN0c6Fxb3JnLmlzby4xODAxMy41LjGoAVggB8B1w2rmOoCZ6hXdoWJl-ld_CTIbowXekkC-dxo4_KICWCD4sf4gifJdMi4lZ852GbNzAm0dDbjRhqoh_HZXEB2PFwNYIL1gwKL3tdAeby_yMKVQRQvL3KpTrLiGogC459yrOqcEBFggOb2Y6YeAE8nt4TVpmky7tfQlh1JTpQZjTtlMFc_pEngFWCB1AoM9X1PsM-fCB2s61LzbA_nYwXFtF2pgMxFraW3lmQZYIIDplShqaTXanQibFWXs9cjubSfb8GGnUa299r8wNqsPB1gglYmkMqZ8BiLllviuK6LloTZyB5I6q6mS3fusoMRwqhcIWCCpfrQjVfk5x3_3zixCogRqebSnk5MTRPmMQe6BHA4V-2dkb2NUeXBldW9yZy5pc28uMTgwMTMuNS4xLm1ETGx2YWxpZGl0eUluZm-jZnNpZ25lZMB0MjAyNC0xMS0xOVQwNToxNjowMFppdmFsaWRGcm9twHQyMDI0LTExLTE5VDA1OjE2OjAwWmp2YWxpZFVudGlswHQ5OTk5LTEyLTMxVDIzOjU5OjU5WlhAZnlWDJYAXwe-Lr3IjVQHQHnBwfLAQYcly4GO1RLJx4xTKl54_CDoF576KXqIq1Z1p1q3-lMeTvfeS9pGb4QHcg\",\"c_nonce\":\"X6MJZZlLLHZtX78zeg7l3d1F8ol0Lh55cvFsWFsbBME\",\"c_nonce_expires_in\":85092}",
  "transactionId": null,
  "resultCode": "A383001",
  "resultMessage": "[A383001] A credential was issued successfully."
}
```
