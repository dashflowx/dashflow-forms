import type { ChangeEvent } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Button, Input, Label, TextArea } from '@dashflowx/core';
import type { FormFieldSchema } from './schema';

export type DashflowFieldVariant = 'default' | 'bordered' | 'muted' | 'soft' | 'flush';
export type DashflowFieldSize = 'sm' | 'md' | 'lg';

export type DashflowFieldProps<T extends FieldValues = FieldValues> = {
  field: FormFieldSchema;
  control: Control<T>;
  /** Control / shell surface treatment. */
  variant?: DashflowFieldVariant;
  /** Control padding and type density. */
  size?: DashflowFieldSize;
  /** Render the field label (ignored for checkbox/switch label-inline and submit). */
  showLabel?: boolean;
  /** Render validation error text when present. */
  showError?: boolean;
  /** Disable the control. */
  disabled?: boolean;
  className?: string;
};

const VARIANT_CONTROL: Record<DashflowFieldVariant, string> = {
  default: 'border border-slate-300 bg-transparent',
  bordered: 'border-2 border-slate-400 bg-white shadow-sm',
  muted: 'border border-slate-200 bg-slate-50',
  soft: 'border border-transparent bg-slate-100',
  flush: 'border border-transparent bg-transparent',
};

const SIZE_CONTROL: Record<DashflowFieldSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2 py-2 text-sm',
  lg: 'px-3 py-2.5 text-base',
};

const SIZE_WRAP: Record<DashflowFieldSize, string> = {
  sm: 'space-y-0.5 text-xs',
  md: 'space-y-1 text-sm',
  lg: 'space-y-1.5 text-base',
};

const SIZE_BUTTON: Record<DashflowFieldSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}

function controlClass(variant: DashflowFieldVariant, size: DashflowFieldSize, extra = '') {
  return `w-full rounded ${VARIANT_CONTROL[variant]} ${SIZE_CONTROL[size]} ${extra}`.trim();
}

/**
 * Free RHF field bound to a `FormFieldSchema` entry (M02).
 * Prefer typed variant / size props over hard-coded control classes.
 */
export function DashflowField<T extends FieldValues>({
  field,
  control,
  variant = 'default',
  size = 'md',
  showLabel = true,
  showError = true,
  disabled = false,
  className = '',
}: DashflowFieldProps<T>) {
  const name = field.name as Path<T>;
  const wrap = `${SIZE_WRAP[size]} ${className}`.trim();

  if (field.type === 'submit') {
    return (
      <div
        className={wrap}
        data-testid="dashflow-field"
        data-type="submit"
        data-variant={variant}
        data-size={size}
      >
        <Button type="submit" variant="primary" size={SIZE_BUTTON[size]} disabled={disabled}>
          {field.label}
        </Button>
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhf, fieldState }) => {
        const err = showError ? fieldState.error?.message : undefined;
        if (field.type === 'textarea') {
          return (
            <div
              className={wrap}
              data-testid="dashflow-field"
              data-type="textarea"
              data-variant={variant}
              data-size={size}
            >
              {showLabel ? <Label htmlFor={field.name}>{field.label}</Label> : null}
              <TextArea
                id={field.name}
                placeholder={field.placeholder}
                value={(rhf.value as string) ?? ''}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
                disabled={disabled}
                className={controlClass(variant, size)}
              />
              <ErrorText message={err} />
            </div>
          );
        }
        if (field.type === 'select') {
          return (
            <div
              className={wrap}
              data-testid="dashflow-field"
              data-type="select"
              data-variant={variant}
              data-size={size}
            >
              {showLabel ? <Label htmlFor={field.name}>{field.label}</Label> : null}
              <select
                id={field.name}
                className={controlClass(variant, size)}
                value={(rhf.value as string) ?? ''}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
                disabled={disabled}
              >
                <option value="">Select…</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ErrorText message={err} />
            </div>
          );
        }
        if (field.type === 'checkbox' || field.type === 'switch') {
          return (
            <div
              className={wrap}
              data-testid="dashflow-field"
              data-type={field.type}
              data-variant={variant}
              data-size={size}
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={field.name}
                  className={`h-4 w-4 rounded ${VARIANT_CONTROL[variant]} disabled:opacity-50`}
                  checked={Boolean(rhf.value)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => rhf.onChange(e.target.checked)}
                  onBlur={rhf.onBlur}
                  disabled={disabled}
                />
                {showLabel ? <span>{field.label}</span> : null}
              </label>
              <ErrorText message={err} />
            </div>
          );
        }
        if (field.type === 'radio') {
          return (
            <fieldset
              className={wrap}
              data-testid="dashflow-field"
              data-type="radio"
              data-variant={variant}
              data-size={size}
              disabled={disabled}
            >
              {showLabel ? <legend className="font-medium">{field.label}</legend> : null}
              {(field.options ?? []).map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt.value}
                    checked={rhf.value === opt.value}
                    onChange={() => rhf.onChange(opt.value)}
                    onBlur={rhf.onBlur}
                    disabled={disabled}
                  />
                  {opt.label}
                </label>
              ))}
              <ErrorText message={err} />
            </fieldset>
          );
        }
        return (
          <div
            className={wrap}
            data-testid="dashflow-field"
            data-type={field.type}
            data-variant={variant}
            data-size={size}
          >
            {showLabel ? <Label htmlFor={field.name}>{field.label}</Label> : null}
            <Input
              id={field.name}
              type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
              placeholder={field.placeholder}
              value={rhf.value === undefined || rhf.value === null ? '' : String(rhf.value)}
              onChange={rhf.onChange}
              onBlur={rhf.onBlur}
              disabled={disabled}
              className={controlClass(variant, size)}
            />
            <ErrorText message={err} />
          </div>
        );
      }}
    />
  );
}
