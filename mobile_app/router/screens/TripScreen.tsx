import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {Text} from 'react-native-ui-lib';
import {RouteParamList} from '../RouteParamList';

interface TripScreenProps {
  navigation: NativeStackNavigationProp<RouteParamList, 'TripScreen'>;
  route: RouteProp<RouteParamList, 'TripScreen'>;
}

const TripScreen: FC<TripScreenProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({title: route.params.tripName});
  }, []);
  return (
    <>
      <Text>{route.params.tripId}</Text>
    </>
  );
};

export default TripScreen;
