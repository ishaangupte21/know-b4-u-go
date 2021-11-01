import {QueryKey, useQuery} from 'react-query';
import {http} from '../http';
import {Trip} from '../QueryTypes';
import {useAuthToken} from './useAuthToken';

const handleSingleTrip = async (id: number) => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  const {
    data: {trip},
  } = await http.get(`/trips/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`trip with id ${id}`, trip);
  return trip;
};

export const useSingleTrip = (id: number) =>
  useQuery<Trip, Error>(['singleTrip', id], () => handleSingleTrip(id));
