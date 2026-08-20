import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { pocRegistry } from '@/registry/pocRegistry';

const drawerWidth = 272;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 0,
          borderRight: '1px solid rgba(30, 58, 95, 0.1)',
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Toolbar sx={{ alignItems: 'flex-start', py: 3, minHeight: 92 }}>
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: '.16em', opacity: 0.65 }}>
            Component lab 
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>React POC Atlas</Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.12)' }} />
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        <ListItemButton component={NavLink} to="/" end sx={{ borderRadius: 2, mb: 1, '&.active': { bgcolor: 'rgba(255,255,255,.14)' } }}>
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', opacity: 0.58, textTransform: 'uppercase', letterSpacing: '.12em' }}>
          Proofs of concept
        </Typography>
        {pocRegistry.map((poc) => (
          <ListItemButton key={poc.id} component={NavLink} to={`/pocs/${poc.id}`} sx={{ borderRadius: 2, '&.active': { bgcolor: 'secondary.main' } }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}></ListItemIcon>
            <ListItemText primary={poc.title} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <Button
          component="a"
          href="https://github.com/Pangv/reactpocs"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>}
          // startIcon={<svg src="/github.svg" alt="" style={{ width: 20, height: 20}} ></svg>}
          variant="outlined"
          sx={{
            color: 'primary.contrastText',
            borderColor: 'rgba(255,255,255,.25)',
            '&:hover': { borderColor: 'rgba(255,255,255,.5)', bgcolor: 'rgba(255,255,255,.08)' },
          }}
        >
          GitHub
        </Button>
      </Box>
    </Drawer>
  );
}
