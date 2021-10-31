import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Colors, ListItem, Text} from 'react-native-ui-lib';
import {Trip} from '../../QueryTypes';
import {RouteParamList} from '../../router/RouteParamList';

const TripPanel: FC<{
  trip: Trip;
  navigation: NativeStackNavigationProp<RouteParamList, 'Dashboard'>;
}> = ({trip, navigation}) => {
  return (
    <>
      <ListItem
        paddingH-14
        onPress={() =>
          navigation.navigate('TripScreen', {
            tripId: trip.id,
            tripName: `Trip to ${trip.travelDestination}`,
          })
        }>
        <ListItem.Part left></ListItem.Part>
        <ListItem.Part middle column>
          <Text text70M>Trip to {trip.travelDestination}</Text>
        </ListItem.Part>
        <ListItem.Part right>
          <Text>{new Date(trip.travelDate).toLocaleDateString()}</Text>
        </ListItem.Part>
      </ListItem>
    </>
  );
};

export default TripPanel;
