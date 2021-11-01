import React, {FC, MutableRefObject, useRef} from 'react';
import {
  Button,
  ButtonSize,
  Card,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';
import {useCreateFlight} from '../../hooks/useCreateFlight';
import {useSingleTrip} from '../../hooks/useSingleTrip';

interface AirTravelInfoProps {
  id: number;
}

const AirTravelInfo: FC<AirTravelInfoProps> = ({id}) => {
  const {data} = useSingleTrip(id);
  const inputRef: MutableRefObject<any> | null = useRef(null);
  const airMutation = useCreateFlight();

  const handleClick = () => {

    airMutation.mutate({
      id,
      code: inputRef!.current.state.value,
    });
  };

  return (
    <>
      <Card marginH-16 paddingH-20 marginT-12 paddingV-10>
        <Text text70M>Air Travel Info</Text>
        {!data?.airInfo ? (
          <View>
            <TextField
              placeholder="Flight Number"
              floatingPlaceholder
              ref={inputRef}
            />
            <Button
              onPress={() => handleClick()}
              size={Button.sizes.small}
              label="Add Flight"
            />
          </View>
        ) : (
            <View>
                <Text>Flight Number: {data.airInfo.flCode}</Text>
                <Text marginT-4>Departure: {data.airInfo.depCode} at {data.airInfo.depTime.split('+')[0]}</Text>
                <Text marginT-4>Arrival: {data.airInfo.arrCode} at {data.airInfo.depTime.split('+')[0]}</Text>
            </View>
        )}
      </Card>
    </>
  );
};

export default AirTravelInfo;
