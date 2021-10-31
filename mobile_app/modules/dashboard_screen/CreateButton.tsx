import React, {FC} from 'react';
import {View, Button, Colors, FloatingButton} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({onClick}) => {
  return (
    <View width="100%" height="100%">
      <Button
        style={tailwind('w-14 h-14 m-0 p-0')}
        backgroundColor={Colors.green30}
        enableShadow
        onPress={onClick}
        iconSource={() => (
          <FontAwesome5 name={'plus'} style={tailwind('text-xl text-white')} />
        )}
      />
    </View>
  );
};

export default CreateButton;
