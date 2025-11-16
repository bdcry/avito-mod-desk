import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { API_URL } from '../../api/client';
import type { StatsSummary } from '../../types';
import { MetricCard } from './MetricCard';

const StatsPage = (): JSX.Element => {
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      setLoading(true);
      try {
        const summaryRes = await fetch(`${API_URL}/stats/summary?period=today`);

        if (summaryRes.ok) {
          const summaryData: StatsSummary = await summaryRes.json();
          setStats(summaryData);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Статистика модератора
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            label="Всего проверено объявлений"
            value={stats?.totalReviewedToday || 0}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            label="Процент одобренных"
            value={`${Math.round(stats?.approvedPercentage || 0)}%`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            label="Процент отклоненных"
            value={`${Math.round(stats?.rejectedPercentage || 0)}%`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            label="Среднее время на проверку одного объявления (сек)"
            value={stats?.averageReviewTime || 0}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsPage;
