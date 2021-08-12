import {Formik, FormikHelpers, useFormik} from 'formik';
import React, {FC} from 'react';
import {useState} from 'react';
import {
  LoaderScreen,
  Modal,
  View,
  Wizard,
  WizardStepStates,
} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import {useDestinationCountries} from '../../hooks/useDestinationCountries';
import CreateModalForm from './CreateModalForm';
import CreateModalTravellers from './CreateModalTravellers';

interface CreateTripModalProps {
  open: boolean;
  onClose: () => void;
}

type TripTraveller = {
  firstName: string;
  lastName: string;
  age: number | null;
  isVaccinated: boolean;
};

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
  travellers: TripTraveller[];
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
    travellers: [
      {
        firstName: '',
        lastName: '',
        age: null,
        isVaccinated: false,
      },
    ],
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

  const [wizardIndex, setWizardIndex] = useState<number>(0);

  const getStepState = (index: number): WizardStepStates => {
    let state = Wizard.States.DISABLED;
    const completedStepIndex = wizardIndex - 1;
    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (wizardIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  };

  return (
    <Modal visible={open} animationType="slide">
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <View>
          <Modal.TopBar title="New Trip" onCancel={onClose} />
          <Wizard
            containerStyle={{shadowOpacity: 0}}
            activeIndex={wizardIndex}
            onActiveIndexChanged={(index: number) => setWizardIndex(index)}
            testID="trip-wizard">
            <Wizard.Step label="Trip Information" state={getStepState(0)} />
            <Wizard.Step
              label="Traveller Information"
              state={getStepState(1)}
            />
          </Wizard>
          <View paddingH-16 paddingT-10>
            {wizardIndex === 0 ? (
              <CreateModalForm
                formik={formik}
                data={data}
                continueFunc={() => setWizardIndex(1)}
              />
            ) : (
              <CreateModalTravellers formik={formik} />
            )}
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CreateTripModal;
