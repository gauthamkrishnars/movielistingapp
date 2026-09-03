import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography,
  Badge,
  useMediaQuery,
  useTheme,
  alpha,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilmIcon from '@mui/icons-material/MovieCreation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({ favoriteCount, onMenuToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(10, 10, 18, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 2 },
          minHeight: '64px',
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onMenuToggle}
            sx={{
              color: '#f0f0f5',
              '&:hover': { backgroundColor: alpha('#fff', 0.08) },
            }}
            aria-label="Toggle navigation"
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FilmIcon
              sx={{
                fontSize: 30,
                color: '#f5bc42',
                filter: 'drop-shadow(0 0 8px rgba(245, 188, 66, 0.4))',
              }}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f5bc42 0%, #ffd97a 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Movie Vault
              </Typography>
            )}
          </Link>
        </Box>

        {/* Center: Search */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: { xs: 1, md: 0.5 },
            maxWidth: { xs: '100%', md: '560px' },
            mx: { xs: 1, md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              backgroundColor: alpha('#fff', 0.06),
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                backgroundColor: alpha('#fff', 0.1),
                border: '1px solid rgba(245, 188, 66, 0.4)',
                boxShadow: '0 0 20px rgba(245, 188, 66, 0.12)',
              },
              pl: 2,
              pr: 1,
            }}
          >
            <InputBase
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: 1,
                color: '#f0f0f5',
                fontSize: '0.9rem',
                '& ::placeholder': {
                  color: 'rgba(255, 255, 255, 0.4)',
                  opacity: 1,
                },
              }}
              inputProps={{ 'aria-label': 'Search movies' }}
            />
            <IconButton
              type="submit"
              disabled={isSearching}
              sx={{
                color: '#f0f0f5',
                ml: 1,
                p: 1.2,
                borderRadius: '50%',
                backgroundColor: alpha('#fff', 0.08),
                '&:hover': {
                  backgroundColor: alpha('#f5bc42', 0.2),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
              aria-label="Search"
            >
              {isSearching ? (
                <CircularProgress size={20} sx={{ color: '#f5bc42' }} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* Right: Nav Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              color: '#f0f0f5',
              '&:hover': { color: '#f5bc42', backgroundColor: alpha('#f5bc42', 0.1) },
            }}
            aria-label="Home"
          >
            <HomeIcon fontSize="small" />
          </IconButton>
          <IconButton
            component={Link}
            to="/favorites"
            sx={{
              color: '#f0f0f5',
              '&:hover': { color: '#e74c3c', backgroundColor: alpha('#e74c3c', 0.1) },
            }}
            aria-label="Favorites"
          >
            <Badge
              badgeContent={favoriteCount}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  minWidth: 18,
                  height: 18,
                },
              }}
            >
              <FavoriteIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
