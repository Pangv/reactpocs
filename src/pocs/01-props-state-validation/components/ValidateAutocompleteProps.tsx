import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type Validator = (value: string) => string | null;

export interface ValidatedAutocompletePropsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  validator: Validator;
}

export default function ValidatedAutocompleteProps({ options, value, onChange, label, validator }: ValidatedAutocompletePropsProps) {
  const [touched, setTouched] = useState(false);
  const errorMessage = validator(value);
  const showError = touched && Boolean(errorMessage);

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onChange={(_event, nextValue) => onChange(nextValue ?? '')}
      onInputChange={(_event, nextValue) => onChange(nextValue)}
      renderInput={(params) => (
        <TextField {...params} label={label} error={showError}
          helperText={showError ? errorMessage : 'Auswahl treffen oder eigenen Wert eingeben.'}
          onBlur={() => setTouched(true)} />
      )}
    />
  );
}
