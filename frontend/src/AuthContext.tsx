import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface User {
  fullname: string;
  username: string;
}

interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/user/');
        if (response.data.loggedIn) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session status', error);
        setLoggedIn(false);
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
