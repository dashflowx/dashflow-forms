import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';
import { useDashflowForm, type DashflowFormMode } from './useDashflowForm';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
});

function HookDemo({ mode = 'onSubmit' as DashflowFormMode }) {
  const form = useDashflowForm(schema, {
    mode,
    defaultValues: { email: '' },
  });
  return (
    <form
      className="flex max-w-sm flex-col gap-2"
      onSubmit={form.handleSubmit(() => undefined)}
      noValidate
    >
      <label className="text-sm font-medium" htmlFor="email">
        Email (mode={mode})
      </label>
      <input
        id="email"
        className="rounded border border-slate-300 px-2 py-1.5 text-sm"
        {...form.register('email')}
      />
      {form.formState.errors.email ? (
        <p className="text-sm text-red-600" role="alert">
          {form.formState.errors.email.message}
        </p>
      ) : null}
      <button type="submit" className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">
        Submit
      </button>
    </form>
  );
}

const meta: Meta<typeof HookDemo> = {
  title: 'Forms/useDashflowForm',
  component: HookDemo,
};

export default meta;
type Story = StoryObj<typeof HookDemo>;

export const OnSubmit: Story = { args: { mode: 'onSubmit' } };
export const OnBlur: Story = { args: { mode: 'onBlur' } };
export const OnChange: Story = { args: { mode: 'onChange' } };
export const OnTouched: Story = { args: { mode: 'onTouched' } };
export const All: Story = { args: { mode: 'all' } };
