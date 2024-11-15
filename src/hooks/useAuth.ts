import { useState, useEffect } from 'react';

const useAuth = () => {
  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Считываем токен из localStorage при загрузке
    const storedToken = localStorage.getItem('token');
    setAuthToken(storedToken);
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken); // Сохраняем токен в localStorage
    setAuthToken(newToken); // Обновляем локальное состояние токена
  };

  const clearToken = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    setAuthToken(null); // Очищаем локальное состояние токена
  };

  return {
    token,       // Возвращаем текущий токен
    setToken,    // Функция для установки токена
    clearToken,  // Функция для удаления токена
  };
};

export default useAuth;
