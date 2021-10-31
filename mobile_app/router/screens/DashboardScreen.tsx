import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {LoaderScreen, Text, View} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import {useUserTrips} from '../../hooks/useUserTrips';
import CreateButton from '../../modules/dashboard_screen/CreateButton';
import CreateTripModal from '../../modules/dashboard_screen/CreateTripModal';
import TripPanel from '../../modules/dashboard_screen/TripPanel';
import {RouteParamList} from '../RouteParamList';

interface DashboardScreenProps {
  navigation: NativeStackNavigationProp<RouteParamList, 'Dashboard'>;
}

const DashboardScreen: FC<DashboardScreenProps> = ({navigation}) => {
  const {data, isLoading} = useUserTrips();
  const [createModal, setCreateModal] = useState<boolean>(false);
  return (
    <SafeAreaView
      style={tailwind(
        `w-full h-full ${isLoading ? 'flex justify-center items-center' : ''}`,
      )}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <View height="100%" paddingT-30 paddingH-18>
          {data!.length > 0 ? (
            <View>
              <Text text40M center>
                Upcoming Trips
              </Text>
              <FlatList
                style={{marginTop: '8%'}}
                data={data}
                renderItem={({item}) => (
                  <TripPanel navigation={navigation} trip={item} />
                )}
              />
            </View>
          ) : (
            <View>
              <Text text50M center>
                You do not have any trips.
              </Text>
              <Text text50M marginT-10 center>
                You can create one to access its data.
              </Text>
            </View>
          )}
          <CreateButton onClick={() => setCreateModal(true)} />
          <CreateTripModal
            open={createModal}
            onClose={() => setCreateModal(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
