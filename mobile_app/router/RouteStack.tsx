import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {RouteParamList} from './RouteParamList';
import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';

interface RouteStackProps {}

const Stack = createNativeStackNavigator<RouteParamList>();

const RouteStack: FC<RouteStackProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteStack;
