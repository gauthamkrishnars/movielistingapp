import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TheatersIcon from '@mui/icons-material/Theaters';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import { fetchFromOMDb } from '../utils/fetchFromAPI';

const PLACEHOLDER_POSTER = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27600%27 viewBox=%270 0 400 600%27%3E%3Crect fill=%27%231a1a2e%27 width=%27400%27 height=%27600%27/%3E%3Ctext x=%27200%27 y=%27280%27 font-family=%27sans-serif%27 font-size=%2718%27 fill=%27%2355556a%27 text-anchor=%27middle%27%3ENo Poster%3C/text%3E%3Ctext x=%27200%27 y=%27320%27 font-family=%27sans-serif%27 font-size=%2750%27 fill=%27%23333350%27 text-anchor=%27middle%27%3E%F0%9F%8E%AC%3C/text%3E%3C/svg%3E';

const MovieDetail = ({ isFavorite, toggleFavorite }) => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFromOMDb({ i: id, plot: 'full' });
        setMovie(data);

        // Fetch related movies by genre
        if (data.Genre && data.Genre !== 'N/A') {
          const primaryGenre = data.Genre.split(',')[0].trim();
          try {
            const relatedData = await fetchFromOMDb({ s: primaryGenre, type: 'movie' });
            setRelatedMovies(
              (relatedData.Search || []).filter((m) => m.imdbID !== id).slice(0, 8)
            );
          } catch {
            setRelatedMovies([]);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box>
        <Loader type="single" />
        <Loader count={4} />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4" sx={{ color: '#f0f0f5', mb: 1 }}>
          Movie not found
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', mb: 3 }}>
          {error || 'We could not find this movie.'}
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Home
        </Button>
      </Box>
    );
  }

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;

  return (
    <Box>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          color: 'rgba(255,255,255,0.5)',
          mb: { xs: 2, md: 3 },
          textTransform: 'none',
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
          '&:hover': { color: '#f5bc42' },
        }}
      >
        Back
      </Button>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: { xs: 2, md: 3 } }}>
        {/* Poster */}
        <Box sx={{ width: isMobile ? '100%' : 320, flexShrink: 0 }}>
          <Box
            sx={{
              borderRadius: { xs: '16px', md: '20px' },
              overflow: 'hidden',
              boxShadow: '0 16px 64px rgba(0, 0, 0, 0.5)',
              aspectRatio: '2/3',
              backgroundColor: '#1a1a2e',
            }}
          >
            <Box
              component="img"
              src={posterUrl}
              alt={movie.Title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Title + Favorite */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                color: '#f0f0f5',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                lineHeight: 1.2,
              }}
            >
              {movie.Title}
            </Typography>
            <IconButton
              onClick={() => toggleFavorite(movie)}
              sx={{
                flexShrink: 0,
                '&:hover': { transform: 'scale(1.15)' },
                transition: 'transform 0.2s ease',
              }}
              aria-label={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(movie.imdbID) ? (
                <FavoriteIcon sx={{ color: '#e74c3c', fontSize: 28 }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#fff', fontSize: 28 }} />
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
                  textTransform: 'capitalize',
                }}
              />
            )}
          </Box>

          {/* Ratings */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon sx={{ color: '#f5bc42', fontSize: 22 }} />
                <Typography variant="h5" sx={{ color: '#f5bc42', fontWeight: 700 }}>
                  {movie.imdbRating}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                  /10
                </Typography>
                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', ml: 0.5 }}>
                    ({movie.imdbVotes} votes)
                  </Typography>
                )}
              </Box>
            )}
            {movie.Metascore && movie.Metascore !== 'N/A' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{
                    backgroundColor: parseInt(movie.Metascore) >= 60 ? alpha('#2ecc71', 0.15) : alpha('#e74c3c', 0.15),
                    color: parseInt(movie.Metascore) >= 60 ? '#2ecc71' : '#e74c3c',
                    px: 1.2,
                    py: 0.3,
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  Metascore: {movie.Metascore}
                </Box>
              </Box>
            )}
          </Box>

          {/* Genre */}
          {movie.Genre && movie.Genre !== 'N/A' && (
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2 }}>
              {movie.Genre}
            </Typography>
          )}

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 2 }} />

          {/* Plot */}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.5 }}>
                PLOT
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.8,
                }}
              >
                {movie.Plot}
              </Typography>
            </Box>
          )}

          {/* Cast & Crew */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            {movie.Actors && movie.Actors !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  CAST
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {movie.Actors}
                </Typography>
              </Box>
            )}
            {movie.Director && movie.Director !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  DIRECTOR
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {movie.Director}
                </Typography>
              </Box>
            )}
            {movie.Writer && movie.Writer !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  WRITER
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {movie.Writer}
                </Typography>
              </Box>
            )}
            {movie.Language && movie.Language !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  LANGUAGE
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {movie.Language}
                </Typography>
              </Box>
            )}
            {movie.Country && movie.Country !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  COUNTRY
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                  {movie.Country}
                </Typography>
              </Box>
            )}
            {movie.Awards && movie.Awards !== 'N/A' && (
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                  AWARDS
                </Typography>
                <Typography variant="body2" sx={{ color: '#f5bc42', fontWeight: 500 }}>
                  {movie.Awards}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Box Office */}
          {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', display: 'block', mb: 0.3 }}>
                BOX OFFICE
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                {movie.BoxOffice}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: '#f0f0f5',
              mb: 2.5,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            You Might Also Like
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            {relatedMovies.map((m) => (
              <MovieCard
                key={m.imdbID}
                movie={m}
                isFavorite={isFavorite(m.imdbID)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetail;
