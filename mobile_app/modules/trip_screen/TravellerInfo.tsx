import {faCheck, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useEffect, useState} from 'react';
import {Card, Chip, Colors, Text, View} from 'react-native-ui-lib';
import {useSingleTrip} from '../../hooks/useSingleTrip';

interface TravellerInfoProps {
  id: number;
}

const TravellerInfo: FC<TravellerInfoProps> = ({id}) => {
  const [containsUnvaccinated, setContainsUnvaccinated] =
    useState<boolean>(false);
  const {data, isLoading} = useSingleTrip(id);

  useEffect(() => {
    for (let i = 0; i < data!.travellers.length; i++) {
      console.log(`vaccinated: ${data?.travellers[i].vaccinated}`);
      if (!data?.travellers[i].vaccinated) {
        setContainsUnvaccinated(true);
        break;
      }
    }
  }, []);

  return (
    <>
      <Card marginH-16 paddingH-20 marginT-12 paddingV-10>
        <Text text70M>Traveller Information</Text>
        {containsUnvaccinated ? (
          <View marginT-4 marginB-4>
            <FontAwesomeIcon icon={faExclamationCircle} color={Colors.red20} />
            <Text red20>
              There are Unvaccinated Travellers on this trip. The CDC encourages
              you to wear a mask over your nose and mouth and take a COVID-19
              Test upon arrival.
            </Text>
          </View>
        ) : null}
        {data?.travellers.map((traveller, index) => (
          <>
            <Text style={{position: 'relative'}}>
              {index + 1}. {traveller.name}, {traveller.age}
              <View style={{position: 'relative'}}>
                {traveller.vaccinated ? (
                  <Chip
                    labelStyle={{color: Colors.white}}
                    containerStyle={{
                      borderColor: Colors.green30,
                    }}
                    label="Vaccinated"
                    backgroundColor={Colors.green30}
                  />
                ) : (
                  <Chip
                    labelStyle={{color: Colors.white}}
                    label="Not Vaccinated"
                    backgroundColor={Colors.red20}
                    containerStyle={{
                      borderColor: Colors.red20,
                    }}
                  />
                )}
              </View>
            </Text>
          </>
        ))}
      </Card>
    </>
  );
};

export default TravellerInfo;
