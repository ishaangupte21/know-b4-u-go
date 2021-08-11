import {Formik, FormikHelpers, useFormik} from 'formik';
import React, {FC} from 'react';
import {
  LoaderScreen,
  Modal,
  View,
  Text,
  Picker,
  DateTimePicker,
} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import {useDestinationCountries} from '../../hooks/useDestinationCountries';

interface CreateTripModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
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
}

const CreateTripModal: FC<CreateTripModalProps> = ({open, onClose}) => {
  const {data, isLoading} = useDestinationCountries();

  const formValues: FormValues = {
    origin: '',
    destination: {
      label: '',
      value: '',
    },
    date: null,
    travelMethod: {
      value: 'AIR',
      label: 'Air',
    },
  };

  const formSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: formSubmit,
  });

  return (
    <Modal visible={open} animationType="slide">
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <View>
          <Modal.TopBar
            title="New Trip"
            onCancel={onClose}
            onDone={formik.handleSubmit}
            doneLabel="Create"
          />
          <View paddingH-16>
            <Text text60M center marginT-4>
              Enter your Trip Info
            </Text>
            <Picker
              marginT-14
              floatingPlaceholder
              placeholder="Select your Destination"
              selectionLimit={1}
              value={formik.values.destination.value}
              onChange={(val: {label: string; value: string}) => {
                formik.setFieldValue('destination', val);
              }}>
              {data?.map((val: string, index: number) => (
                <Picker.Item
                  key={index}
                  label={val}
                  value={val.toLowerCase().replace(' ', '-')}
                />
              ))}
            </Picker>
            <DateTimePicker
              mode="date"
              title="Date"
              placeholder="Select your Travel Date"
              onChange={(val: string) => {
                const date = new Date(val);
                formik.setFieldValue('date', date.getTime());
              }}
              value={formik.values.date ? new Date(formik.values.date) : null}
            />
            <Picker
              marginT-14
              floatingPlaceholder
              placeholder="I'm traveling by"
              selectionLimit={1}
              value={formik.values.travelMethod.value}
              onChange={(val: {label: string; value: string}) => {
                formik.setFieldValue('travelMethod', val);
              }}>
              <Picker.Item key={0} label="Air" value="AIR" />
              <Picker.Item key={1} label="Road" value="ROAD" />
            </Picker>
            <Text text60M center>
              Travellers 
            </Text>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CreateTripModal;
