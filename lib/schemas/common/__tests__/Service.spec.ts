import { describe, it, expect } from 'vitest';
import { serviceSchema, type Service } from '../Service';

describe('Service', () => {
  describe('serviceSchema', () => {
    it('should accept a valid service with a string serviceName', () => {
      const validService = { serviceName: 'Test Service' };
      const result = serviceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a valid service with a null serviceName', () => {
      const validService = { serviceName: null };
      const result = serviceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a valid service with an undefined serviceName', () => {
      const validService = { serviceName: undefined };
      const result = serviceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a valid service without a serviceName', () => {
      const validService = {};
      const result = serviceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should accept a service with empty string serviceName', () => {
      const validService = { serviceName: '' };
      const result = serviceSchema.parse(validService);
      expect(result).toEqual(validService);
    });

    it('should reject a service with an invalid serviceName type', () => {
      const invalidServices = [
        { serviceName: 123 },
        { serviceName: true },
        { serviceName: false },
        { serviceName: {} },
        { serviceName: [] },
        { serviceName: () => {} },
      ];

      invalidServices.forEach((invalidService) => {
        const result = serviceSchema.safeParse(invalidService);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-object values', () => {
      const nonObjectValues = [
        'string',
        123,
        true,
        false,
        null,
        undefined,
        [],
        () => {},
      ];

      nonObjectValues.forEach((value) => {
        const result = serviceSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof serviceSchema._type;
      type ExpectedType = Service;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should allow additional properties due to passthrough', () => {
      const serviceWithExtra = {
        serviceName: 'TestService',
        extraProperty: 'This is an extra property',
        anotherExtra: 123,
        nestedObject: { key: 'value' },
        arrayProperty: [1, 2, 3],
      };
      const result = serviceSchema.parse(serviceWithExtra);
      expect(result).toEqual(serviceWithExtra);
    });

    it('should handle complex service names', () => {
      const complexServices = [
        { serviceName: 'My Test Service v1.0' },
        { serviceName: 'Service-With-Hyphens' },
        { serviceName: 'service_with_underscores' },
        { serviceName: 'Service123' },
        { serviceName: 'MyService@example.com' },
      ];

      complexServices.forEach((service) => {
        const result = serviceSchema.parse(service);
        expect(result).toEqual(service);
      });
    });

    it('should handle special characters in service names', () => {
      const specialCharServices = [
        { serviceName: 'Service with spaces' },
        { serviceName: 'Service with !@#$%^&*()' },
        { serviceName: 'Service with unicode: こんにちは' },
        { serviceName: 'Service with quotes: "Hello"' },
        { serviceName: "Service with apostrophe: O'Reilly" },
      ];

      specialCharServices.forEach((service) => {
        const result = serviceSchema.parse(service);
        expect(result).toEqual(service);
      });
    });

    it('should handle unicode characters', () => {
      const unicodeServices = [
        { serviceName: '日本語サービス' },
        { serviceName: '中文服务' },
        { serviceName: '한국어 서비스' },
        { serviceName: 'Serviço em Português' },
        { serviceName: 'Servicio en Español' },
      ];

      unicodeServices.forEach((service) => {
        const result = serviceSchema.parse(service);
        expect(result).toEqual(service);
      });
    });

    it('should handle very long service names', () => {
      const longServiceName = 'A'.repeat(1000);
      const serviceWithLongName = { serviceName: longServiceName };
      const result = serviceSchema.parse(serviceWithLongName);
      expect(result).toEqual(serviceWithLongName);
    });

    it('should handle services with multiple additional properties', () => {
      const serviceWithManyProps = {
        serviceName: 'Complex Service',
        id: 'service-123',
        version: '2.1.0',
        description: 'A complex service with many properties',
        tags: ['api', 'oauth', 'openid'],
        metadata: {
          created: '2024-01-01',
          updated: '2024-12-01',
          owner: 'admin@example.com',
        },
        settings: {
          enabled: true,
          rateLimit: 1000,
          timeout: 30000,
        },
      };
      const result = serviceSchema.parse(serviceWithManyProps);
      expect(result).toEqual(serviceWithManyProps);
    });
  });

  describe('Service type', () => {
    it('should allow valid Service values', () => {
      const validServices: Service[] = [
        { serviceName: 'Test Service' },
        { serviceName: null },
        { serviceName: undefined },
        { serviceName: '' },
        {},
        { serviceName: 'Another Service', extraProp: 'value' },
      ];

      validServices.forEach((service) => {
        expect(serviceSchema.parse(service)).toEqual(service);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (service: Service): Service => {
        return service;
      };

      const testService: Service = { serviceName: 'test', extraProp: 'value' };
      expect(testFunction(testService)).toEqual(testService);
    });

    it('should allow partial Service objects', () => {
      const partialServices: Service[] = [
        {},
        { serviceName: 'only-name' },
        { serviceName: null },
        { serviceName: undefined },
        { extraProp: 'only-extra' },
        { serviceName: 'name', extraProp: 'extra' },
      ];

      partialServices.forEach((service) => {
        expect(serviceSchema.parse(service)).toEqual(service);
      });
    });

    it('should work with passthrough for additional properties', () => {
      const testFunction = (service: Service): string => {
        return service.serviceName || 'unnamed';
      };

      expect(testFunction({ serviceName: 'Test' })).toBe('Test');
      expect(testFunction({ serviceName: null })).toBe('unnamed');
      expect(testFunction({ serviceName: undefined })).toBe('unnamed');
      expect(testFunction({})).toBe('unnamed');
    });
  });
});
