import React, {useState} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Text,
  View,
  ListItem,
  TextField,
  Colors,
  Button,
  ButtonSize,
  BorderRadiuses,
} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';

interface CreateModalTravellersProps {
  formik: any;
}

type TripTraveller = {
  firstName: string;
  lastName: string;
  age: string;
  isVaccinated: boolean;
};

const RenderItem: React.FC<{
  traveller: TripTraveller;
  index: number;
  formik: any;
}> = ({traveller, index, formik}) => {
  const removeTraveller = (): void => {
    const travellers: TripTraveller[] = formik.values.travellers;
    if (travellers.length === 1) return;
    travellers.splice(index, 1);
    formik.setFieldValue('travellers', travellers);
  };
  return (
    <ListItem height="50px">
      <View width="100%">
        <View style={tailwind('flex flex-row items-center')}>
          <Text text70M>Traveller #{index + 1}</Text>
          <Button
            color={Colors.blue10}
            outlineColor={Colors.blue10}
            outline
            iconSource={() => (
              <FontAwesome5 name="times" style={{color: Colors.blue10}} />
            )}
            style={tailwind('w-4 h-4 ml-3')}
            onPress={removeTraveller}
          />
        </View>
        <TextField
          placeholder="First Name"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
        />
        <TextField
          placeholder="Last Name"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
        />
        <TextField
          placeholder="Age"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
        />
      </View>
    </ListItem>
  );
};

const CreateModalTravellers: React.FC<CreateModalTravellersProps> = ({
  formik,
}) => {
  const addTraveller = (): void => {
    formik.setFieldValue('travellers', [
      ...formik.values.travellers,
      {
        firstName: '',
        lastName: '',
        age: '',
        isVaccinated: false,
      },
    ]);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Text text60M center>
          Travellers
        </Text>
        <FlatList
          data={formik.values.travellers}
          numColumns={1}
          renderItem={({item, index}) => (
            <RenderItem traveller={item} index={index} formik={formik} />
          )}
          keyExtractor={(_: any, index: number) => index.toString()}
        />
        <Button
          outline
          outlineColor={Colors.blue20}
          iconSource={() => (
            <FontAwesome5
              name="plus"
              style={tailwind('text-center')}
              color={Colors.blue20}
            />
          )}
          style={tailwind('h-8 w-8 mb-4')}
          onPress={addTraveller}
        />
        <Button
          label="Create Trip"
          backgroundColor={Colors.green20}
          color={Colors.white}
          text60M
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateModalTravellers;
