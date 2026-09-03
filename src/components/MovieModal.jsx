import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Link } from 'react-router-dom';
import { fetchFromOMDb } from '../utils/fetchFromAPI';
import Loader from './Loader';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/400x600/1a1a2e/55556a?text=No+Poster';

const MovieModal = ({ imdbID, onClose, isFavorite, onToggleFavorite }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!imdbID) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFromOMDb({ i: imdbID, plot: 'full' });
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!imdbID) return null;

  const posterUrl = movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;

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
          maxWidth: isMobile ? '100%' : 800,
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
          },
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            backgroundColor: alpha('#000', 0.6),
            color: '#fff',
            '&:hover': { backgroundColor: alpha('#e74c3c', 0.4) },
          }}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {loading ? (
          <Box sx={{ p: 3 }}>
            <Loader type="single" />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#e74c3c' }}>
              {error}
            </Typography>
          </Box>
        ) : movie && (
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Poster */}
            <Box
              sx={{
                width: isMobile ? '100%' : 280,
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={posterUrl}
                alt={movie.Title}
                sx={{
                  width: '100%',
                  height: isMobile ? 300 : '100%',
                  objectFit: 'cover',
                  borderRadius: isMobile ? '20px 20px 0 0' : '20px 0 0 20px',
                }}
              />
              {/* Gradient fade on mobile */}
              {isMobile && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    background: 'linear-gradient(transparent, #13131f)',
                    borderRadius: '0 0 0 0',
                  }}
                />
              )}
            </Box>

            {/* Details */}
            <Box sx={{ flex: 1, p: { xs: 2, sm: 3 }, minWidth: 0 }}>
              {/* Title row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    color: '#f0f0f5',
                    fontSize: { xs: '1.3rem', sm: '1.6rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {movie.Title}
                </Typography>
                <IconButton
                  onClick={() => onToggleFavorite(movie)}
                  sx={{
                    flexShrink: 0,
                    '&:hover': { transform: 'scale(1.15)' },
                    transition: 'transform 0.2s ease',
                  }}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 24 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#fff', fontSize: 24 }} />
                  )}
                </IconButton>
              </Box>

              {/* Meta chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {movie.Year && (
                  <Chip
                    icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
                    label={movie.Year}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#f5bc42', 0.12),
                      color: '#f5bc42',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                    label={movie.Runtime}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#fff', 0.06),
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.75rem',
                    }}
                  />
                )}
                {movie.Rated && movie.Rated !== 'N/A' && (
                  <Chip
                    label={movie.Rated}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#6c63ff', 0.15),
                      color: '#8b83ff',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
                {movie.Type && (
                  <Chip
                    icon={<TheatersIcon sx={{ fontSize: 14 }} />}
                    label={movie.Type}
                    size="small"
                    sx={{
                      backgroundColor: alpha('#2ecc71', 0.12),
                      color: '#2ecc71',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                    }}
                  />
                )}
              </Box>

              {/* Ratings */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ color: '#f5bc42', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: '#f5bc42', fontWeight: 700 }}>
                      {movie.imdbRating}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                      /10
                    </Typography>
                  </Box>
                )}
                {movie.Metascore && movie.Metascore !== 'N/A' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: parseInt(movie.Metascore) >= 60 ? '#2ecc71' : '#e74c3c',
                        fontWeight: 700,
                        backgroundColor: alpha(
                          parseInt(movie.Metascore) >= 60 ? '#2ecc71' : '#e74c3c',
                          0.12
                        ),
                        px: 1,
                        py: 0.2,
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                      }}
                    >
                      Metascore: {movie.Metascore}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Genre */}
              {movie.Genre && movie.Genre !== 'N/A' && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
                  {movie.Genre}
                </Typography>
              )}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1.5 }} />

              {/* Plot */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  {movie.Plot}
                </Typography>
              )}

              {/* Cast & Crew */}
              {movie.Actors && movie.Actors !== 'N/A' && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                    CAST
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                    {movie.Actors}
                  </Typography>
                </Box>
              )}
              {movie.Director && movie.Director !== 'N/A' && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                    DIRECTOR
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                    {movie.Director}
                  </Typography>
                </Box>
              )}
              {movie.Writer && movie.Writer !== 'N/A' && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                    WRITER
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>
                    {movie.Writer}
                  </Typography>
                </Box>
              )}

              {/* View full page */}
              <Button
                component={Link}
                to={`/movie/${movie.imdbID}`}
                onClick={onClose}
                variant="contained"
                sx={{ mt: 2 }}
              >
                View Full Details
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MovieModal;
