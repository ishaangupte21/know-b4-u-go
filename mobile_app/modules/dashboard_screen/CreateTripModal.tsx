import {Formik, FormikHelpers} from 'formik';
import React, {FC} from 'react';
import {Modal, Text, TextInput, View} from 'react-native';
import tailwind from 'tailwind-rn';
import RNPickerSelect from 'react-native-picker-select';

interface CreateTripModalProps {
  open: boolean;
}

interface FormValues {
  origin: string;
  destination: string;
  date: number | null;
  travelMethod: 'AIR' | 'ROAD';
}

const CreateTripModal: FC<CreateTripModalProps> = ({open}) => {
  const formValues: FormValues = {
    origin: '',
    destination: '',
    date: null,
    travelMethod: 'AIR',
  };

  const formSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
  };

  return (
    <Modal visible={open} animationType="slide">
      <Formik initialValues={formValues} onSubmit={formSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
          <View style={tailwind('mt-12')}>
            <Text style={tailwind('text-center text-2xl mt-4')}>
              Create a Trip
            </Text>
            <Text style={tailwind('text-lg mt-6 text-center')}>
              Select your Destination
            </Text>
            <RNPickerSelect
              onValueChange={(value: string) => {
                setFieldValue('destination', value);
              }}
              items={[
                {label: 'India', value: 'india'},
                {label: 'United Kingdom', value: 'united-kingdom'},
              ]}
            />
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTripModal;
