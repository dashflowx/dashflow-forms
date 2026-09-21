export const FREE_FIELD_TYPES = [
  'text',
  'number',
  'email',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'switch',
  'submit',
] as const;

export type FreeFieldType = (typeof FREE_FIELD_TYPES)[number];

export type FormFieldOption = { value: string; label: string };

export type FormFieldSchema = {
  name: string;
  type: FreeFieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
};

export type DashflowFormSchema = {
  id: string;
  title?: string;
  fields: FormFieldSchema[];
};

export { fieldToZod, schemaToZod } from './toZod';

export const contactFormFixture: DashflowFormSchema = {
  id: 'forms.contact',
  title: 'Contact',
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'age', type: 'number', label: 'Age' },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      required: true,
      options: [
        { value: 'dev', label: 'Developer' },
        { value: 'design', label: 'Designer' },
      ],
    },
    {
      name: 'level',
      type: 'radio',
      label: 'Level',
      required: true,
      options: [
        { value: 'jr', label: 'Junior' },
        { value: 'sr', label: 'Senior' },
      ],
    },
    { name: 'bio', type: 'textarea', label: 'Bio' },
    { name: 'subscribe', type: 'checkbox', label: 'Subscribe' },
    { name: 'alerts', type: 'switch', label: 'Email alerts' },
    { name: 'send', type: 'submit', label: 'Send' },
  ],
};
