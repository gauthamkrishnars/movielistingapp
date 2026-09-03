import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PrivacyPolicyModal = ({ open, onClose }) => {
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
          Privacy Policy
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mb: 3 }}>
          Last updated: September 3, 2026
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Movie Vault operates as a client-side application. We do not collect, store, or transmit any personal information to external servers. Your search queries and favorites are processed entirely within your browser. No account creation is required to use the Service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              2. Local Storage
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Your favorites list is stored locally in your browser using localStorage. This data never leaves your device and is not accessible to us or any third party. You can clear this data at any time by clearing your browser's local storage or by removing individual favorites within the app.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              3. Third-Party APIs
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              When you search for movies or view movie details, your browser makes direct requests to the OMDb API. These requests are governed by OMDb's own privacy policy. We do not have access to the data exchanged between your browser and OMDb's servers beyond what is displayed in the application.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              4. Cookies and Tracking
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Movie Vault does not use cookies, analytics tools, advertising trackers, or any form of user tracking. The Service does not embed third-party scripts that collect user data. Your browsing activity within the app is entirely private.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              5. Data Security
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Since all data remains on your device, there is no risk of data breaches on our end. We recommend keeping your browser updated and practicing standard web security hygiene to protect any locally stored data.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              6. Children's Privacy
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              Movie Vault does not knowingly collect any personal information from anyone, including children under the age of 13. The Service is safe for users of all ages. No personal data is collected or processed.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: '#f5bc42', mb: 0.5 }}>
              7. Changes to This Policy
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last updated" date at the top of this document. Given the minimal data footprint of this application, material changes are unlikely.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicyModal;
