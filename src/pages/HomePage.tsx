import { Box, Card, CardActionArea, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { pocRegistry } from '../registry/pocRegistry';

export default function HomePage() {
  return (
    <Stack spacing={5}>
      <Box sx={{ maxWidth: 760 }}>
        <Chip label="Proof-of-concept workspace" color="secondary" sx={{ mb: 2, color: 'white' }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4.5rem' }, lineHeight: 1.02, mb: 2 }}>
          Small experiments. <Box component="span" sx={{ color: 'secondary.main' }}>Clear patterns.</Box>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 620 }}>
          A focused atlas for exploring reusable React, TypeScript, and MUI component patterns.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {pocRegistry.map((poc) => (
          <Grid size={{ xs: 12, md: 6 }} key={poc.id}>
            <Card sx={{ height: '100%', border: '1px solid', borderColor: 'rgba(30,58,95,.08)' }}>
              <CardActionArea component={Link} to={`/pocs/${poc.id}`} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3.5 }}>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800 }}>{poc.id}</Typography>
                      <Typography variant="h5" sx={{ mt: 1, mb: 1.5 }}>{poc.title}</Typography>
                      <Typography color="text.secondary">{poc.description}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
