import {
  useForm,
  type CriteriaMode,
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
  type ValidationMode,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

export type DashflowFormMode = keyof ValidationMode;
export type DashflowFormReValidateMode = 'onBlur' | 'onChange' | 'onSubmit';
export type DashflowFormCriteriaMode = CriteriaMode;

export type UseDashflowFormOptions<TValues extends FieldValues = FieldValues> = {
  /** Seed values before first render. */
  defaultValues?: DefaultValues<TValues>;
  /** When to run validation. */
  mode?: DashflowFormMode;
  /** When to re-validate after the first validation. */
  reValidateMode?: DashflowFormReValidateMode;
  /** Collect first error only, or every field error. */
  criteriaMode?: DashflowFormCriteriaMode;
  /** Unregister inputs on unmount. */
  shouldUnregister?: boolean;
  /** Delay (ms) before showing errors. */
  delayError?: number;
};

function isOptions<TValues extends FieldValues>(
  value: DefaultValues<TValues> | UseDashflowFormOptions<TValues> | undefined,
): value is UseDashflowFormOptions<TValues> {
  if (!value || typeof value !== 'object') return false;
  return (
    'defaultValues' in value ||
    'mode' in value ||
    'reValidateMode' in value ||
    'criteriaMode' in value ||
    'shouldUnregister' in value ||
    'delayError' in value
  );
}

/**
 * Zod + react-hook-form helper (M02).
 * Second arg is either legacy `defaultValues` or a typed options object.
 */
export function useDashflowForm<TSchema extends z.ZodType<FieldValues>>(
  schema: TSchema,
  defaultValuesOrOptions?:
    | DefaultValues<z.infer<TSchema>>
    | UseDashflowFormOptions<z.infer<TSchema>>,
): UseFormReturn<z.infer<TSchema>> {
  const options: UseDashflowFormOptions<z.infer<TSchema>> = isOptions(defaultValuesOrOptions)
    ? defaultValuesOrOptions
    : { defaultValues: defaultValuesOrOptions };

  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: options.defaultValues,
    mode: options.mode ?? 'onSubmit',
    reValidateMode: options.reValidateMode ?? 'onChange',
    criteriaMode: options.criteriaMode ?? 'firstError',
    shouldUnregister: options.shouldUnregister ?? false,
    delayError: options.delayError,
  });
}
