import { useState } from 'react';
import Cookies from 'js-cookie';

// Хук useAuth
const useAuth = () => {
  const [token, setAuthToken] = useState<string | null>(Cookies.get('token') || null);

  const setToken = (newToken: string) => {
    Cookies.set('token', newToken, { secure: true, sameSite: 'strict' });
    setAuthToken(newToken); // Обновляем локальное состояние токена
  };

  const clearToken = () => {
    Cookies.remove('token');
    setAuthToken(null); // Очищаем локальное состояние токена
  };

  return {
    token,       // Возвращаем текущий токен
    setToken,    // Функция для установки токена
    clearToken,  // Функция для удаления токена
  };
};

export default useAuth;