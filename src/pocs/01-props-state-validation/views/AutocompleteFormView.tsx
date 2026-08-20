import { useState } from 'react';
import { Alert, Button, Stack, Typography } from '@mui/material';
import ValidatedAutocompleteProps from '@/pocs/01-props-state-validation/components/ValidateAutocompleteProps';
import { validateEmail, validatePhone } from '../utils/validators';

const emailOptions = ['hello@example.com', 'team@example.org', 'support@example.de'];
const phoneOptions = ['030 1234567', '+49 30 1234567', '089 / 987654'];

export default function AutocompleteFormView() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  const isValid = !emailError && !phoneError;

  return (
    <Stack spacing={3} sx={{ maxWidth: 680 }}>
      <Stack spacing={1}>
        <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800 }}>POC 01 / controlled inputs</Typography>
        <Typography variant="h2">Validierte Kontaktdaten</Typography>
        <Typography color="text.secondary">Beide Felder bleiben vollständig kontrolliert und teilen sich dieselbe Input-Abstraktion.</Typography>
      </Stack>
      <Stack spacing={2.5} component="form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <ValidatedAutocompleteProps options={emailOptions} value={email} onChange={setEmail} label="E-Mail-Adresse" validator={validateEmail} />
        <ValidatedAutocompleteProps options={phoneOptions} value={phone} onChange={setPhone} label="Telefonnummer" validator={validatePhone} />
        <Button type="submit" variant="contained" size="large" disabled={!isValid} sx={{ alignSelf: 'flex-start', px: 3 }}>Daten absenden</Button>
      </Stack>
      {submitted && isValid && <Alert severity="success">Die Kontaktdaten sind valide und wurden angenommen.</Alert>}
    </Stack>
  );
}
