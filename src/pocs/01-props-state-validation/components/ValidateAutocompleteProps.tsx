import { Autocomplete, Stack, TextField } from '@mui/material';
import { SourceFileTag } from '../../../components/SourceFileTag';
import { meta } from '../meta';

interface ValidatedAutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  label: string;
}

export function ValidatedAutocompleteProps({
  options,
  value,
  onChange,
  error,
  label,
}: ValidatedAutocompleteProps) {
  return (
    <Stack spacing={1}>
      <SourceFileTag
        fileName="ValidatedAutocompleteProps.tsx"
        path="src/pocs/01-props-state-validation/components/ValidatedAutocompleteProps.tsx"
        repoBaseUrl={meta.repoBaseUrl!}
      />
      <Autocomplete
        freeSolo
        options={options}
        inputValue={value}
        onInputChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={Boolean(error)}
            helperText={error ?? ' '}
          />
        )}
      />
    </Stack>
  );
}