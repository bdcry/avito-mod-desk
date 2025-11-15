import type { JSX } from 'react';
import type { ListFilters } from '../../types';
import {
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from '@mui/material';

type TFiltersBarProps = {
  value: ListFilters;
  onChange: (next: ListFilters) => void;
  onReset: () => void;
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
];

const CATEGORY_OPTIONS = [
  { id: 0, label: 'Электроника' },
  { id: 1, label: 'Недвижимость' },
  { id: 2, label: 'Транспорт' },
  { id: 3, label: 'Работа' },
  { id: 4, label: 'Услуги' },
  { id: 5, label: 'Животные' },
  { id: 6, label: 'Мода' },
  { id: 7, label: 'Детское' },
];

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Дата: новые → старые' },
  { value: 'createdAt_asc', label: 'Дата: старые → новые' },
  { value: 'price_asc', label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'priority_desc', label: 'Приоритет: срочные выше' },
  { value: 'priority_asc', label: 'Приоритет: обычные выше' },
];

const FiltersBar = ({ value, onChange, onReset }: TFiltersBarProps): JSX.Element => {
  const handleFieldChange = (
    fieldName: keyof ListFilters,
    newValue: string | string[]
  ) => {
    onChange({ ...value, [fieldName]: newValue });
  };
  return (
    <Paper sx={{ p: 2, m: 3, bgcolor: 'primary.white' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">Фильтры:</Typography>
        <Button size="small" variant="contained" sx={{ mt: 1 }} onClick={onReset}>
          Сбросить фильтры
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="status-label" size="small">
            Статус
          </InputLabel>
          <Select
            labelId="status-label"
            multiple
            size="small"
            value={value.statuses}
            onChange={(e) => handleFieldChange('statuses', e.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <>
                    <Chip
                      key={value}
                      label={
                        STATUS_OPTIONS.find((option) => option.value === value)?.label
                      }
                    />
                  </>
                ))}
              </Box>
            )}
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="category-label" size="small">
            Категория
          </InputLabel>
          <Select
            labelId="category-label"
            label="Категория"
            size="small"
            value={value.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Цена от"
          type="number"
          size="small"
          sx={{ width: 120 }}
          value={value.priceMin}
          onChange={(e) => handleFieldChange('priceMin', e.target.value)}
        />
        <TextField
          label="Цена до"
          type="number"
          size="small"
          sx={{ width: 120 }}
          value={value.priceMax}
          onChange={(e) => handleFieldChange('priceMax', e.target.value)}
        />
        <TextField
          label="Поиск по названию"
          size="small"
          sx={{ minWidth: 200 }}
          value={value.search}
          onChange={(e) => handleFieldChange('search', e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label" size="small">
            Сортировка
          </InputLabel>
          <Select
            labelId="sort-label"
            label="Сортировка"
            size="small"
            value={value.sort}
            onChange={(e) => handleFieldChange('sort', e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FiltersBar;
