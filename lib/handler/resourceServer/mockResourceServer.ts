/*
 * Copyright (C) 2023 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */
import { ResourceServer } from '../../schemas/common';

export const mockResourceServers: ResourceServer[] = [
  {
    id: 'rs0',
    secret: 'rs0-secret',
    uri: 'https//rs0.example.com',
    introspectionSignAlg: 'ES256',
    introspectionEncryptionAlg: 'RSA-OAEP-256',
    introspectionEncryptionEnc: 'A128CBC-HS256',
    publicKeyForIntrospectionResponseEncryption:
      '{"kty":"RSA", "e": "AQAB","use": "enc","kid": "22BGA3qKjBG7a5Y5lmftcOYkeUCql_G12qPbjBn08rA","alg": "RSA-OAEP-256","n": "0bBna89O_reo8ttH1ITZ9sBc601OAOTHIdMQ3vwUYrrb-x2Zgp8BvueYKAeMy5kvv05zAGHqnF76v_z-XjT3Dr85xdY9ruNHA-Sg9hupa5NTUFbTOareh7MldjQNer9sejVeNmy7Wtk3CP7Y7p581VLSqj8r5DGsVh6Ha2mw5EiqtHLCPAMXMdb6pUMZ7TdKioHd-NMLwcL-p-OKGfF0znf-Fho-5KdoX855Digt2ud8LARe-qMA1DbSoHI1zowQeezRmcj_cbdv9RUaRmxg3Wqr_87WOninWA71qZFeLNEFitjQldf6FZhJ143lWnnMdzTBVvBBav0KHnsVcr982Q"}',
  },
];
