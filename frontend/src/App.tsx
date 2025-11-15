import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ItemPage from './components/item/ItemPage';
import StatsPage from './components/stats/StatsPage';
import ListPage from './components/list/ListPage';
import NotFound from './components/not-found/NotFoud';

function App() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5">Avito Mod Desk</Typography>
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
