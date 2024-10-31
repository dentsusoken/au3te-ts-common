import { describe, expect, it } from 'vitest';
import { AuthorizationPageModelConfigurationImpl } from './AuthorizationPageModelConfigurationImpl';

describe('AuthorizationPageModelConfigurationImpl', () => {
  it('should have all required properties', () => {
    // Arrange
    const config = new AuthorizationPageModelConfigurationImpl();

    // Assert
    // Check if all required properties exist
    expect(config.computeScopes).toBeDefined();
    expect(config.extractRequestedClaims).toBeDefined();
    expect(config.buildAuthorizationPageModel).toBeDefined();
  });
});
