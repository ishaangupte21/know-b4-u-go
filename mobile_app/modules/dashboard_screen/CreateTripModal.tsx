import {Formik, FormikHelpers, useFormik} from 'formik';
import React, {FC} from 'react';
import {LoaderScreen, Modal, View} from 'react-native-ui-lib';
import {useDestinationCountries} from '../../hooks/useDestinationCountries';
import CreateModalForm from './CreateModalForm';
import CreateModalTravellers from './CreateModalTravellers';

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
            <CreateModalForm formik={formik} data={data} />
            <CreateModalTravellers formik={formik} />
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CreateTripModal;
