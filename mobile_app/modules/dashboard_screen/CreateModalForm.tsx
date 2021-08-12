import React, {FC} from 'react';
import {Button, Colors, DateTimePicker, Picker, Text, View} from 'react-native-ui-lib';

interface CreateModalFormProps {
  formik: any;
  data: string[] | undefined;
  continueFunc: () => void
}

const CreateModalForm: FC<CreateModalFormProps> = ({formik, data, continueFunc}) => {
  return (
    <View>
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
      <Button onPress={continueFunc} label="Continue" backgroundColor={Colors.green20} text60M/>
    </View>
  );
};

export default CreateModalForm;
