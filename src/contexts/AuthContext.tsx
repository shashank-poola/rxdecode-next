
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logoutSession, loginWithPassword, registerWithPassword } from '@/lib/server-api';

interface User {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (me) setUser(me);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const me = await loginWithPassword(email, password);
    setUser(me);
  };

  const register = async (name: string, email: string, password: string) => {
    const me = await registerWithPassword(name, email, password);
    setUser(me);
  };

  const logout = () => {
    logoutSession().finally(() => setUser(null));
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
