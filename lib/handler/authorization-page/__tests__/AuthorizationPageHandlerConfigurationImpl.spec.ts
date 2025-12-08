import { describe, expect, it, vi } from 'vitest';
import { AuthorizationPageHandlerConfigurationImpl } from '../AuthorizationPageHandlerConfigurationImpl';
import { defaultComputeScopes } from '../computeScopes';
import { defaultExtractRequestedClaims } from '../extractRequestedClaims';
import { createBuildAuthorizationPageModel } from '../buildAuthorizationPageModel';
import type { Scope } from '../../../schemas/common/Scope';
import type { DynamicScope } from '../../../schemas/common/DynamicScope';
import type { AuthorizationResponse } from '../../../schemas/authorization/AuthorizationResponse';
import type { User } from '../../../schemas/common/User';
import type { FederationRegistry } from '../../../schemas/federation';

describe('AuthorizationPageHandlerConfigurationImpl', () => {
  describe('initialization', () => {
    it('should have all required properties', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Assert
      expect(config.computeScopes).toBeDefined();
      expect(config.extractRequestedClaims).toBeDefined();
      expect(config.buildAuthorizationPageModel).toBeDefined();
    });

    it('should use default implementations', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Assert
      expect(config.computeScopes).toBe(defaultComputeScopes);
      expect(config.extractRequestedClaims).toBe(defaultExtractRequestedClaims);
    });

    it('should create buildAuthorizationPageModel with default functions', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Assert
      expect(typeof config.buildAuthorizationPageModel).toBe('function');
    });
  });

  describe('computeScopes function', () => {
    it('should handle undefined scopes and dynamic scopes', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Act
      const result = config.computeScopes();

      // Assert
      expect(result).toEqual([]);
    });

    it('should handle undefined dynamic scopes', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const scopes: Scope[] = [{ name: 'read' }, { name: 'write' }];

      // Act
      const result = config.computeScopes(scopes);

      // Assert
      expect(result).toEqual(scopes);
    });

    it('should combine scopes and dynamic scopes', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const scopes: Scope[] = [{ name: 'read' }];
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamic_scope' }];

      // Act
      const result = config.computeScopes(scopes, dynamicScopes);

      // Assert
      expect(result).toEqual([{ name: 'read' }, { name: 'dynamic_scope' }]);
    });

    it('should handle empty arrays', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const scopes: Scope[] = [];
      const dynamicScopes: DynamicScope[] = [];

      // Act
      const result = config.computeScopes(scopes, dynamicScopes);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('extractRequestedClaims function', () => {
    it('should handle undefined claims JSON', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Act
      const result = config.extractRequestedClaims();

      // Assert
      expect(result).toBeUndefined();
    });

    it('should handle empty claims JSON', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Act
      const result = config.extractRequestedClaims('');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should handle invalid JSON', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const result = config.extractRequestedClaims('invalid json');

      // Assert
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();

      // Cleanup
      consoleSpy.mockRestore();
    });

    it('should handle JSON without verified_claims', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const claimsJson = JSON.stringify({ other_field: 'value' });

      // Act
      const result = config.extractRequestedClaims(claimsJson);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should extract claims from object format', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const claimsJson = JSON.stringify({
        verified_claims: {
          claims: {
            given_name: { purpose: 'display' },
            family_name: { purpose: 'display' },
          },
        },
      });

      // Act
      const result = config.extractRequestedClaims(claimsJson);

      // Assert
      expect(result).toEqual([
        { key: 'given_name', value: 'display' },
        { key: 'family_name', value: 'display' },
      ]);
    });

    it('should extract claims from array format', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const claimsJson = JSON.stringify({
        verified_claims: [
          {
            claims: {
              given_name: { purpose: 'display' },
            },
          },
          {
            claims: {
              family_name: { purpose: 'display' },
            },
          },
        ],
      });

      // Act
      const result = config.extractRequestedClaims(claimsJson);

      // Assert
      expect(result).toEqual([
        { key: 'given_name', value: 'display' },
        { key: 'family_name', value: 'display' },
      ]);
    });
  });

  describe('buildAuthorizationPageModel function', () => {
    it('should build model with minimal data', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
      } as AuthorizationResponse;
      const mockUser: User = { subject: 'user123' } as User;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        mockUser
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.authorizationResponse).toBe(mockAuthorizationResponse);
      expect(result.serviceName).toBe('Test Service');
      expect(result.clientName).toBe('Test Client');
      expect(result.user).toBe(mockUser);
      expect(result.scopes).toEqual([]);
      expect(result.identityAssuranceRequired).toBe(false);
    });

    it('should build model with scopes', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
        scopes: [{ name: 'read' }, { name: 'write' }],
        dynamicScopes: [{ name: 'dynamic_scope' }],
      } as AuthorizationResponse;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.scopes).toEqual([
        { name: 'read' },
        { name: 'write' },
        { name: 'dynamic_scope' },
      ]);
    });

    it('should handle undefined user', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
      } as AuthorizationResponse;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.user).toBeUndefined();
    });

    it('should set loginId from subject when available', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
        subject: 'user123',
      } as AuthorizationResponse;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.loginId).toBe('user123');
      expect(result.loginIdReadOnly).toBe('readonly');
    });

    it('should set loginId from loginHint when subject is not available', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
        loginHint: 'hint123',
      } as AuthorizationResponse;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.loginId).toBe('hint123');
      expect(result.loginIdReadOnly).toBeUndefined();
    });

    it('should include federationRegistry when set', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const federationRegistry: FederationRegistry = {
        federations: [
          {
            id: 'federation1',
            protocol: 'oidc',
            client: {
              clientId: 'client1',
              clientSecret: 'secret1',
              redirectUri: 'https://example.com/redirect',
              scopes: ['openid', 'email', 'profile', 'address', 'phone'],
            },
            server: {
              name: 'Server 1',
              issuer: 'https://server1.example.com',
            },
          },
        ],
      };
      config.federationRegistry = federationRegistry;
      // Create a new buildAuthorizationPageModel with federationRegistry
      const buildAuthorizationPageModel = createBuildAuthorizationPageModel({
        computeScopes: config.computeScopes,
        extractRequestedClaims: config.extractRequestedClaims,
        federationRegistry: config.federationRegistry,
      });
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
      } as AuthorizationResponse;

      // Act
      const result = buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.federationRegistry).toEqual(federationRegistry);
    });

    it('should handle undefined federationRegistry', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockAuthorizationResponse: AuthorizationResponse = {
        action: 'INTERACTION',
        service: { serviceName: 'Test Service' },
        client: { clientName: 'Test Client' },
      } as AuthorizationResponse;

      // Act
      const result = config.buildAuthorizationPageModel(
        mockAuthorizationResponse,
        undefined
      );

      // Assert
      expect(result.federationRegistry).toBeUndefined();
    });
  });

  describe('function types', () => {
    it('should have correct function signatures', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Assert
      expect(typeof config.computeScopes).toBe('function');
      expect(typeof config.extractRequestedClaims).toBe('function');
      expect(typeof config.buildAuthorizationPageModel).toBe('function');
    });

    it('should accept correct parameters for computeScopes', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const scopes: Scope[] = [{ name: 'test' }];
      const dynamicScopes: DynamicScope[] = [{ name: 'dynamic' }];

      // Act & Assert - should not throw
      expect(() => config.computeScopes()).not.toThrow();
      expect(() => config.computeScopes(scopes)).not.toThrow();
      expect(() => config.computeScopes(scopes, dynamicScopes)).not.toThrow();
    });

    it('should accept correct parameters for extractRequestedClaims', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();

      // Act & Assert - should not throw
      expect(() => config.extractRequestedClaims()).not.toThrow();
      expect(() => config.extractRequestedClaims('')).not.toThrow();
      expect(() => config.extractRequestedClaims('{}')).not.toThrow();
    });

    it('should accept correct parameters for buildAuthorizationPageModel', () => {
      // Arrange
      const config = new AuthorizationPageHandlerConfigurationImpl();
      const mockResponse: AuthorizationResponse = {
        action: 'INTERACTION',
      } as AuthorizationResponse;
      const mockUser: User = { subject: 'test' } as User;

      // Act & Assert - should not throw
      expect(
        () => config.buildAuthorizationPageModel(mockResponse, mockUser)
      ).not.toThrow();
      expect(
        () => config.buildAuthorizationPageModel(mockResponse, undefined)
      ).not.toThrow();
    });
  });
});
