import type { Meta, StoryObj } from '@storybook/react';
import { DashflowFormRenderer } from './DashflowFormRenderer';
import { contactFormFixture } from './schema';

const meta: Meta<typeof DashflowFormRenderer> = {
  title: 'Forms/Renderer',
  component: DashflowFormRenderer,
};

export default meta;
type Story = StoryObj<typeof DashflowFormRenderer>;

export const Contact: Story = {
  args: {
    schema: contactFormFixture,
    onSubmit: (values) => {
      console.log(values);
    },
  },
};

export const Blank: Story = {
  args: {
    schema: { id: 'blank', title: 'Blank', fields: [] },
  },
};
