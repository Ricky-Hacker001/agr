import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { initAuth } from './services/authService';

function App() {
  useEffect(() => {
    // Initialize auth token on app load (important for refresh)
    initAuth();
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;