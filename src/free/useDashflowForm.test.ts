import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

const useFormMock = vi.fn((opts: Record<string, unknown>) => ({
  ...opts,
  getValues: () => opts.defaultValues,
  formState: { isDirty: false },
}));

vi.mock('react-hook-form', () => ({
  useForm: (opts: Record<string, unknown>) => useFormMock(opts),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => 'zod-resolver',
}));

import { useDashflowForm } from './useDashflowForm';

const schema = z.object({
  email: z.string().email(),
});

describe('useDashflowForm', () => {
  it('accepts legacy defaultValues as the second argument', () => {
    useFormMock.mockClear();
    useDashflowForm(schema, { email: 'ada@example.com' });
    expect(useFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValues: { email: 'ada@example.com' },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
        shouldUnregister: false,
      }),
    );
  });

  it('accepts a typed options object with mode and criteria', () => {
    useFormMock.mockClear();
    useDashflowForm(schema, {
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      criteriaMode: 'all',
      shouldUnregister: true,
      delayError: 400,
      defaultValues: { email: '' },
    });
    expect(useFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
        shouldUnregister: true,
        delayError: 400,
        defaultValues: { email: '' },
        resolver: 'zod-resolver',
      }),
    );
  });
});
