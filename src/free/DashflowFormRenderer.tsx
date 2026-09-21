import type { FieldValues } from 'react-hook-form';
import { schemaToZod } from './toZod';
import { useDashflowForm } from './useDashflowForm';
import { DashflowField } from './fields';
import type { DashflowFormSchema } from './schema';

type RendererProps = {
  schema: DashflowFormSchema;
  onSubmit?: (values: FieldValues) => void;
};

export function DashflowFormRenderer({ schema, onSubmit }: RendererProps) {
  const zodSchema = schemaToZod(schema);
  const form = useDashflowForm(zodSchema);
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={form.handleSubmit((values) => onSubmit?.(values))}
      noValidate
    >
      {schema.title ? <h2 className="text-lg font-semibold">{schema.title}</h2> : null}
      {schema.fields.map((field) => (
        <DashflowField key={field.name} field={field} control={form.control} />
      ))}
    </form>
  );
}
