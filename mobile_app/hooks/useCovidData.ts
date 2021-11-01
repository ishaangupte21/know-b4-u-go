import {useQuery} from 'react-query';
import {http} from '../http';
import {useAuthToken} from './useAuthToken';

const handleCovidData = async (id: number) => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  const {
    data: {covidData},
  } = await http.get(`/trips/covid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    name: covidData.name,
    confirmed: covidData.confirmed,
    deaths: covidData.deaths,
    mortalityRate: covidData.mortalityRate,
  };
};

export const useCovidData = (id: number) =>
  useQuery<
    {name: string; confirmed: number; deaths: number; mortalityRate: number},
    Error
  >(['covidData', id], () => handleCovidData(id));
