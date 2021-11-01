import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {Card, Colors, Text, View} from 'react-native-ui-lib';

interface ImmigrationInfoProps {}

const ImmigrationInfo: FC<ImmigrationInfoProps> = () => {
  return (
    <>
      <Card marginH-16 paddingB-24 paddingH-20 marginT-12 paddingV-10>
        <Text text70M>Immigration Information</Text>
        <View marginT-4 style={{display: 'flex'}}>
          <FontAwesomeIcon icon={faExclamationCircle} color={Colors.orange30} />
          <Text orange30>
            A Negative COVID-19 Test may be Required to enter this Country
          </Text>
        </View>
        <Text marginT-4>You may need a Visa to travel to this Destination</Text>
        <Text marginT-4>
          The Department of State encourages you to check with the Embassy of
          your Destination for any Travel Restrictions
        </Text>
      </Card>
    </>
  );
};

export default ImmigrationInfo;
