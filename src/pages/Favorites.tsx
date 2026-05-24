// src/pages/Favorites.tsx
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favorites, productsCache } = useApp();

  // ✅ filter работает: favorites — string[], product.id — string
  const favProducts = productsCache.filter(product => favorites.includes(product.id));

  if (favProducts.length === 0) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h1>🔖 Мои закладки</h1>
        <p>Здесь пока пусто. Добавьте фильмы из каталога!</p>
        <Link to="/list" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>
        🔖 Закладки ({favProducts.length})
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {favProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};