import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { useState, type JSX } from 'react';

const REJECT_REASONS = [
  'Запрещённый товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'Другое',
];

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, comment: string) => void;
}

export function RejectModal({ open, onClose, onSubmit }: RejectModalProps): JSX.Element {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const finalReason = selectedReason === 'Другое' ? customReason : selectedReason;

  const isValid = finalReason.trim().length > 0 && selectedReason.length > 0;

  const handleSubmit = (): void => {
    if (isValid) {
      onSubmit(finalReason, comment);
      setSelectedReason('');
      setCustomReason('');
      setComment('');
    }
  };

  const handleClose = (): void => {
    setSelectedReason('');
    setCustomReason('');
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Отклонить объявление</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Причина отклонения *
            </Typography>
            <RadioGroup
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              {REJECT_REASONS.map((reason) => (
                <FormControlLabel
                  key={reason}
                  value={reason}
                  control={<Radio />}
                  label={reason}
                />
              ))}
            </RadioGroup>
          </Box>

          {selectedReason === 'Другое' && (
            <TextField
              label="Укажите причину"
              placeholder="Введите вашу причину отклонения"
              multiline
              rows={2}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              fullWidth
              error={selectedReason === 'Другое' && customReason.trim() === ''}
              helperText={
                selectedReason === 'Другое' && customReason.trim() === ''
                  ? 'Поле обязательно'
                  : ''
              }
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={!isValid}
        >
          Отклонить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
