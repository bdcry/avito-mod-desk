import { Box, Pagination as MUIPag } from '@mui/material';
import type { JSX } from 'react';

type TPaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, pageCount, onChange }: TPaginationProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <MUIPag
        shape="rounded"
        count={pageCount}
        page={page}
        onChange={(_, newPage) => onChange(newPage)}
      />
    </Box>
  );
};

export default Pagination;
