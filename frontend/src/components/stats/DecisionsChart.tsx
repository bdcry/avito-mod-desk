import { Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import type { JSX } from 'react';
import type { DecisionsData } from '../../types';

interface DecisionsChartProps {
  data: DecisionsData;
}

const COLORS = ['#10b981', '#ef4444', '#f97316'];
const LABELS = ['Одобрено', 'Отклонено', 'На доработку'];

export function DecisionsChart({ data }: DecisionsChartProps): JSX.Element {
  const chartData = [
    { name: LABELS[0], value: Math.round(data.approved) },
    { name: LABELS[1], value: Math.round(data.rejected) },
    { name: LABELS[2], value: Math.round(data.requestChanges) },
  ];

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Распределение решений
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
