import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, alpha } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Favorites = ({ favorites, isFavorite, toggleFavorite }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(231,76,60,0.2) 0%, rgba(231,76,60,0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FavoriteIcon sx={{ color: '#e74c3c', fontSize: { xs: 20, sm: 24 } }} />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              color: '#f0f0f5',
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
            }}
          >
            My Favorites
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
          </Typography>
        </Box>
      </Box>

      {/* Empty State */}
      {favorites.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 10,
            gap: 2,
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 72, color: 'rgba(255,255,255,0.08)' }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#f0f0f5',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            No favorites yet
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', px: 2, maxWidth: 400 }}>
            Tap the heart icon on any movie card to save it here. Your favorites are stored locally in your browser.
          </Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 1 }}>
            Browse Movies
          </Button>
        </Box>
      )}

      {/* Grid */}
      {favorites.length > 0 && (
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
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie.imdbID)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </Box>
      )}

      {/* Modal */}
      {selectedMovie && (
        <MovieModal
          imdbID={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </Box>
  );
};

export default Favorites;
