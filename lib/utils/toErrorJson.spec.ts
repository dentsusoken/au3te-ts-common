import { describe, it, expect } from 'vitest';
import { toErrorJson } from './toErrorJson';

describe('toErrorJson', () => {
  // Test when errorMessage is a JSON object string
  it('should return the original message when it is a valid JSON object', () => {
    const jsonMessage = JSON.stringify({ key: 'value' });
    const result = toErrorJson('error_code', jsonMessage);
    expect(result).toBe(jsonMessage);
  });

  // Test when errorMessage is a normal string
  it('should create error JSON when message is a normal string', () => {
    const result = toErrorJson('invalid_request', 'Error occurred');
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: 'Error occurred',
    });
    expect(result).toBe(expected);
  });

  // Test when errorMessage is an invalid JSON string
  it('should create error JSON when message is an invalid JSON string', () => {
    const result = toErrorJson('invalid_request', '{invalid json}');
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: '{invalid json}',
    });
    expect(result).toBe(expected);
  });

  // Test when errorMessage is a JSON array string
  it('should create error JSON when message is a JSON array string', () => {
    const arrayMessage = JSON.stringify(['item1', 'item2']);
    const result = toErrorJson('invalid_request', arrayMessage);
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: arrayMessage,
    });
    expect(result).toBe(expected);
  });

  // Test when errorMessage is a JSON null
  it('should create error JSON when message is "null"', () => {
    const result = toErrorJson('invalid_request', 'null');
    const expected = JSON.stringify({
      error: 'invalid_request',
      error_description: 'null',
    });
    expect(result).toBe(expected);
  });
});
