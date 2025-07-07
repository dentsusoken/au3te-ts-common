import { describe, expect, it } from 'vitest';
import { mockGetByCredentials } from '../mockGetByCredentials';

describe('mockGetByCredentials', () => {
  it('should return a user when valid credentials are provided', async () => {
    const user = await mockGetByCredentials('inga', 'inga');
    expect(user).toBeDefined();
    expect(user?.loginId).toBe('inga');
    expect(user?.name).toBe('Inga Silverstone');
  });

  it('should return undefined when invalid loginId is provided', async () => {
    const user = await mockGetByCredentials('nonexistent', 'inga');
    expect(user).toBeUndefined();
  });

  it('should return undefined when invalid password is provided', async () => {
    const user = await mockGetByCredentials('inga', 'wrongpassword');
    expect(user).toBeUndefined();
  });

  it('should return user with all required OpenID Connect claims', async () => {
    const user = await mockGetByCredentials('inga', 'inga');
    expect(user).toBeDefined();
    expect(user?.subject).toBe('1004');
    expect(user?.loginId).toBe('inga');
    expect(user?.email).toBe('inga@example.com');
    expect(user?.givenName).toBe('Inga');
    expect(user?.familyName).toBe('Silverstone');
    expect(user?.address?.country).toBe('USA');
  });

  it('should handle empty credentials', async () => {
    const user = await mockGetByCredentials('', '');
    expect(user).toBeUndefined();
  });
});
