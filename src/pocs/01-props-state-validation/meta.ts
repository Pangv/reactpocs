import type { PocMeta } from '@/registry/pocRegistry';

const repoBaseUrl = 'https://github.com/Pangv/reactpocs/blob/main';

export const meta: PocMeta = {
  id: '01-props-state-validation',
  title: 'Props, State & Validierung',
  description:
    'Zeigt Prop-Verteilung über View → Komponente → Sub-Input, Event-Handler-Weitergabe und Fehler-Meldung nach oben zur Steuerung von Maskenwechseln.',
  repoBaseUrl,
  sourceFiles: [
    { label: 'View', path: 'src/pocs/01-props-state-validation/views/AutocompleteFormView.tsx' },
    { label: 'Komponente', path: 'src/pocs/01-props-state-validation/components/ValidatedAutocompleteProps.tsx' },
    { label: 'Validatoren', path: 'src/pocs/01-props-state-validation/utils/validators.ts' },
    { label: 'Index/Einstieg', path: 'src/pocs/01-props-state-validation/index.tsx' },
  ],
};

export default meta;