import { Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { JSX } from 'react';
import type { ActivityData } from '../../types';

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps): JSX.Element {
  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Активность по дням
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="approved" fill="#10b981" name="Одобрено" />
          <Bar dataKey="rejected" fill="#ef4444" name="Отклонено" />
          <Bar dataKey="requestChanges" fill="#f97316" name="На доработку" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
