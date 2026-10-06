import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { contactFormFixture } from './schema';

vi.mock('./useDashflowForm', () => ({
  useDashflowForm: () => ({
    control: {},
    handleSubmit: (fn: (values: unknown) => void) => (event?: { preventDefault?: () => void }) => {
      event?.preventDefault?.();
      fn({});
    },
  }),
}));

vi.mock('./fields', () => ({
  DashflowField: ({ field }: { field: { name: string; label: string } }) =>
    createElement('div', { 'data-field': field.name }, field.label),
}));

import { DashflowFormRenderer } from './DashflowFormRenderer';

describe('DashflowFormRenderer', () => {
  it('applies variant, size, and align to the form shell', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowFormRenderer, {
        schema: contactFormFixture,
        variant: 'bordered',
        size: 'sm',
        align: 'stretch',
        onSubmit: vi.fn(),
      }),
    );
    expect(html).toContain('data-variant="bordered"');
    expect(html).toContain('data-size="sm"');
    expect(html).toContain('data-align="stretch"');
    expect(html).toContain('border-2');
    expect(html).toContain('max-w-sm');
    expect(html).toContain('max-w-none');
    expect(html).toContain('Contact');
  });

  it('hides the title when showTitle is false', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowFormRenderer, {
        schema: contactFormFixture,
        showTitle: false,
      }),
    );
    expect(html).not.toContain('>Contact<');
  });

  it('disables controls via fieldset', () => {
    const html = renderToStaticMarkup(
      createElement(DashflowFormRenderer, {
        schema: contactFormFixture,
        disabled: true,
      }),
    );
    expect(html).toContain('disabled');
  });
});
