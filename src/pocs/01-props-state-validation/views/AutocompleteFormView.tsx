import { useMemo, useState } from 'react';
import { Alert, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { SourceFileTag } from '../../../components/SourceFileTag';
import { ValidatedAutocompleteProps } from '../components/ValidateAutocompleteProps';
import { validateEmail, validatePhone } from '../utils/validators';
import { meta } from '../meta';
import PropFlowDiagram from '@/components/PropFlowDiagram';

const emailOptions = ['max.mustermann@firma.de', 'lisa.schmidt@firma.de'];
const phoneOptions = ['+49 170 1234567', '+49 30 987654'];

export default function AutocompleteFormView() {
  const [email, setEmail] = useState({ value: '', error: null as string | null });
  const [phone, setPhone] = useState({ value: '', error: null as string | null });
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(
    () => !email.error && !phone.error && email.value !== '' && phone.value !== '',
    [email, phone],
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <SourceFileTag
          fileName="AutocompleteFormView.tsx"
          path="src/pocs/01-props-state-validation/views/AutocompleteFormView.tsx"
          repoBaseUrl={meta.repoBaseUrl!}
        />
        <Typography variant="h5">Props & State: Kontaktdaten-Validierung</Typography>
        <Typography variant="body2" color="text.secondary">
          Diese View hält den Gesamt-State (E-Mail, Telefon) und reicht Werte + Event-Handler
          als Props an die gekapselte Autocomplete-Komponente durch. Beide Felder teilen sich
          dieselbe Input-Abstraktion.
        </Typography>
      </Stack>

      <Stack
        spacing={2.5}
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <ValidatedAutocompleteProps
          options={emailOptions}
          value={email.value}
          onChange={(value) => setEmail({ value, error: validateEmail(value) })}
          error={email.error}
          label="E-Mail-Adresse"
        />
        <ValidatedAutocompleteProps
          options={phoneOptions}
          value={phone.value}
          onChange={(value) => setPhone({ value, error: validatePhone(value) })}
          error={phone.error}
          label="Telefonnummer"
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isValid}
          sx={{ alignSelf: 'flex-start', px: 3 }}
        >
          Daten absenden
        </Button>
      </Stack>

      {submitted && isValid && (
        <Alert severity="success">Die Kontaktdaten sind valide und wurden angenommen.</Alert>
      )}


    </Stack>
  );
}