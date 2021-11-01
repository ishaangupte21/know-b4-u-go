import {
  faCar,
  faPlane,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Colors, ListItem, Text} from 'react-native-ui-lib';
import {TravelMethod, Trip} from '../../QueryTypes';
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
        <ListItem.Part left column>
          {trip.travelMethod.toString() === 'AIR' ? (
            <FontAwesomeIcon icon={faPlaneDeparture} size={22} color={Colors.blue10} />
          ) : (
            <FontAwesomeIcon icon={faCar} size={22} color={Colors.purple20} />
          )}
        </ListItem.Part>
        <ListItem.Part middle column marginL-8>
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
