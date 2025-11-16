import { Paper, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { JSX } from 'react';

interface CategoriesChartProps {
  data: Record<string, number>;
}

export function CategoriesChart({ data }: CategoriesChartProps): JSX.Element {
  const chartData = Object.entries(data).map(([category, count]) => ({
    name: category,
    count,
  }));

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Проверено по категориям
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={190} />
          <Tooltip />
          <Bar dataKey="count" fill="#2196f3" name="Количество" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
