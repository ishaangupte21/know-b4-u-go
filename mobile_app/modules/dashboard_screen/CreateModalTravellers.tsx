import React, {useState} from 'react';
import {
  Text,
  View,
  ExpandableSection,
  ListItem,
  TextField,
} from 'react-native-ui-lib';

interface CreateModalTravellersProps {
  formik: any;
}

type TripTraveller = {
  firstName: string;
  lastName: string;
  age: number | null;
  isVaccinated: boolean;
};

const CreateModalTravellers: React.FC<CreateModalTravellersProps> = ({
  formik,
}) => {
  return (
    <View>
      <Text text60M center>
        Travellers
      </Text>
      {formik.values.travellers.map(
        (traveller: TripTraveller, index: number) => (
          <ListItem key={index}>
            <View width="100%">
              <Text text70M>Traveller #{index + 1}</Text>
              <TextField placeholder="First Name" floatingPlaceholder />
              <TextField placeholder="Last Name" floatingPlaceholder />
              <TextField placeholder="Age" floatingPlaceholder />
            </View>
          </ListItem>
        ),
      )}
    </View>
  );
};

export default CreateModalTravellers;
