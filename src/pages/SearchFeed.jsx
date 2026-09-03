import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import Loader from '../components/Loader';
import { fetchFromOMDb } from '../utils/fetchFromAPI';

const SearchFeed = ({ isFavorite, toggleFavorite }) => {
  const { searchTerm } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFromOMDb({ s: searchTerm, type: 'movie' });
        setMovies(data.Search || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) fetchResults();
  }, [searchTerm]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: { xs: 20, sm: 24 } }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              color: '#f0f0f5',
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Results for{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #f5bc42 0%, #ffd97a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              &quot;{searchTerm}&quot;
            </Box>
          </Typography>
          {!loading && !error && (
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
              {movies.length} results found
            </Typography>
          )}
        </Box>
      </Box>

      {/* Loading */}
      {loading && <Loader count={10} />}

      {/* Error */}
      {error && !loading && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <SearchIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#f0f0f5',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mb: 1,
            }}
          >
            No results found
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', px: 2 }}>
            Try a different search term or check your spelling
          </Typography>
        </Box>
      )}

      {/* Results Grid */}
      {!loading && !error && movies.length > 0 && (
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

export default SearchFeed;
