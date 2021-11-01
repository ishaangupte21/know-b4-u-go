import {useQuery} from 'react-query';
import {http} from '../http';
import {useAuthToken} from './useAuthToken';

const handleTripPrecaution = async (id: number) => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  const {
    data: {precaution},
  } = await http.get(`/trips/precaution/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return precaution;
};

export const useTripPrecaution = (id: number) =>
  useQuery<string, Error>(['precaution', id], () => handleTripPrecaution(id));
