import { Autocomplete, Stack, TextField } from '@mui/material';
import { SourceFileTag } from '../../../components/SourceFileTag';
import { meta } from '../meta';

interface ValidateAutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  label: string;
}

export function ValidateAutocompleteProps({
  options,
  value,
  onChange,
  error,
  label,
}: ValidateAutocompleteProps) {
  return (
    <Stack spacing={1}>
      <SourceFileTag
        fileName="ValidateAutocompleteProps.tsx"
        path="src/pocs/01-props-state-validation/components/ValidateAutocompleteProps.tsx"
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