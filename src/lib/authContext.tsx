import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, ADMIN_EMAIL } from './mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
    setUser({
      email,
      name: isAdmin ? 'JC Esperanza' : email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
