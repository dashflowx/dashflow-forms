import type { Meta, StoryObj } from '@storybook/react';
import { DashflowFormRenderer } from './DashflowFormRenderer';
import { contactFormFixture } from './schema';

const meta: Meta<typeof DashflowFormRenderer> = {
  title: 'Forms/Renderer',
  component: DashflowFormRenderer,
  args: {
    schema: contactFormFixture,
    onSubmit: (values) => {
      console.log(values);
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashflowFormRenderer>;

export const Contact: Story = {};

export const Bordered: Story = {
  args: { variant: 'bordered' },
};

export const Muted: Story = {
  args: { variant: 'muted' },
};

export const Soft: Story = {
  args: { variant: 'soft' },
};

export const Flush: Story = {
  args: { variant: 'flush' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Stretch: Story = {
  args: { align: 'stretch' },
};

export const NoTitle: Story = {
  args: { showTitle: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDefaults: Story = {
  args: {
    defaultValues: {
      name: 'Ada',
      email: 'ada@example.com',
      role: 'dev',
      level: 'jr',
      subscribe: true,
    },
  },
};

export const Blank: Story = {
  args: {
    schema: { id: 'blank', title: 'Blank', fields: [] },
  },
};
