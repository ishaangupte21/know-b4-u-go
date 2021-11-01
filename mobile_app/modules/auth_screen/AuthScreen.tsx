import React, {FC, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import tailwind from 'tailwind-rn';
import {useAuth} from '../../hooks/useAuth';
import {useAuthToken} from '../../hooks/useAuthToken';
import {AxiosResponse} from 'axios';
import {Text, Button, Colors, View} from 'react-native-ui-lib';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBullhorn} from '@fortawesome/free-solid-svg-icons';

interface AuthScreenProps {}

const AuthScreen: FC<AuthScreenProps> = () => {
  GoogleSignin.configure({
    webClientId:
      '29525540959-9qv3lo9to97nouo5afoij90u6t81pdje.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId:
      '29525540959-40mpq3jpih585otallptkc01u8s936cd.apps.googleusercontent.com',
  });

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  const {googleLogin, refetchUser} = useAuth();
  const {setToken} = useAuthToken();

  const googleBtnClick = async (): Promise<void> => {
    try {
      setBtnDisabled(true);
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const {
        data: {token},
      } = (await googleLogin(idToken as string)) as AxiosResponse<any>;
      console.log(`token: ${token}`);
      await setToken(token);
      refetchUser();
    } catch (err) {
      console.error(err);
      setBtnDisabled(false);
    }
  };

  return (
    <SafeAreaView>
      <View width="100%" height="100%" paddingH-12>
        <Text text30M center marginT-56 marginB-36 green10>
          KnowB4UGo
        </Text>
        <View flex style={{justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon
            style={{margin: 'auto', width: 100}}
            color={Colors.green10}
            icon={faBullhorn}
            size={100}
          />
        </View>
        <Button
          backgroundColor={Colors.green20}
          label="Login With Google"
          borderRadius={5}
          text60M
          iconSource={() => (
            <FontAwesome5Icon
              name={'google'}
              style={tailwind('text-2xl text-white mr-3')}
            />
          )}
          style={tailwind('py-3')}
          onPress={googleBtnClick}
          disabled={btnDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
