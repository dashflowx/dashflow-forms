import { z } from 'zod';
import type { DashflowFormSchema, FormFieldSchema } from './schema';

export function fieldToZod(field: FormFieldSchema): z.ZodTypeAny {
  const requiredMsg = `${field.label} is required`;
  switch (field.type) {
    case 'submit':
      return z.any().optional();
    case 'email': {
      const email = z.string().email('Enter a valid email');
      return field.required ? z.string().min(1, requiredMsg).email('Enter a valid email') : z.union([z.literal(''), email]);
    }
    case 'number':
      return field.required
        ? z.coerce.number({ invalid_type_error: requiredMsg })
        : z.coerce.number().optional();
    case 'checkbox':
    case 'switch':
      return field.required
        ? z.literal(true, { errorMap: () => ({ message: requiredMsg }) })
        : z.boolean().optional().default(false);
    case 'text':
    case 'textarea':
    case 'select':
    case 'radio':
      return field.required ? z.string().min(1, requiredMsg) : z.string().optional().default('');
    default:
      return z.string().optional();
  }
}

export function schemaToZod(doc: DashflowFormSchema): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of doc.fields) {
    if (field.type === 'submit') continue;
    shape[field.name] = fieldToZod(field);
  }
  return z.object(shape);
}
