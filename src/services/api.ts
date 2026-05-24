// src/services/api.ts
import type { Product } from '../types';

// Используем публичный API для демонстрации (FakeStoreAPI)
// Если у тебя есть свой URL с курса, замени эту строку:
const API_URL = 'https://fakestoreapi.com/products';

// Функция для получения списка всех товаров
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  
  // Обработка ошибок (если сервер вернул 404 или 500)
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  
  return response.json();
};

// Функция для получения одного товара по ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Товар не найден: ${response.status}`);
  }
  
  return response.json();
};