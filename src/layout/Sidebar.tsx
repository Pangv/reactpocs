import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import {
  Box,
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
import { pocRegistry } from '../registry/pocRegistry';

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
      <List sx={{ px: 1.5, py: 2 }}>
        <ListItemButton component={NavLink} to="/" end sx={{ borderRadius: 2, mb: 1, '&.active': { bgcolor: 'rgba(255,255,255,.14)' } }}>
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><HomeRoundedIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', opacity: 0.58, textTransform: 'uppercase', letterSpacing: '.12em' }}>
          Proofs of concept
        </Typography>
        {pocRegistry.map((poc) => (
          <ListItemButton key={poc.id} component={NavLink} to={`/pocs/${poc.id}`} sx={{ borderRadius: 2, '&.active': { bgcolor: 'secondary.main' } }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><ScienceRoundedIcon /></ListItemIcon>
            <ListItemText primary={poc.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
