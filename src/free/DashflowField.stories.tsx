import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { DashflowField } from './fields';
import type { FormFieldSchema } from './schema';

const emailField: FormFieldSchema = {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'name@company.com',
  required: true,
};

function FieldHost(
  props: Omit<ComponentProps<typeof DashflowField>, 'control'> & {
    field: FormFieldSchema;
    defaultValue?: string | boolean;
  },
) {
  const { field, defaultValue = '', ...rest } = props;
  const form = useForm({
    defaultValues: { [field.name]: defaultValue },
  });
  return (
    <form className="max-w-sm" onSubmit={(e) => e.preventDefault()}>
      <DashflowField {...rest} field={field} control={form.control} />
    </form>
  );
}

const meta: Meta<typeof FieldHost> = {
  title: 'Forms/Field',
  component: FieldHost,
  args: {
    field: emailField,
  },
};

export default meta;
type Story = StoryObj<typeof FieldHost>;

export const Email: Story = {};

export const Bordered: Story = { args: { variant: 'bordered' } };
export const Muted: Story = { args: { variant: 'muted' } };
export const Soft: Story = { args: { variant: 'soft' } };
export const Flush: Story = { args: { variant: 'flush' } };

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const NoLabel: Story = { args: { showLabel: false } };
export const Disabled: Story = { args: { disabled: true } };

export const Textarea: Story = {
  args: {
    field: { name: 'bio', type: 'textarea', label: 'Bio', placeholder: 'About you' },
  },
};

export const Select: Story = {
  args: {
    field: {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { value: 'dev', label: 'Developer' },
        { value: 'design', label: 'Designer' },
      ],
    },
  },
};

export const Checkbox: Story = {
  args: {
    field: { name: 'subscribe', type: 'checkbox', label: 'Subscribe' },
    defaultValue: false,
  },
};

export const Radio: Story = {
  args: {
    field: {
      name: 'level',
      type: 'radio',
      label: 'Level',
      options: [
        { value: 'jr', label: 'Junior' },
        { value: 'sr', label: 'Senior' },
      ],
    },
  },
};

export const Submit: Story = {
  args: {
    field: { name: 'send', type: 'submit', label: 'Send' },
  },
};
