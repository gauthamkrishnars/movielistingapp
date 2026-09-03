import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
  Drawer,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ScienceIcon from '@mui/icons-material/Science';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ConstructionIcon from '@mui/icons-material/Construction';
import HistoryIcon from '@mui/icons-material/History';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const DRAWER_WIDTH = 240;
const COMPACT_WIDTH = 64;

const categories = [
  { name: 'Home', icon: <HomeIcon />, route: '/' },
  { name: 'Favorites', icon: <FavoriteIcon />, route: '/favorites' },
  { type: 'divider' },
  { name: 'Action', icon: <WhatshotIcon />, route: '/search/action' },
  { name: 'Comedy', icon: <TheaterComedyIcon />, route: '/search/comedy' },
  { name: 'Drama', icon: <AutoAwesomeIcon />, route: '/search/drama' },
  { name: 'Sci-Fi', icon: <ScienceIcon />, route: '/search/sci-fi' },
  { name: 'Horror', icon: <ConstructionIcon />, route: '/search/horror' },
  { name: 'Romance', icon: <MusicNoteIcon />, route: '/search/romance' },
  { name: 'Thriller', icon: <SportsEsportsIcon />, route: '/search/thriller' },
  { name: 'Animation', icon: <MovieCreationIcon />, route: '/search/animation' },
  { name: 'Documentary', icon: <HistoryIcon />, route: '/search/documentary' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isActive = (route) => location.pathname === route;

  const handleClick = (route) => {
    navigate(route);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? DRAWER_WIDTH : isOpen ? DRAWER_WIDTH : COMPACT_WIDTH,
        height: '100%',
        backgroundColor: 'rgba(10, 10, 18, 0.98)',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        overflowY: 'auto',
        overflowX: 'hidden',
        pt: '64px',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::-webkit-scrollbar': { width: 3 },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
        },
      }}
    >
      <List sx={{ px: isOpen || isMobile ? 1 : 0.5, py: 1 }}>
        {categories.map((item) => {
          if (item.type === 'divider') {
            return (
              <Divider
                key="divider"
                sx={{ mx: 2, my: 1, borderColor: 'rgba(255, 255, 255, 0.06)' }}
              />
            );
          }

          const active = isActive(item.route);
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.3, justifyContent: 'center' }}>
              <ListItemButton
                onClick={() => handleClick(item.route)}
                sx={{
                  minHeight: 42,
                  borderRadius: '10px',
                  px: isOpen || isMobile ? 2 : 0,
                  justifyContent: isOpen || isMobile ? 'initial' : 'center',
                  backgroundColor: active ? alpha('#f5bc42', 0.12) : 'transparent',
                  border: active
                    ? '1px solid rgba(245, 188, 66, 0.25)'
                    : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: active
                      ? alpha('#f5bc42', 0.18)
                      : alpha('#fff', 0.06),
                    transform: 'translateX(2px)',
                  },
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isOpen || isMobile ? 36 : 'auto',
                    justifyContent: 'center',
                    color: active ? '#f5bc42' : '#777',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {(isOpen || isMobile) && (
                  <ListItemText
                    primary={item.name}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.82rem',
                        fontWeight: active ? 700 : 500,
                        color: active ? '#f5bc42' : '#ccc',
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {(isOpen || isMobile) && (
        <Box sx={{ p: 2.5, mt: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.25)',
              display: 'block',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            Built with React.js & OMDb API
          </Typography>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            backgroundColor: 'rgba(10, 10, 18, 0.98)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: isOpen ? DRAWER_WIDTH : COMPACT_WIDTH,
        flexShrink: 0,
        position: 'fixed',
        left: 0,
        top: '64px',
        bottom: 0,
        zIndex: theme.zIndex.drawer,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {drawerContent}
    </Box>
  );
};

export default Sidebar;
