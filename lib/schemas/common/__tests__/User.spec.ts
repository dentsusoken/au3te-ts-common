import { describe, it, expect } from 'vitest';
import { userSchema, type User } from '../User';

describe('userSchema', () => {
  describe('success cases', () => {
    it('should parse a minimal valid user with only required subject', () => {
      const input = {
        subject: 'user123',
      };

      const result = userSchema.parse(input);

      expect(result).toEqual({
        subject: 'user123',
        loginId: undefined,
        password: undefined,
        name: undefined,
        email: undefined,
        address: undefined,
        phoneNumber: undefined,
        code: undefined,
        phoneNumberVerified: undefined,
        emailVerified: undefined,
        givenName: undefined,
        familyName: undefined,
        middleName: undefined,
        nickname: undefined,
        profile: undefined,
        picture: undefined,
        website: undefined,
        gender: undefined,
        zoneinfo: undefined,
        locale: undefined,
        preferredUsername: undefined,
        birthdate: undefined,
        updatedAt: undefined,
      });
    });

    it('should parse a complete user with all fields', () => {
      const input = {
        subject: 'user123',
        loginId: 'john.doe',
        password: 'hashedPassword123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
          formatted: '123 Main St, Anytown, CA 12345, USA',
          streetAddress: '123 Main St',
          locality: 'Anytown',
          region: 'CA',
          postalCode: '12345',
          country: 'USA',
        },
        phoneNumber: '+1-555-123-4567',
        code: 'VERIFICATION123',
        phoneNumberVerified: true,
        emailVerified: true,
        givenName: 'John',
        familyName: 'Doe',
        middleName: 'Michael',
        nickname: 'Johnny',
        profile: 'https://example.com/profile/john',
        picture: 'https://example.com/avatar/john.jpg',
        website: 'https://johndoe.com',
        gender: 'male',
        zoneinfo: 'America/Los_Angeles',
        locale: 'en-US',
        preferredUsername: 'johndoe',
        birthdate: '1990-01-15',
        updatedAt: '2024-01-15T10:30:00Z',
      };

      const result = userSchema.parse(input);

      expect(result).toEqual(input);
    });

    it('should parse a user with null values for optional fields', () => {
      const input = {
        subject: 'user123',
        loginId: null,
        password: null,
        name: null,
        email: null,
        address: null,
        phoneNumber: null,
        code: null,
        phoneNumberVerified: null,
        emailVerified: null,
        givenName: null,
        familyName: null,
        middleName: null,
        nickname: null,
        profile: null,
        picture: null,
        website: null,
        gender: null,
        zoneinfo: null,
        locale: null,
        preferredUsername: null,
        birthdate: null,
        updatedAt: null,
      };

      const result = userSchema.parse(input);

      expect(result).toEqual(input);
    });

    it('should parse a user with mixed string and boolean values', () => {
      const input = {
        subject: 'user456',
        loginId: 'jane.smith',
        email: 'jane@example.com',
        phoneNumberVerified: false,
        emailVerified: true,
        givenName: 'Jane',
        familyName: 'Smith',
        gender: 'female',
        locale: 'en-GB',
      };

      const result = userSchema.parse(input);

      expect(result).toEqual(input);
      expect(result.phoneNumberVerified).toBe(false);
      expect(result.emailVerified).toBe(true);
    });

    it('should parse a user with empty string values', () => {
      const input = {
        subject: 'user789',
        name: '',
        email: '',
        phoneNumber: '',
        givenName: '',
        familyName: '',
        nickname: '',
        profile: '',
        picture: '',
        website: '',
        gender: '',
        zoneinfo: '',
        locale: '',
        preferredUsername: '',
        birthdate: '',
        updatedAt: '',
      };

      const result = userSchema.parse(input);

      expect(result).toEqual(input);
    });

    it('should parse a user with complex address object', () => {
      const input = {
        subject: 'user999',
        address: {
          formatted:
            '456 Oak Avenue, Suite 100, Springfield, IL 62701, United States',
          streetAddress: '456 Oak Avenue, Suite 100',
          locality: 'Springfield',
          region: 'IL',
          postalCode: '62701',
          country: 'United States',
        },
      };

      const result = userSchema.parse(input);

      expect(result.subject).toBe('user999');
      expect(result.address).toEqual(input.address);
    });

    it('should parse a user with partial address object', () => {
      const input = {
        subject: 'user888',
        address: {
          streetAddress: '789 Pine Street',
          locality: 'Portland',
          country: 'USA',
        },
      };

      const result = userSchema.parse(input);

      expect(result.subject).toBe('user888');
      expect(result.address).toEqual(input.address);
    });
  });

  describe('failure cases', () => {
    it('should fail when subject is missing', () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when subject is null', () => {
      const input = {
        subject: null,
        name: 'John Doe',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when subject is undefined', () => {
      const input = {
        subject: undefined,
        name: 'John Doe',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when subject is not a string', () => {
      const input = {
        subject: 123,
        name: 'John Doe',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['subject']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when phoneNumberVerified is not a boolean', () => {
      const input = {
        subject: 'user123',
        phoneNumberVerified: 'true',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['phoneNumberVerified']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when emailVerified is not a boolean', () => {
      const input = {
        subject: 'user123',
        emailVerified: 1,
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['emailVerified']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when address is not an object', () => {
      const input = {
        subject: 'user123',
        address: 'invalid address',
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['address']);
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });

    it('should fail when address fields are not strings', () => {
      const input = {
        subject: 'user123',
        address: {
          streetAddress: 123,
          locality: true,
        },
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
        expect(result.error.issues[0].path).toEqual([
          'address',
          'streetAddress',
        ]);
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[1].path).toEqual(['address', 'locality']);
        expect(result.error.issues[1].code).toBe('invalid_type');
      }
    });

    it('should fail when string fields are not strings', () => {
      const input = {
        subject: 'user123',
        name: 123,
        email: true,
        phoneNumber: {},
        givenName: [],
      };

      const result = userSchema.safeParse(input);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(4);
        expect(result.error.issues[0].path).toEqual(['name']);
        expect(result.error.issues[0].code).toBe('invalid_type');
        expect(result.error.issues[1].path).toEqual(['email']);
        expect(result.error.issues[1].code).toBe('invalid_type');
        expect(result.error.issues[2].path).toEqual(['phoneNumber']);
        expect(result.error.issues[2].code).toBe('invalid_type');
        expect(result.error.issues[3].path).toEqual(['givenName']);
        expect(result.error.issues[3].code).toBe('invalid_type');
      }
    });
  });

  describe('type inference', () => {
    it('should correctly infer User type', () => {
      const user: User = {
        subject: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumberVerified: true,
        emailVerified: false,
        address: {
          streetAddress: '123 Main St',
          locality: 'Anytown',
          country: 'USA',
        },
      };

      const result = userSchema.parse(user);

      expect(result).toEqual(user);
      expect(typeof result.subject).toBe('string');
      expect(typeof result.phoneNumberVerified).toBe('boolean');
      expect(typeof result.emailVerified).toBe('boolean');
      expect(result.address).toBeDefined();
    });

    it('should handle undefined optional fields in type inference', () => {
      const user: User = {
        subject: 'user123',
      };

      const result = userSchema.parse(user);

      expect(result.subject).toBe('user123');
      expect(result.name).toBeUndefined();
      expect(result.email).toBeUndefined();
      expect(result.phoneNumberVerified).toBeUndefined();
      expect(result.emailVerified).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long string values', () => {
      const longString = 'a'.repeat(1000);
      const input = {
        subject: 'user123',
        name: longString,
        email: longString,
        givenName: longString,
        familyName: longString,
      };

      const result = userSchema.parse(input);

      expect(result.name).toBe(longString);
      expect(result.email).toBe(longString);
      expect(result.givenName).toBe(longString);
      expect(result.familyName).toBe(longString);
    });

    it('should handle special characters in strings', () => {
      const input = {
        subject: 'user123',
        name: "José María O'Connor-Smith",
        email: 'test+tag@example.com',
        phoneNumber: '+1 (555) 123-4567 ext. 123',
        givenName: 'José',
        familyName: "O'Connor-Smith",
        nickname: 'José!@#$%^&*()',
        profile: 'https://example.com/profile/josé',
        picture: 'https://example.com/avatar/josé.jpg',
        website: 'https://josé.example.com',
        gender: 'non-binary',
        zoneinfo: 'America/New_York',
        locale: 'es-MX',
        preferredUsername: 'josé_123',
        birthdate: '1990-12-31',
        updatedAt: '2024-12-31T23:59:59.999Z',
      };

      const result = userSchema.parse(input);

      expect(result).toEqual(input);
    });

    it('should handle empty object for address', () => {
      const input = {
        subject: 'user123',
        address: {},
      };

      const result = userSchema.parse(input);

      expect(result.subject).toBe('user123');
      expect(result.address).toEqual({});
    });

    it('should handle whitespace-only strings', () => {
      const input = {
        subject: 'user123',
        name: '   ',
        email: '\t\n',
        givenName: ' ',
        familyName: '\r\n',
      };

      const result = userSchema.parse(input);

      expect(result.name).toBe('   ');
      expect(result.email).toBe('\t\n');
      expect(result.givenName).toBe(' ');
      expect(result.familyName).toBe('\r\n');
    });
  });
});
