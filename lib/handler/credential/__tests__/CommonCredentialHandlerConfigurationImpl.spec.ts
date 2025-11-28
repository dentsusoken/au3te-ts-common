import { describe, it, expect, vi } from 'vitest';
import { CommonCredentialHandlerConfigurationImpl } from '../CommonCredentialHandlerConfigurationImpl';
import { UserHandlerConfiguration } from '../../user/UserHandlerConfiguration';

describe('CommonCredentialHandlerConfigurationImpl', () => {
  it('should have all properties defined', () => {
    // Create mock UserHandlerConfiguration
    const mockUserHandlerConfiguration: UserHandlerConfiguration = {
      getByCredentials: vi.fn(),
      getBySubject: vi.fn(),
      getMdocClaimsBySubjectAndDoctype: vi.fn(),
      addUser: vi.fn(),
    };

    // Create instance
    const config = new CommonCredentialHandlerConfigurationImpl({
      userHandlerConfiguration: mockUserHandlerConfiguration,
    });

    // Verify all properties are defined
    expect(config.containsRequestedMdocClaims).toBeDefined();
    expect(config.mdocCheckPermissions).toBeDefined();
    expect(config.buildMdocSubClaims).toBeDefined();
    expect(config.buildMdocClaims).toBeDefined();
    expect(config.mdocCollectClaims).toBeDefined();
    expect(config.mdocComputeCredentialDuration).toBeDefined();
    expect(config.mdocCreateOrder).toBeDefined();
    expect(config.mdocToOrder).toBeDefined();
    expect(config.getToOrder).toBeDefined();
  });
});
