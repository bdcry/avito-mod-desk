import { Paper, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: JSX.Element;
}

export function MetricCard({ label, value, icon }: MetricCardProps): JSX.Element {
  return (
    <Paper
      sx={{
        p: 3,
        textAlign: 'center',
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack spacing={1} alignItems="center">
        {icon && <>{icon}</>}
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}
