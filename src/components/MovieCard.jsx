import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Skeleton,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/300x450/1a1a2e/55556a?text=No+Poster';

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
              View Details →
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
    <Skeleton
      variant="rounded"
      sx={{
        width: '100%',
        aspectRatio: '2/3',
        borderRadius: '12px',
        bgcolor: 'rgba(255,255,255,0.05)',
      }}
    />
    <Skeleton
      variant="text"
      sx={{ bgcolor: 'rgba(255,255,255,0.06)', width: '80%', mt: 1 }}
      height={20}
    />
    <Skeleton
      variant="text"
      sx={{ bgcolor: 'rgba(255,255,255,0.04)', width: '50%' }}
      height={16}
    />
  </Box>
);

export default MovieCard;
