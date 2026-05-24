import { NavLink } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

export const Navbar = () => {
  const { favorites } = useApp();

  // Стиль для активной ссылки
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#2563eb' : 'inherit',
    textDecoration: 'none',
    padding: '0.5rem'
  });

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '1rem', 
      padding: '1rem', 
      background: '#f3f4f6',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <NavLink to="/" style={linkStyle}>Главная</NavLink>
      <NavLink to="/list" style={linkStyle}>Каталог</NavLink>
      <NavLink to="/about" style={linkStyle}>О нас</NavLink>
      <NavLink to="/favorites" style={linkStyle}>
      🔖 Закладки ({favorites.length})
      </NavLink>
    </nav>
  );
};