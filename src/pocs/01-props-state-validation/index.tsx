import { Paper } from '@mui/material';
import AutocompleteFormView from './views/AutocompleteFormView';

export default function PocPropsStateValidation() {
  return <Paper elevation={0} sx={{ p: { xs: 2.5, md: 5 }, border: '1px solid', borderColor: 'rgba(30,58,95,.08)' }}><AutocompleteFormView /></Paper>;
}
