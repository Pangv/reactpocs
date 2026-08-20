import { Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

interface SourceFileTagProps {
  fileName: string;
  path: string;
  repoBaseUrl: string;
}

export function SourceFileTag({ fileName, path, repoBaseUrl }: SourceFileTagProps) {
  return (
    <Chip
      component="a"
      href={`${repoBaseUrl}/${path}`}
      target="_blank"
      rel="noopener noreferrer"
      clickable
      icon={<CodeIcon fontSize="small" />}
      label={fileName}
      variant="outlined"
      size="small"
      sx={{
        mb: 1,
        fontFamily: '"Fira Code", "Roboto Mono", monospace',
        fontSize: '0.75rem',
        borderStyle: 'dashed',
      }}
    />
  );
}