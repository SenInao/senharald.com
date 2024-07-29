import { createContext, useState, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import { checkLogin } from './components/checkLogin';

axios.defaults.withCredentials = true;

interface User {
  fullname: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
  loading: boolean
  setUser: (value: User | null) => void,
  setLoggedIn: (value: boolean) => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    checkLogin().then(result => {
      if (result.success) {
        setUser(result.user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      };
      setLoading(false)
    });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, setLoggedIn, setUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
