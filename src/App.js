import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchFeed from './pages/SearchFeed';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            favoriteCount={favorites.length}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          <Box sx={{ display: 'flex', flex: 1, pt: '64px' }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <Box
              component="main"
              sx={{
                flex: 1,
                ml: { xs: 0, md: sidebarOpen ? '240px' : '64px' },
                transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: 'calc(100vh - 64px)',
                p: { xs: 1, sm: 1.5, md: 2.5, lg: 3 },
                width: { xs: '100%', md: 'auto' },
                overflow: 'hidden',
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
                />
                <Route
                  path="/search/:searchTerm"
                  element={<SearchFeed isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
                />
                <Route
                  path="/movie/:id"
                  element={<MovieDetail isFavorite={isFavorite} toggleFavorite={toggleFavorite} />}
                />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      favorites={favorites}
                      isFavorite={isFavorite}
                      toggleFavorite={toggleFavorite}
                    />
                  }
                />
              </Routes>
            </Box>
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
