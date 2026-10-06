import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('@dashflowx/core', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) =>
    createElement('button', props, children),
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => createElement('input', props),
  Label: ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) =>
    createElement('label', props, children),
  TextArea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) =>
    createElement('textarea', props),
}));

vi.mock('react-hook-form', () => ({
  Controller: ({
    render,
  }: {
    render: (args: {
      field: { value: string; onChange: () => void; onBlur: () => void };
      fieldState: { error?: { message?: string } };
    }) => React.ReactNode;
  }) =>
    render({
      field: { value: '', onChange: () => undefined, onBlur: () => undefined },
      fieldState: {},
    }),
}));

import { DashflowField } from './fields';

const control = {} as never;

describe('DashflowField', () => {
  it('applies variant and size to a text control', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowField, {
        control,
        field: { name: 'email', type: 'email', label: 'Email' },
        variant: 'bordered',
        size: 'sm',
      }),
    );
    expect(html).toContain('data-variant="bordered"');
    expect(html).toContain('data-size="sm"');
    expect(html).toContain('data-type="email"');
    expect(html).toContain('border-2');
    expect(html).toContain('text-xs');
    expect(html).toContain('Email');
  });

  it('hides the label when showLabel is false', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowField, {
        control,
        field: { name: 'email', type: 'email', label: 'Email' },
        showLabel: false,
      }),
    );
    expect(html).not.toContain('>Email<');
  });

  it('renders a submit button with size', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowField, {
        control,
        field: { name: 'send', type: 'submit', label: 'Send' },
        size: 'lg',
      }),
    );
    expect(html).toContain('data-type="submit"');
    expect(html).toContain('Send');
    expect(html).toContain('data-size="lg"');
  });
});
