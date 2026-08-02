import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nuthelabel_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const login = (email, password) => {
    // MOCK AUTH ONLY
    // Replace with real authentication service in production.
    const mockUser = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      joinedDate: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('nuthelabel_user', JSON.stringify(mockUser));
    showNotification(`Welcome back, ${mockUser.name}!`);
    return true;
  };

  const register = (userData) => {
    // MOCK AUTH ONLY
    // Replace with real authentication service in production.
    const newUser = {
      id: 'user-' + Date.now(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('nuthelabel_user', JSON.stringify(newUser));
    showNotification(`Account created successfully! Welcome to nuthelabel.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nuthelabel_user');
    showNotification('You have signed out.', 'info');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      notification,
      showNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
