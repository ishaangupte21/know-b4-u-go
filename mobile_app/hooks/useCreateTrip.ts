import {useMutation, UseMutationResult} from 'react-query';
import {http} from '../http';
import {Trip} from '../QueryTypes';
import {useAuthToken} from './useAuthToken';

export type TripTraveller = {
  firstName: string;
  lastName: string;
  age: string;
  isVaccinated: boolean;
};

export interface TripCreate {
  origin: string;
  destination: {
    label: string;
    value: string;
  };
  date: number | null;
  travelMethod: {
    label: 'Air' | 'Road';
    value: 'AIR' | 'ROAD';
  };
  travellers: TripTraveller[];
}

const handleCreateTrip = async (tripCreate: TripCreate): Promise<Trip> => {
  const {getToken} = useAuthToken();
  const token = await getToken();
  console.log(`tripCreate:`, tripCreate);

  const travelDate = new Date(tripCreate.date!);

  const {
    data: {createdTrip},
  }: {
    data: {
      createdTrip: Trip;
    };
  } = await http.post(
    '/trips/create',
    {
      body: tripCreate,
      vaxList: tripCreate.travellers.map(traveller => traveller.isVaccinated),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return createdTrip;
};

export const useCreateTrip = (): UseMutationResult<Trip, Error, TripCreate> =>
  useMutation<Trip, Error, TripCreate>(handleCreateTrip, {
    onError: (err: Error) => console.error(err),
    onSuccess: (data: Trip) => {
      console.log(data);
    },
  });
