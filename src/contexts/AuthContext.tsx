import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {UseMutateFunction, useMutation, useQuery} from '@tanstack/react-query';
import {getCurrentUser, signOut as apiSignOut} from '../api/auth';
import SecureStorage from 'react-native-fast-secure-storage';
import {AxiosResponse} from 'axios';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: UseMutateFunction<AxiosResponse>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStorage.getItem('Xanyah:Bearer');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  const {data, refetch, isLoading, isError} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!token,
  });

  const {mutate: signOut} = useMutation({
    mutationFn: async () => apiSignOut({token}),
    onError: error => {
      console.log(error);
    },
    onSuccess: async () => {
      await SecureStorage.removeItem('Xanyah:Bearer');
      setUser(null);
    },
  });

  const refetchUser = useCallback(async () => {
    try {
      const response = await refetch();
      if (response?.data) {
        setUser(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      await SecureStorage.removeItem('Xanyah:Bearer');
      setUser(null);
    }
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data, isLoading, signOut]);

  useEffect(() => {
    if (isError) {
      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signOut,
        refetchUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
