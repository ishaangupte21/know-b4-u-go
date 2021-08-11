import React, {FC} from 'react';
import {View, Button, Colors, FloatingButton} from 'react-native-ui-lib';
import tailwind from 'tailwind-rn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({onClick}) => {
  return (
    <View absR-12 absB-18 marginL width="100%" height="100%">
      {/* <Pressable
        style={tailwind(
          'w-full h-full bg-blue-500 rounded-full flex justify-center items-center',
        )}
        onPress={onClick}>
        <FontAwesome5 name={'plus'} style={tailwind('text-xl text-white')} />
      </Pressable> */}
      <Button
        style={tailwind('w-14 h-14 m-0 p-0')}
        backgroundColor={Colors.green30}
        enableShadow
        onPress={onClick}
        iconSource={() => (
          <FontAwesome5 name={'plus'} style={tailwind('text-xl text-white')} />
        )}></Button>
      {/* <FloatingButton
        visible={true}
        button={{
          style: tailwind('w-14 h-14 m-0 p-0'),
          iconSource: () => (
            <FontAwesome5
              name={'plus'}
              style={tailwind('text-xl text-white')}
            />
          ),
          backgroundColor: Colors.green30,
          enableShadow: true,
          onPress: onClick,
        }}
      /> */}
    </View>
  );
};

export default CreateButton;
