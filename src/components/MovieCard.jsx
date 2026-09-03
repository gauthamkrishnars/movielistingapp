import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PLACEHOLDER_POSTER = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27450%27 viewBox=%270 0 300 450%27%3E%3Crect fill=%27%231a1a2e%27 width=%27300%27 height=%27450%27/%3E%3Ctext x=%27150%27 y=%27210%27 font-family=%27sans-serif%27 font-size=%2716%27 fill=%27%2355556a%27 text-anchor=%27middle%27%3ENo Poster%3C/text%3E%3Ctext x=%27150%27 y=%27240%27 font-family=%27sans-serif%27 font-size=%2740%27 fill=%27%23333350%27 text-anchor=%27middle%27%3E%F0%9F%8E%AC%3C/text%3E%3C/svg%3E';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  if (!movie) return null;

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;

  return (
    <Card
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          '& .poster-img': {
            transform: 'scale(1.05)',
          },
          '& .card-overlay': {
            opacity: 1,
          },
          '& .favorite-btn': {
            opacity: 1,
          },
        },
      }}
    >
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
        {/* Poster */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#1a1a2e',
            aspectRatio: '2/3',
          }}
        >
          <CardMedia
            component="img"
            image={posterUrl}
            alt={movie.Title || 'Movie poster'}
            className="poster-img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Gradient overlay on hover */}
          <Box
            className="card-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,10,18,0.95) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'flex-end',
              p: 1.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#f5bc42',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem',
              }}
            >
              View Details
            </Typography>
          </Box>

          {/* Favorite button */}
          <IconButton
            className="favorite-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              opacity: isFavorite ? 1 : 0,
              backgroundColor: alpha('#000', 0.6),
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: alpha('#e74c3c', 0.3),
                transform: 'scale(1.1)',
              },
              transition: 'all 0.25s ease',
              p: 0.8,
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ fontSize: 18, color: '#e74c3c' }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18, color: '#fff' }} />
            )}
          </IconButton>

          {/* Year badge */}
          {movie.Year && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: alpha('#000', 0.7),
                backdropFilter: 'blur(8px)',
                px: 1,
                py: 0.3,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.4,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 11, color: '#f5bc42' }} />
              <Typography
                variant="caption"
                sx={{ color: '#fff', fontWeight: 600, fontSize: '0.7rem' }}
              >
                {movie.Year}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            px: 0.5,
            pt: 1.2,
            pb: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: '#f0f0f5',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              mb: 0.3,
            }}
          >
            {movie.Title || 'Untitled'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {movie.Type && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'capitalize',
                  fontSize: '0.7rem',
                }}
              >
                {movie.Type}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

export const MovieCardSkeleton = () => (
  <Box>
    <Box
      sx={{
        width: '100%',
        aspectRatio: '2/3',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.05)',
      }}
    />
    <Box sx={{ height: 20, mt: 1, width: '80%', borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
    <Box sx={{ height: 16, mt: 0.5, width: '50%', borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.04)' }} />
  </Box>
);

export default MovieCard;
