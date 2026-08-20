import { Paper, Stack } from '@mui/material';
import { SourceFileTag } from '../../components/SourceFileTag';
import AutocompleteFormView from '@/pocs/01-props-state-validation/views/AutocompleteFormView';
import { meta } from './meta';

export default function PocPropsStateValidation() {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2.5, md: 5 }, border: '1px solid', borderColor: 'rgba(30,58,95,.08)' }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <SourceFileTag
          fileName="index.tsx"
          path="src/pocs/01-props-state-validation/index.tsx"
          repoBaseUrl={meta.repoBaseUrl!}
        />
      </Stack>
      <AutocompleteFormView />
    </Paper>
  );
}