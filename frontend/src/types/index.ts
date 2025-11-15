// Тип фильтров для списка
export type ListFilters = {
  statuses: string[];
  category: string;
  priceMin: string;
  priceMax: string;
  search: string;
  sort: string;
};

export const defaultFilters: ListFilters = {
  statuses: [],
  category: '',
  priceMin: '',
  priceMax: '',
  search: '',
  sort: 'createdAt_desc',
};

export type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  priority: string;
  seller: {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
  };
  moderationHistory: {
    id: number;
    moderatorId: number;
    moderatorName: string;
    action: string;
    reason: string;
    comment: string;
    timestamp: string;
  };
};
