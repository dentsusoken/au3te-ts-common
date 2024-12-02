import { describe, it, expect } from 'vitest';
import { CommonCredentialHandlerConfigurationImpl } from './CommonCredentialHandlerConfigurationImpl';
import { UserHandlerConfigurationImpl } from '../user/UserHandlerConfigurationImpl';
import { CLAIMS, DOCTYPE, FORMAT, MSO_MDOC } from './constants';
import type { CredentialRequestInfo } from '../../schemas/credential/CredentialRequestInfo';
import type { IntrospectionResponse } from '../../schemas/introspection/IntrospectionResponse';

describe('CommonCredentialHandlerConfigurationImpl integration tests', () => {
  const userHandlerConfiguration = new UserHandlerConfigurationImpl();
  const commonCredentialHandlerConfiguration =
    new CommonCredentialHandlerConfigurationImpl({
      userHandlerConfiguration,
    });

  it('should convert mdoc request to order with specific claims', async () => {
    // Prepare test data
    const issuableCredentials = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            family_name: {},
            given_name: {},
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
      [CLAIMS]: {
        'org.iso.18013.5.1': {
          given_name: {},
        },
      },
    };

    const credentialRequestInfo: CredentialRequestInfo = {
      format: MSO_MDOC,
      details: JSON.stringify(requestedCredential),
      identifier: 'test-request-id',
    };

    const introspectionResponse = {
      subject: '1004',
      issuableCredentials: JSON.stringify(issuableCredentials),
    } as IntrospectionResponse;

    // Execute toOrder
    const order = await commonCredentialHandlerConfiguration.mdocToOrder({
      credentialType: 'single',
      credentialRequestInfo,
      introspectionResponse,
    });

    // Verify the result
    expect(order).toBeDefined();
    expect(order.requestIdentifier).toBe('test-request-id');
    expect(order.credentialPayload).toBeDefined();
    expect(order.issuanceDeferred).toBe(false);
    expect(order.credentialDuration).toBeDefined();
    expect(JSON.parse(order.credentialPayload as string)).toEqual({
      doctype: 'org.iso.18013.5.1.mDL',
      claims: {
        'org.iso.18013.5.1': {
          given_name: 'Inga',
        },
      },
    });
  });

  it('should convert mdoc request to order with all available claims when no specific claims are requested', async () => {
    // Prepare test data
    const issuableCredentials = [
      {
        [FORMAT]: MSO_MDOC,
        [DOCTYPE]: 'org.iso.18013.5.1.mDL',
        [CLAIMS]: {
          'org.iso.18013.5.1': {
            family_name: {},
            given_name: {},
          },
        },
      },
    ];

    const requestedCredential = {
      [DOCTYPE]: 'org.iso.18013.5.1.mDL',
    };

    const credentialRequestInfo: CredentialRequestInfo = {
      format: MSO_MDOC,
      details: JSON.stringify(requestedCredential),
      identifier: 'test-request-id',
    };

    const introspectionResponse = {
      subject: '1004',
      issuableCredentials: JSON.stringify(issuableCredentials),
    } as IntrospectionResponse;

    // Execute toOrder
    const order = await commonCredentialHandlerConfiguration.mdocToOrder({
      credentialType: 'single',
      credentialRequestInfo,
      introspectionResponse,
    });

    // Verify the result
    expect(order).toBeDefined();
    expect(order.requestIdentifier).toBe('test-request-id');
    expect(order.credentialPayload).toBeDefined();
    expect(order.issuanceDeferred).toBe(false);
    expect(order.credentialDuration).toBeDefined();
    expect(JSON.parse(order.credentialPayload as string)).toEqual({
      doctype: 'org.iso.18013.5.1.mDL',
      claims: {
        'org.iso.18013.5.1': {
          given_name: 'Inga',
          family_name: 'Silverstone',
        },
      },
    });
  });
});
