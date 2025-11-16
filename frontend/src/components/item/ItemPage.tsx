import { Box, Button, Grid, Stack, Typography, Paper, Divider } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../api/client';
import { type Ad } from '../../types';
import { RejectModal } from './RejectModal';

const STATUS_LABELS: Record<string, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'Требуется доработка',
};

const ItemPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch ad details by ID
    const fetchAdDetails = () => {
      fetch(`${API_URL}/ads/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch ad details');
          }

          return response.json();
        })
        .then((data: Ad) => {
          setAd(data);
        })
        .catch((error) => console.error('Error fetching ad details:', error));
    };

    fetchAdDetails();
  }, [id]);

  const handlePrev = (): void => {
    if (!ad) return;
    const prevId = Number(ad.id) - 1;
    navigate(`/item/${prevId}`);
  };

  const handleNext = (): void => {
    if (!ad) return;
    const nextId = Number(ad.id) + 1;
    navigate(`/item/${nextId}`);
  };

  const handleApprove = (): void => {
    if (!id) return;

    fetch(`${API_URL}/ads/${id}/approve`, { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to approve ad');
        }
        return response.json();
      })
      .then((data) => {
        setAd(data.ad);
      })
      .catch((error) => console.error('Error approving ad:', error));
  };

  const handleRequestChanges = (): void => {
    if (!id) return;

    const requestData = {
      reason: 'Некорректное описание',
      comment: 'Необходимо улучшить описание товара и добавить больше деталей',
    };

    fetch(`${API_URL}/ads/${id}/request-changes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to request changes');
        }
        return response.json();
      })
      .then((data) => {
        setAd(data.ad);
      })
      .catch((error) => console.error('Error requesting changes:', error));
  };

  const handleRejectSubmit = (reason: string, comment: string): void => {
    if (!id) return;

    const requestData = {
      reason,
      comment,
    };

    fetch(`${API_URL}/ads/${id}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reject ad');
        }
        return response.json();
      })
      .then((data) => {
        setAd(data.ad);
        setRejectModalOpen(false);
      })
      .catch((error) => {
        console.error('Error rejecting ad:', error);
      });
  };

  return (
    <Box>
      <Typography variant="h4">Страница объявления ID: {id}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 4, md: 7 }} sx={{ textAlign: 'left' }}>
          <Paper sx={{ p: 2, minHeight: 220 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Галерея
            </Typography>
            <Stack direction="row" spacing={1}>
              {ad?.images.map((src, index) => (
                <Box
                  key={src}
                  component="img"
                  src={src}
                  alt={`${ad.title} ${index + 1}`}
                  sx={{
                    width: 180,
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* История модерации */}
        <Grid size={{ xs: 4, md: 5 }} sx={{ textAlign: 'left' }}>
          <Paper sx={{ p: 2, minHeight: 220 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              История модерации
            </Typography>
            {ad?.moderationHistory.map((moderationData) => (
              <Box key={moderationData.id} sx={{ mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  Модератор: {moderationData.moderatorName}
                </Typography>
                <Typography variant="body2">
                  {new Date(moderationData.timestamp).toLocaleString('ru-RU')}
                </Typography>
                <Typography variant="body2">
                  Решение: {STATUS_LABELS[moderationData.action]}
                </Typography>
                {moderationData.comment && (
                  <Typography variant="body2">
                    Комментарий: {moderationData.comment}
                  </Typography>
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Описание */}
        <Paper sx={{ p: 2, width: '100%', mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, textAlign: 'left' }}>
            Полное описание
          </Typography>
          <Divider />
          <Typography sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
            Описание: {ad?.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
            Характеристики
          </Typography>
          <Divider />
          <Box
            component="table"
            sx={{ width: '100%', borderCollapse: 'collapse', mb: 2, mt: 2 }}
          >
            <tbody>
              {Object.entries(ad?.characteristics || {}).map(([key, value]) => (
                <tr key={key}>
                  <td
                    style={{
                      padding: '4px 8px',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      textAlign: 'left',
                    }}
                  >
                    {key}
                  </td>
                  <td style={{ padding: '4px 8px', textAlign: 'left' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </Box>
          <Divider />
          <Typography variant="body2" sx={{ textAlign: 'left', mt: 2 }}>
            Имя: {ad?.seller.name} • Рейтинг: {ad?.seller.rating}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            Всего объявлений: {ad?.seller.totalAds}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            На сайте с:{' '}
            {new Date(ad?.seller.registeredAt || '').toLocaleDateString('ru-RU')}
          </Typography>
        </Paper>

        {/* Кнопки на модерацию */}
        <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            disabled={ad?.status === 'approved'}
          >
            ✓ Одобрить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setRejectModalOpen(true)}
            disabled={ad?.status === 'rejected'}
          >
            ✗ Отклонить
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleRequestChanges}
            disabled={ad?.status === 'approved'}
          >
            ↺ Доработка
          </Button>
        </Stack>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => navigate('/list')}>
          {'← К списку'}
        </Button>
        <Button variant="contained" onClick={handlePrev}>
          {'Предыдущее'}
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {'Следующее'}
        </Button>
      </Stack>

      <RejectModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </Box>
  );
};

export default ItemPage;
