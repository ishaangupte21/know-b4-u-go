import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Colors, LoaderScreen, Text, View} from 'react-native-ui-lib';
import {useCovidData} from '../../hooks/useCovidData';
import {useSingleTrip} from '../../hooks/useSingleTrip';
import {useTripPrecaution} from '../../hooks/useTripPrecaution';
import AirTravelInfo from '../../modules/trip_screen/AirInfo';
import ImmigrationInfo from '../../modules/trip_screen/ImmigrationInfo';
import TravellerInfo from '../../modules/trip_screen/TravellerInfo';
import {RouteParamList} from '../RouteParamList';

interface TripScreenProps {
  navigation: NativeStackNavigationProp<RouteParamList, 'TripScreen'>;
  route: RouteProp<RouteParamList, 'TripScreen'>;
}

const TripScreen: FC<TripScreenProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({title: route.params.tripName});
  }, []);
  const {data, isLoading} = useSingleTrip(route.params.tripId);
  const {data: precaution, isLoading: precautionLoading} = useTripPrecaution(
    route.params.tripId,
  );
  const {data: covidData, isLoading: covidDataLoading} = useCovidData(
    route.params.tripId,
  );
  return isLoading || precautionLoading || covidDataLoading ? (
    <LoaderScreen />
  ) : (
    <>
      <ScrollView>
        <Text center text40M marginT-22>
          {route.params.tripName}
        </Text>
        <Text center text60L>
          On {new Date(data!.travelDate).toLocaleDateString()}
        </Text>
        <View marginT-10 paddingH-20></View>
        <Card marginH-16 paddingH-20 marginT-12 paddingV-10>
          <Text text70M>COVID-19 Information</Text>
          <View marginT-4>
            <Text
              yellow20={
                precaution?.startsWith('Level 1') ||
                precaution?.startsWith('Level 2')
              }
              red30={
                precaution?.startsWith('Level 3') ||
                precaution?.startsWith('Level 4') ||
                precaution?.startsWith('Level 5')
              }
              text80M
              center>
              CDC Advisory: {precaution}
            </Text>
            <Text marginT-6>
              Confirmed Cases in {covidData!.name}: {covidData!.confirmed}
            </Text>
            <Text marginT-4>
              Confirmed Deaths in {covidData!.name}: {covidData!.deaths}
            </Text>
            <Text marginT-4>
              Mortality Rate in {covidData!.name}: {covidData!.mortalityRate}
            </Text>
            <View marginT-4>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                color={Colors.orange30}
              />
              <Text orange30>
                The CDC Recommends Vaccination for all Travellers
              </Text>
            </View>
          </View>
        </Card>
        <ImmigrationInfo />
        <TravellerInfo id={route.params.tripId} />
        {data?.travelMethod.toString() === 'AIR' ? (
          <AirTravelInfo id={route.params.tripId} />
        ) : null}
      </ScrollView>
    </>
  );
};

export default TripScreen;
