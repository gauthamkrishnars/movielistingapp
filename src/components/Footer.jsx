import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import FilmIcon from '@mui/icons-material/MovieCreation';
import GitHubIcon from '@mui/icons-material/GitHub';
import TermsOfServiceModal from '../modals/TermsOfService';
import PrivacyPolicyModal from '../modals/PrivacyPolicy';

const Footer = () => {
  const [tosOpen, setTosOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: 'rgba(8, 8, 14, 0.98)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          mt: 8,
        }}
      >
        {/* Main Footer Content */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 3, sm: 6 },
          }}
        >
          {/* Brand */}
          <Box sx={{ flex: isMobile ? 1 : '0 0 280px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <FilmIcon sx={{ fontSize: 28, color: '#f5bc42' }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: '#f0f0f5',
                }}
              >
                Movie Vault
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.35)',
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              Search thousands of movies, explore cast details and ratings, and build your personal favorites list. Powered by the OMDb API.
            </Typography>
          </Box>

          {/* Explore */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 2, display: 'block' }}
            >
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Search Movies', to: '/search/action' },
                { label: 'Favorites', to: '/favorites' },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      transition: 'all 0.2s ease',
                      '&:hover': { color: '#f5bc42', pl: 0.5 },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Legal */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 2, display: 'block' }}
            >
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="body2"
                component="button"
                onClick={() => setTosOpen(true)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  p: 0,
                  '&:hover': { color: '#f5bc42', pl: 0.5 },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                component="button"
                onClick={() => setPrivacyOpen(true)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  p: 0,
                  '&:hover': { color: '#f5bc42', pl: 0.5 },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.3)', lineHeight: 1.6 }}>
                Data sourced via OMDb API
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.04)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.25)' }}>
            © {currentYear} Movie Vault. This is a demo project. Movie data provided by OMDb.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: alpha('#fff', 0.08),
                },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <TermsOfServiceModal open={tosOpen} onClose={() => setTosOpen(false)} />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};

export default Footer;
