import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import '@/App';

type AppLayoutProps = { children: ReactNode };

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box className="app-shell" sx={{ display: 'flex', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
