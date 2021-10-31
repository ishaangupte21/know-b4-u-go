import React, {RefObject, useState, MutableRefObject} from 'react';
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
  Picker,
} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import {useRef} from 'react';
import {useEffect} from 'react';

interface TravellerRefObject {
  firstNameInput: MutableRefObject<any> | null;
  lastNameInput: MutableRefObject<any> | null;
  ageInput: MutableRefObject<any> | null;
}

interface CreateModalTravellersProps {
  formik: any;
  createFormSubmit: () => void;
  travellerRefs: TravellerRefObject[];
  addTravellerRefObj: (refObj: TravellerRefObject) => void;
  setTravellerRefs: any;
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
  travellerRefs: TravellerRefObject[];
  addTravellerRefObj: (refObj: TravellerRefObject) => void;
}> = ({traveller, index, formik, travellerRefs, addTravellerRefObj}) => {
  const firstNameRef = useRef<any>(null),
    lastNameRef = useRef<any>(null),
    ageRef = useRef<any>(null);

  const removeTraveller = (): void => {
    const travellers: TripTraveller[] = formik.values.travellers;
    if (travellers.length === 1) return;
    travellers.splice(index, 1);
    formik.setFieldValue('travellers', travellers);
    const refObjs: TravellerRefObject[] = travellerRefs;
    if (refObjs.length === 1) return;
    refObjs.splice(index, 1);
  };

  useEffect(() => {
    addTravellerRefObj({
      firstNameInput: firstNameRef,
      lastNameInput: lastNameRef,
      ageInput: ageRef,
    });
  }, []);

  return (
    <ListItem height="50px">
      <View width="100%">
        <View style={tailwind('flex flex-row items-center')}>
          <Text text70M>Traveller #{index + 1}</Text>
          <Button
            color={Colors.blue10}
            backgroundColor={Colors.white}
            iconSource={() => (
              <FontAwesome5 name="times" style={{color: Colors.blue10}} />
            )}
            style={tailwind('w-4 h-4 ml-1')}
            onPress={removeTraveller}
          />
        </View>
        <TextField
          placeholder="First Name"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
          ref={firstNameRef}
        />
        <TextField
          placeholder="Last Name"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
          ref={lastNameRef}
        />
        <TextField
          placeholder="Age"
          floatingPlaceholder
          underlineColor={{
            focus: Colors.green20,
          }}
          ref={ageRef}
        />
        <Picker
          floatingPlaceholder
          placeholder="Vaccination Status"
          selectionLimit={1}
          value={
            formik.values.travellers[index].isVaccinated
              ? 'VACCINATED'
              : 'NOT_VACCINATED'
          }
          onChange={(val: {label: string; value: string}) => {
            const travellers: TripTraveller[] = formik.values.travellers;
            travellers[index] = {
              ...travellers[index],
              isVaccinated: val.value === 'VACCINATED' ? true : false,
            };
            console.log(travellers[index].isVaccinated);
            
            formik.setFieldValue('travellers', travellers);
          }}>
          <Picker.Item label="Vaccinated" value="VACCINATED" key={0} />
          <Picker.Item label="Not Vaccinated" value="NOT_VACCINATED" key={1} />
        </Picker>
      </View>
    </ListItem>
  );
};

const CreateModalTravellers: React.FC<CreateModalTravellersProps> = ({
  formik,
  createFormSubmit,
  travellerRefs,
  setTravellerRefs,
  addTravellerRefObj,
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
            <RenderItem
              traveller={item}
              index={index}
              formik={formik}
              addTravellerRefObj={addTravellerRefObj}
              travellerRefs={travellerRefs}
            />
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
          onPress={createFormSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateModalTravellers;
