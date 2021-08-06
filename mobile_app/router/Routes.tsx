import React, {FC} from 'react';
import 'react-native-safe-area-context';
import {useAuth} from '../hooks/useAuth';
import {ActivityIndicator} from 'react-native';
import RouteStack from './RouteStack';
import AuthScreen from '../modules/auth_screen/AuthScreen';

const Routes: FC<{}> = () => {
  const {isLoading, user} = useAuth();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return user ? <RouteStack /> : <AuthScreen />;
};

export default Routes;
