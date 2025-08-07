import HomePage from './pages/HomePage';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}

export default App
