import type { ChangeEvent } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Button, Input, Label, TextArea } from '@dashflowx/core';
import type { FormFieldSchema } from './schema';

type FieldProps<T extends FieldValues> = {
  field: FormFieldSchema;
  control: Control<T>;
};

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}

export function DashflowField<T extends FieldValues>({ field, control }: FieldProps<T>) {
  const name = field.name as Path<T>;
  if (field.type === 'submit') {
    return (
      <Button type="submit" variant="primary">
        {field.label}
      </Button>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: rhf, fieldState }) => {
        const err = fieldState.error?.message;
        if (field.type === 'textarea') {
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{field.label}</Label>
              <TextArea
                id={field.name}
                placeholder={field.placeholder}
                value={(rhf.value as string) ?? ''}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
              />
              <ErrorText message={err} />
            </div>
          );
        }
        if (field.type === 'select') {
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{field.label}</Label>
              <select
                id={field.name}
                className="w-full rounded border border-gray-300 bg-transparent px-2 py-2 text-sm"
                value={(rhf.value as string) ?? ''}
                onChange={rhf.onChange}
                onBlur={rhf.onBlur}
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
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id={field.name}
                  checked={Boolean(rhf.value)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => rhf.onChange(e.target.checked)}
                  onBlur={rhf.onBlur}
                />
                {field.label}
              </label>
              <ErrorText message={err} />
            </div>
          );
        }
        if (field.type === 'radio') {
          return (
            <fieldset className="space-y-1">
              <legend className="text-sm font-medium">{field.label}</legend>
              {(field.options ?? []).map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt.value}
                    checked={rhf.value === opt.value}
                    onChange={() => rhf.onChange(opt.value)}
                    onBlur={rhf.onBlur}
                  />
                  {opt.label}
                </label>
              ))}
              <ErrorText message={err} />
            </fieldset>
          );
        }
        return (
          <div className="space-y-1">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
              placeholder={field.placeholder}
              value={rhf.value === undefined || rhf.value === null ? '' : String(rhf.value)}
              onChange={rhf.onChange}
              onBlur={rhf.onBlur}
            />
            <ErrorText message={err} />
          </div>
        );
      }}
    />
  );
}
