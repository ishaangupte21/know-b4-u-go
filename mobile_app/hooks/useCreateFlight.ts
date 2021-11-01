import {useMutation, UseMutationResult} from 'react-query';
import {http} from '../http';
import {AirInfo} from '../QueryTypes';
import {useAuthToken} from './useAuthToken';

const handleCreateFlight = async ({code, id}: {code: string; id: number}) => {
  const {getToken} = useAuthToken();
  const token = await getToken();

  const {
    data: {airInfo},
  } = await http.post(
    `/trips/aircraft/${id}`,
    {
      flightCode: code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return airInfo;
};

export const useCreateFlight = (): UseMutationResult<
  AirInfo,
  Error,
  {code: string; id: number}
> =>
  useMutation<AirInfo, Error, {code: string; id: number}>(handleCreateFlight, {
    onError: (err: Error) => console.error(err),
    onSuccess: (data: AirInfo) => {
      console.log(data);
    },
  });
