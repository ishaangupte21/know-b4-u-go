import React, {FC} from 'react';
import 'react-native-safe-area-context';
import {useAuth} from '../hooks/useAuth';
import {ActivityIndicator, View} from 'react-native';
import RouteStack from './RouteStack';
import AuthScreen from '../modules/auth_screen/AuthScreen';
import tailwind from 'tailwind-rn';

const Routes: FC<{}> = () => {
  const {isLoading, user} = useAuth();
  if (isLoading) {
    return (
      <View style={tailwind('flex justify-center items-center')}>
        <ActivityIndicator />
      </View>
    );
  }

  return user ? <RouteStack /> : <AuthScreen />;
};

export default Routes;
