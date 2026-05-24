/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';

// 1. Определяем тип значения, которое будет предоставлять контекст
interface AppContextType {
  productsCache: Product[];               // Кэш товаров (чтобы не грузить повторно)
  setProductsCache: (products: Product[]) => void;
  favorites: number[];                    // Массив ID избранных товаров
  toggleFavorite: (id: number) => void;   // Добавить/удалить из избранного
  isFavorite: (id: number) => boolean;    // Проверить, в избранном ли товар
}

// 2. Создаём сам контекст (пока пустой, значение undefined)
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Провайдер — компонент, который оборачивает приложение и раздаёт данные
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Загружаем избранное из localStorage при старте
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Кэш товаров (изначально пустой)
  const [productsCache, setProductsCache] = useState<Product[]>([]);

  // Сохраняем избранное в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Функция: добавить или удалить товар из избранного
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)  // Если уже есть → убрать
        : [...prev, id]                       // Если нет → добавить
    );
  };

  // Функция: проверить, в избранном ли товар
  const isFavorite = (id: number) => favorites.includes(id);

  // Предоставляем данные всем компонентам внутри провайдера
  return (
    <AppContext.Provider value={{
      productsCache,
      setProductsCache,
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};

// 4. Хук для удобного использования контекста в компонентах
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp должен использоваться внутри AppProvider');
  }
  return context;
};