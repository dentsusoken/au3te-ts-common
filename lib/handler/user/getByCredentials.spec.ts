import { describe, it, expect } from 'vitest';
import { simpleGetByCredentials } from './getByCredentials';

describe('simpleGetByCredentials', () => {
  it('should return a valid user with correct credentials', async () => {
    const user = await simpleGetByCredentials('inga', 'inga');

    expect(user).toBeDefined();
    expect(user?.loginId).toBe('inga');
    expect(user?.name).toBe('Inga Silverstone');
    expect(user?.email).toBe('inga@example.com');
  });

  it('should return undefined with invalid login ID', async () => {
    const user = await simpleGetByCredentials('invalid_user', 'inga');

    expect(user).toBeUndefined();
  });

  it('should return undefined with invalid password', async () => {
    const user = await simpleGetByCredentials('inga', 'wrong_password');

    expect(user).toBeUndefined();
  });

  it('should return complete user profile information', async () => {
    const user = await simpleGetByCredentials('inga', 'inga');

    expect(user).toMatchObject({
      subject: '1004',
      loginId: 'inga',
      name: 'Inga Silverstone',
      email: 'inga@example.com',
      address: {
        formatted: '114 Old State Hwy 127, Shoshone, CA 92384, USA',
        country: 'USA',
        locality: 'Shoshone',
        streetAddress: '114 Old State Hwy 127',
        postalCode: 'CA 92384',
      },
      givenName: 'Inga',
      familyName: 'Silverstone',
      gender: 'female',
      birthdate: '1991-11-06',
    });
  });
});
