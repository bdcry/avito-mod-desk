import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { AppBar, Container, Toolbar, Typography, Button, Stack } from '@mui/material';
import ItemPage from './components/item/ItemPage';
import StatsPage from './components/stats/StatsPage';
import ListPage from './components/list/ListPage';
import NotFound from './components/not-found/NotFoud';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography variant="h5">Avito Mod Desk</Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" onClick={() => navigate('/list')}>
                Список
              </Button>
              <Button color="inherit" onClick={() => navigate('/stats')}>
                Статистика
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5, mb: 5 }}>
        <Routes>
          {/* Redirect from / to /list */}
          <Route path="/" element={<Navigate to="/list" replace />} />

          {/* Pages */}
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/stats" element={<StatsPage />} />

          {/* 404 page */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
