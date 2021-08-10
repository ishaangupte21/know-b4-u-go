import React, {FC} from 'react';
import {Pressable, View} from 'react-native';
import tailwind from 'tailwind-rn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({onClick}) => {
  return (
    <View
      style={tailwind('w-14 h-14 rounded-full absolute bottom-2.5 right-8')}>
      <Pressable
        style={tailwind(
          'w-full h-full bg-blue-500 rounded-full flex justify-center items-center',
        )}
        onPress={onClick}>
        <FontAwesome5 name={'plus'} style={tailwind('text-xl text-white')} />
      </Pressable>
    </View>
  );
};

export default CreateButton;
