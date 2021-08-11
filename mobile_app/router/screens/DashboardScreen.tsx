import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import { SafeAreaView, ActivityIndicator, View} from 'react-native';
import { Text } from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import {useUserTrips} from '../../hooks/useUserTrips';
import CreateButton from '../../modules/dashboard_screen/CreateButton';
import CreateTripModal from '../../modules/dashboard_screen/CreateTripModal';
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
        <ActivityIndicator size="large" />
      ) : (
        <View style={tailwind('h-full')}>
          {data!.length > 0 ? null : (
            <View style={tailwind('mt-8 px-4')}>
              <Text text50M center> 
                You do not have any trips.
              </Text>
              <Text text50M marginT-10 center>
                You can create one to access its data.
              </Text>
            </View>
          )}
          <CreateButton onClick={() => setCreateModal(true)} />
          <CreateTripModal open={createModal} onClose={() => setCreateModal(false)} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
