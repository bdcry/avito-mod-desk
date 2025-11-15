import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import type { JSX } from 'react';
import type { Ad } from '../../types';

type TAdCardProps = {
  ad: Ad;
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

const PRIORITY_LABELS: Record<string, string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

const statusBgColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'grey';
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'grey';
  }
};

const priorityBgColor = (priority: string): string => {
  switch (priority) {
    case 'normal':
      return 'blue';
    case 'urgent':
      return 'orange';
    default:
      return 'blue';
  }
};

const AdCard = ({ ad }: TAdCardProps): JSX.Element => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', gap: 2 }}>
        <CardMedia
          component="img"
          image={ad.images[0]}
          alt={ad.title}
          sx={{ width: 100, height: 100, objectFit: 'cover', alignSelf: 'center' }}
        />
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6">{ad.title}</Typography>
          <Typography variant="subtitle1">Стоимость: {ad.price} р</Typography>
          <Chip size="small" label={ad.category} />
          <Chip
            size="small"
            sx={{ ml: 1 }}
            label={new Date(ad.createdAt).toLocaleDateString('ru-RU')}
          />
          <Chip
            size="small"
            label={STATUS_LABELS[ad.status]}
            sx={{ ml: 1, bgcolor: statusBgColor(ad.status), color: 'white' }}
          />
          <Chip
            size="small"
            label={PRIORITY_LABELS[ad.priority]}
            sx={{ ml: 1, bgcolor: priorityBgColor(ad.priority), color: 'white' }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained">Открыть</Button>
      </CardActions>
    </Card>
  );
};

export default AdCard;
