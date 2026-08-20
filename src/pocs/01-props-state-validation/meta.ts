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
    { label: 'Komponente', path: 'src/pocs/01-props-state-validation/components/ValidateAutocompleteProps.tsx' },
    { label: 'Validatoren', path: 'src/pocs/01-props-state-validation/utils/validators.ts' },
    { label: 'Index/Einstieg', path: 'src/pocs/01-props-state-validation/index.tsx' },
  ],
  propFlowDiagram: `
flowchart TD
    A["AutocompleteFormView"]
    B["ValidateAutocompleteProps<br/>value, onChange, error"]
    C["validators.ts"]
    D["validateEmail(value)<br/>validatePhone(value)"]
    E{"error vorhanden?"}
    F["Submit-Button deaktiviert<br/>Maskenwechsel deaktiviert"]
    G["Submit möglich<br/>Maskenwechsel möglich"]

    A -->|"Props"| B
    B -->|"onInputChange(value)"| A
    A -->|"Validierung"| C
    C --> D
    D -->|"error"| B
    B --> E
    E -->|"Ja"| F
    E -->|"Nein"| G
`,
};

export default meta;