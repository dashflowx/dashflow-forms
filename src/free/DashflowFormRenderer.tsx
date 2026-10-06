import type { DefaultValues, FieldValues } from 'react-hook-form';
import { schemaToZod } from './toZod';
import { useDashflowForm } from './useDashflowForm';
import { DashflowField } from './fields';
import type { DashflowFormSchema } from './schema';

export type DashflowFormVariant = 'default' | 'bordered' | 'muted' | 'soft' | 'flush';
export type DashflowFormSize = 'sm' | 'md' | 'lg';
export type DashflowFormAlign = 'left' | 'stretch';

export type DashflowFormRendererProps = {
  schema: DashflowFormSchema;
  onSubmit?: (values: FieldValues) => void;
  /** Seed react-hook-form defaults before first render. */
  defaultValues?: DefaultValues<FieldValues>;
  /** Surface treatment for the form shell. */
  variant?: DashflowFormVariant;
  /** Gap, title scale, and max width. */
  size?: DashflowFormSize;
  /** Left-aligned fixed width, or stretch to parent. */
  align?: DashflowFormAlign;
  /** Render `schema.title` when present. */
  showTitle?: boolean;
  /** Disable all controls via a wrapping fieldset. */
  disabled?: boolean;
  className?: string;
};

const VARIANT_SHELL: Record<DashflowFormVariant, string> = {
  default: 'border border-slate-200 bg-white',
  bordered: 'border-2 border-slate-300 bg-white shadow-sm',
  muted: 'border border-slate-200 bg-slate-50',
  soft: 'border border-transparent bg-slate-100',
  flush: 'border border-transparent bg-transparent',
};

const SIZE_SHELL: Record<DashflowFormSize, string> = {
  sm: 'max-w-sm gap-3 p-4',
  md: 'max-w-md gap-4 p-5',
  lg: 'max-w-lg gap-5 p-6',
};

const SIZE_TITLE: Record<DashflowFormSize, string> = {
  sm: 'text-base font-semibold',
  md: 'text-lg font-semibold',
  lg: 'text-xl font-semibold',
};

const ALIGN_SHELL: Record<DashflowFormAlign, string> = {
  left: '',
  stretch: 'w-full max-w-none',
};

/**
 * JSON schema → Zod + RHF form. Free fields only (M03).
 * Prefer typed props over hard-coded Tailwind shells.
 */
export function DashflowFormRenderer({
  schema,
  onSubmit,
  defaultValues,
  variant = 'default',
  size = 'md',
  align = 'left',
  showTitle = true,
  disabled = false,
  className = '',
}: DashflowFormRendererProps) {
  const zodSchema = schemaToZod(schema);
  const form = useDashflowForm(zodSchema, defaultValues);

  return (
    <form
      className={`flex flex-col rounded-lg ${SIZE_SHELL[size]} ${VARIANT_SHELL[variant]} ${ALIGN_SHELL[align]} ${className}`.trim()}
      onSubmit={form.handleSubmit((values) => onSubmit?.(values))}
      noValidate
      data-testid="dashflow-form-renderer"
      data-variant={variant}
      data-size={size}
      data-align={align}
    >
      <fieldset disabled={disabled} className="contents">
        {showTitle && schema.title ? (
          <h2 className={SIZE_TITLE[size]}>{schema.title}</h2>
        ) : null}
        {schema.fields.map((field) => (
          <DashflowField key={field.name} field={field} control={form.control} />
        ))}
      </fieldset>
    </form>
  );
}
