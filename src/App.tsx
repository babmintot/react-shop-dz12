import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { List } from '@/pages/List';
import { Details } from '@/pages/Details';
import { About } from '@/pages/About';
import { Favorites } from '@/pages/Favorites';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;