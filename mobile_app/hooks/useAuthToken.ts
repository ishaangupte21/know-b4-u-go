import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('@auth/token');
  } catch (err) {
    throw err;
  }
};

const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('@auth/token', token);
  } catch (err) {
    throw err;
  }
};

const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('@auth/token');
  } catch (err) {
    throw err;
  }
};

export const useAuthToken = (): {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
} => ({
  getToken,
  setToken,
  removeToken,
});
