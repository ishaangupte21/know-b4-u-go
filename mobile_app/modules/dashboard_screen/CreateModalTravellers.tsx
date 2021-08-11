import React from 'react';
import {Text, View} from 'react-native-ui-lib';

interface CreateModalTravellersProps {
  formik: any;
}

const CreateModalTravellers: React.FC<CreateModalTravellersProps> = () => {
  return (
    <View>
      <Text text60M center>
        Travellers
      </Text>
    </View>
  );
};

export default CreateModalTravellers;
