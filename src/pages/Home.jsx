import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import { fetchFromOMDb } from '../utils/fetchFromAPI';

const SEARCH_TERMS = ['action', 'comedy', 'drama', 'sci-fi', 'horror', 'thriller', 'romance', 'adventure', 'animation', 'fantasy'];

const Home = ({ isFavorite, toggleFavorite }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch from multiple genres in parallel
        const results = await Promise.all(
          SEARCH_TERMS.map((term) =>
            fetchFromOMDb({ s: term, type: 'movie' }).catch(() => ({ Search: [] }))
          )
        );

        // Flatten and deduplicate by imdbID
        const allMovies = results.flatMap((r) => r.Search || []);
        const seen = new Set();
        const unique = allMovies.filter((m) => {
          if (seen.has(m.imdbID)) return false;
          seen.add(m.imdbID);
          return true;
        });

        setMovies(unique);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245,188,66,0.2) 0%, rgba(245,188,66,0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <WhatshotIcon sx={{ color: '#f5bc42', fontSize: { xs: 20, sm: 24 } }} />
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
            Trending Movies
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.4)', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}
          >
            Popular films right now
          </Typography>
        </Box>
      </Box>

      {/* Error */}
      {error && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: '#e74c3c', mb: 1 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {error}
          </Typography>
        </Box>
      )}

      {/* Grid */}
      {loading ? (
        <Loader count={20} />
      ) : (
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
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie.imdbID)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </Box>
      )}

      {/* Quick Modal */}
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

export default Home;
