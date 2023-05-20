import React, { createContext, useContext, useEffect, useState } from 'react';
import { userInt } from '../utils/interfaces';
import axiosInstance from '../utils/axiosConfig';


// Define the shape of the authentication context
interface AuthContextType {
  user: userInt | null;
  login: (userData: userInt) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the authentication context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap the application with the authentication context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userInt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/api/user', {
          withCredentials: true,
        });

        const { data: { user } } = response
        setUser(user)
        
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: userInt) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
    loading,
    setLoading, // Include the loading state in the context value
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
