export type ListFilters = {
  statuses: string[];
  category: string;
  priceMin: string;
  priceMax: string;
  search: string;
  sort: string;
};

export type ModerationAction = 'approved' | 'rejected' | 'requestChanges';

export type ModerationHistoryItem = {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: ModerationAction;
  reason: string | null;
  comment: string;
  timestamp: string;
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
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistoryItem[];
};

export type StatsSummary = {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
};

export type ActivityData = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type DecisionsData = {
  approved: number;
  rejected: number;
  requestChanges: number;
};
