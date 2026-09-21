/**
 * Forms registry. Shape matches docs/projects/registry.ts.
 */

export type RegistryTier = 'free' | 'pro';

export type RegistryEntry = {
  id: string;
  title: string;
  tier: RegistryTier;
  editor: boolean;
};

export type ComponentRegistry = readonly RegistryEntry[];

export const FORMS_REGISTRY = [
  { id: 'forms.text', title: 'Text', tier: 'free', editor: true },
  { id: 'forms.number', title: 'Number', tier: 'free', editor: true },
  { id: 'forms.email', title: 'Email', tier: 'free', editor: true },
  { id: 'forms.textarea', title: 'Textarea', tier: 'free', editor: true },
  { id: 'forms.select', title: 'Select', tier: 'free', editor: true },
  { id: 'forms.checkbox', title: 'Checkbox', tier: 'free', editor: true },
  { id: 'forms.radio', title: 'Radio', tier: 'free', editor: true },
  { id: 'forms.switch', title: 'Switch', tier: 'free', editor: true },
  { id: 'forms.submit', title: 'Submit', tier: 'free', editor: true },
  { id: 'forms.repeater', title: 'Repeater', tier: 'pro', editor: true },
  { id: 'forms.wizard', title: 'Wizard', tier: 'pro', editor: true },
  { id: 'forms.file', title: 'File field', tier: 'pro', editor: true },
] as const satisfies ComponentRegistry;

export default FORMS_REGISTRY;
