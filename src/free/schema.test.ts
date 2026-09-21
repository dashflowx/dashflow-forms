import { describe, expect, it } from 'vitest';
import { schemaToZod } from './toZod';
import { contactFormFixture } from './schema';

describe('schemaToZod', () => {
  const schema = schemaToZod(contactFormFixture);

  it('rejects invalid email (fail closed)', () => {
    const result = schema.safeParse({
      name: 'Ada',
      email: 'not-an-email',
      role: 'dev',
      level: 'jr',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeTruthy();
    }
  });

  it('rejects missing required name', () => {
    const result = schema.safeParse({
      name: '',
      email: 'ada@example.com',
      role: 'dev',
      level: 'jr',
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid values and returns a values object', () => {
    const result = schema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      age: 36,
      role: 'dev',
      level: 'jr',
      bio: 'Hi',
      subscribe: false,
      alerts: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('ada@example.com');
      expect(result.data.role).toBe('dev');
    }
  });
});
