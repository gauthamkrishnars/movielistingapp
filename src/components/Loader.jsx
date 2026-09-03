import React from 'react';
import { Box, Skeleton, alpha } from '@mui/material';

const Loader = ({ count = 8, type = 'grid' }) => {
  if (type === 'single') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 3 }}>
        <Skeleton
          variant="rounded"
          sx={{ width: '60%', height: 36, bgcolor: alpha('#f5bc42', 0.08), borderRadius: '8px' }}
        />
        <Skeleton
          variant="rounded"
          sx={{ width: '100%', height: 300, bgcolor: alpha('#fff', 0.05), borderRadius: '16px' }}
        />
        <Skeleton variant="text" sx={{ bgcolor: alpha('#fff', 0.06), width: '80%' }} height={24} />
        <Skeleton variant="text" sx={{ bgcolor: alpha('#fff', 0.04), width: '60%' }} height={20} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i}>
          <Skeleton
            variant="rounded"
            sx={{
              width: '100%',
              aspectRatio: '2/3',
              borderRadius: '12px',
              bgcolor: alpha('#fff', 0.05),
            }}
          />
          <Skeleton
            variant="text"
            sx={{ bgcolor: alpha('#fff', 0.06), width: '80%', mt: 1 }}
            height={20}
          />
          <Skeleton
            variant="text"
            sx={{ bgcolor: alpha('#fff', 0.04), width: '50%' }}
            height={16}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Loader;
