import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {RouteParamList} from '../RouteParamList';

const DashboardScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RouteParamList, 'Dashboard'>;
}) => {
  return (
    <SafeAreaView>
      <Text>This is the Dashboard Screen</Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;
