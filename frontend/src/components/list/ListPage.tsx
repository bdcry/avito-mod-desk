import { Box, Typography } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { type Ad, defaultFilters, type ListFilters } from '../../types';
import FiltersBar from './FiltersBar';
import AdCard from './AdCard';
import Pagination from './Pagination';
import { API_URL } from '../../api/client';

const ListPage = (): JSX.Element => {
  const [filters, setFilters] = useState<ListFilters>(defaultFilters);

  const [page, setPage] = useState<number>(1);

  const [ads, setAds] = useState<Ad[]>([]);
  const [totalAds, setTotalAds] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleChangeFilters = (newValue: ListFilters) => {
    setFilters(newValue);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = () => {
      const queryParts: string[] = [`page=${page}`];

      if (filters.statuses.length > 0) {
        filters.statuses.forEach((status) => {
          queryParts.push(`status=${encodeURIComponent(status)}`);
        });
      }

      if (filters.priceMin.trim() !== '') {
        queryParts.push(`minPrice=${filters.priceMin}`);
      }

      if (filters.priceMax.trim() !== '') {
        queryParts.push(`maxPrice=${filters.priceMax}`);
      }

      if (filters.search.trim() !== '') {
        queryParts.push(`search=${filters.search.trim()}`);
      }

      if (filters.category) {
        queryParts.push(`categoryId=${filters.category}`);
      }

      if (filters.sort) {
        let sortBy = 'createdAt';
        let sortOrder: 'asc' | 'desc' = 'desc';

        switch (filters.sort) {
          case 'createdAt_asc':
            sortBy = 'createdAt';
            sortOrder = 'asc';
            break;
          case 'createdAt_desc':
            sortBy = 'createdAt';
            sortOrder = 'desc';
            break;
          case 'price_asc':
            sortBy = 'price';
            sortOrder = 'asc';
            break;
          case 'price_desc':
            sortBy = 'price';
            sortOrder = 'desc';
            break;
          case 'priority_desc':
            sortBy = 'priority';
            sortOrder = 'desc';
            break;
          case 'priority_asc':
            sortBy = 'priority';
            sortOrder = 'asc';
            break;
          default:
            break;
        }

        queryParts.push(`sortBy=${sortBy}`, `sortOrder=${sortOrder}`);
      }

      const queryString = queryParts.join('&');

      fetch(`${API_URL}/ads?${queryString}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setAds(data.ads);

          setTotalAds(data.pagination.totalItems);
          setTotalPages(data.pagination.totalPages);
        })
        .catch((error) => console.error('Error fetching ads:', error));
    };

    fetchData();
  }, [page, filters]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        `/list` - Список
      </Typography>
      <FiltersBar
        value={filters}
        onChange={handleChangeFilters}
        onReset={handleResetFilters}
      />
      <Box>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </Box>
      <Pagination page={page} pageCount={totalPages} onChange={setPage} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Всего объявлений: {totalAds}
      </Typography>
    </Box>
  );
};

export default ListPage;
