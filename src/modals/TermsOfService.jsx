import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TermsOfServiceModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!open) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: '#13131f',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6)',
          width: '100%',
          maxWidth: 600,
          maxHeight: '85vh',
          overflow: 'auto',
          position: 'relative',
          p: { xs: 3, sm: 4 },
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'rgba(255,255,255,0.5)',
            '&:hover': { color: '#e74c3c' },
          }}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: '#f0f0f5',
            mb: 1,
            fontSize: { xs: '1.3rem', sm: '1.5rem' },
          }}
        >
          Terms of Service
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mb: 3 }}>
          Last updated: September 3, 2026
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              By accessing or using Movie Vault ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you should not use the Service. We reserve the right to update these terms at any time, and continued use of the Service after changes constitutes acceptance of the revised terms.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              2. Description of Service
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Movie Vault is a movie discovery application that allows users to search for films, view movie details including ratings, cast, and plot summaries, and maintain a personal favorites list. All movie data is sourced from the Open Movie Database (OMDb) API. The Service is provided "as is" and is intended for personal, non-commercial use.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              3. User Conduct
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              You agree not to misuse the Service, attempt to access it through unauthorized means, use automated tools to extract data, or engage in any activity that disrupts or interferes with the Service's functionality. You are solely responsible for any data stored locally in your browser through the favorites feature.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              4. Intellectual Property
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Movie posters, artwork, and related content displayed in the Service are the property of their respective owners. Movie data, including titles, ratings, and descriptions, is sourced from OMDb and is subject to their terms. The design and code of Movie Vault are owned by the developer.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              5. Limitation of Liability
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              The Service is provided without warranties of any kind. The developer shall not be held liable for any damages arising from the use of or inability to use the Service, including but not limited to inaccuracies in movie data, service interruptions, or loss of locally stored data. You use the Service at your own risk.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              6. Changes to Terms
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              We may modify these terms from time to time. Material changes will be communicated through the Service or via reasonable means. Your continued use after any modifications indicates your acceptance of the updated terms.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TermsOfServiceModal;
