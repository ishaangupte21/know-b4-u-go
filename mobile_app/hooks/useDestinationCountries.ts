import {useQuery} from 'react-query';
import {http} from '../http';
import {useAuthToken} from './useAuthToken';

const getDestinationCountries = async () => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  const {
    data: {countries},
  } = await http.get('/trips/countries', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  countries.sort();
  return countries.map((country: string) => country.trim());
};

export const useDestinationCountries = () =>
  useQuery<string[], Error>('destinationCountries', getDestinationCountries);
