import type { ListFilters } from '../types';

export const defaultFilters: ListFilters = {
  statuses: [],
  category: '',
  priceMin: '',
  priceMax: '',
  search: '',
  sort: 'createdAt_desc',
};
