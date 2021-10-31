import {FormikHelpers, useFormik} from 'formik';
import React, {FC, RefObject} from 'react';
import {useState} from 'react';
import {
  LoaderScreen,
  Modal,
  View,
  Wizard,
  WizardStepStates,
} from 'react-native-ui-lib';
import {TripCreate, useCreateTrip} from '../../hooks/useCreateTrip';
import {useDestinationCountries} from '../../hooks/useDestinationCountries';
import CreateModalForm from './CreateModalForm';
import CreateModalTravellers from './CreateModalTravellers';

interface CreateTripModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateTripModal: FC<CreateTripModalProps> = ({open, onClose}) => {
  const {data, isLoading} = useDestinationCountries();
  const createTripMutation = useCreateTrip();

  const formValues: TripCreate = {
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
        age: '',
        isVaccinated: false,
      },
    ],
  };

  interface TravellerRefObject {
    firstNameInput: RefObject<any> | null;
    lastNameInput: RefObject<any> | null;
    ageInput: RefObject<any> | null;
  }
  const [travellerRefs, setTravellerRefs] = useState<TravellerRefObject[]>([]);

  const addTravellerRefObj = (refObj: TravellerRefObject): void => {
    setTravellerRefs([...travellerRefs, refObj]);
  };

  const formSubmit = (
    values: TripCreate,
    actions: FormikHelpers<TripCreate>,
  ) => {
    // manually add the traveller data
    const travellersLength: number = values.travellers.length;
    for (let i = 0; i < travellersLength; i++) {
      values.travellers[i].firstName =
        travellerRefs[i].firstNameInput?.current.state.value;
      values.travellers[i].lastName =
        travellerRefs[i].lastNameInput?.current.state.value;
      values.travellers[i].age = travellerRefs[i].ageInput?.current.state.value;
    }
    values.travellers.forEach(traveller =>
      console.log(`isVaccinated: ${traveller.isVaccinated}`),
    );
    createTripMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
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
              <CreateModalTravellers
                formik={formik}
                createFormSubmit={formik.handleSubmit}
                travellerRefs={travellerRefs}
                addTravellerRefObj={addTravellerRefObj}
                setTravellerRefs={setTravellerRefs}
              />
            )}
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CreateTripModal;
