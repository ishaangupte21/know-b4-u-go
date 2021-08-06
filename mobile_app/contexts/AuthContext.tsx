import {AxiosResponse} from 'axios';
import React from 'react';
import {createContext, FC, useEffect, useState} from 'react';
import {useAuthToken} from '../hooks/useAuthToken';
import {http} from '../http';

type User = null | {firstName: string};

export const AuthContext = createContext<{
  user: User;
  isLoading: boolean;
  googleLogin: (googleToken: string) => Promise<AxiosResponse<any>> | void;
  logOut: () => void;
  refetchUser: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  googleLogin: (googleToken: string) => {},
  logOut: () => {},
  refetchUser: async () => {},
});

interface AuthProviderProps {}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {getToken, setToken, removeToken} = useAuthToken();

  const googleLogin = (googleToken: string) =>
    http.post('/auth/google', {googleToken});

  const logOut = () => removeToken();

  const getUser = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setUser(null);
        return setIsLoading(false);
      }
      const {data} = await http.get('/auth/user', {
        headers: {authorization: `Bearer ${token}`},
      });
      setUser(data.user);
      console.log(data.user);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        googleLogin,
        logOut,
        refetchUser: () => getUser(),
      }}>
      {children}
    </AuthContext.Provider>
  );
};
