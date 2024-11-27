import { describe, expect, it } from 'vitest';
import { AuthorizationPageHandlerConfigurationImpl } from './AuthorizationPageHandlerConfigurationImpl';

describe('AuthorizationPageHandlerConfigurationImpl', () => {
  it('should have all required properties', () => {
    // Arrange
    const config = new AuthorizationPageHandlerConfigurationImpl();

    // Assert
    // Check if all required properties exist
    expect(config.computeScopes).toBeDefined();
    expect(config.extractRequestedClaims).toBeDefined();
    expect(config.buildAuthorizationPageModel).toBeDefined();
  });
});
