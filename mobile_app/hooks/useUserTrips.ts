import {useQuery} from 'react-query';
import {http} from '../http';
import {Trip} from '../QueryTypes';
import {useAuthToken} from './useAuthToken';

const getTrips = async () => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  const {
    data: {trips},
  } = await http.get('/trips', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  trips.sort(
    (first: Trip, second: Trip) => first.travelDate > second.travelDate,
  );
  console.log(trips);
  return trips;
};

export const useUserTrips = () => useQuery<Trip[], Error>('trips', getTrips);
