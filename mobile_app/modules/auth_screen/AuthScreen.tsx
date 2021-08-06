import React, {FC, useState} from 'react';
import {Button, Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import tailwind from 'tailwind-rn';
import {useAuth} from '../../hooks/useAuth';
import {useAuthToken} from '../../hooks/useAuthToken';
import {AxiosResponse} from 'axios';

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
      setBtnDisabled(false);
    } catch (err) {
      console.error(err);
      setBtnDisabled(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>Login screen</Text>
      {/* <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleBtnClick}
        disabled={btnDisabled}
      /> */}
      <Pressable
        style={tailwind(
          'px-5 py-4 mx-4 my-3 rounded-md text-white font-medium bg-blue-500 mt-12',
        )}
        onPress={googleBtnClick}
        disabled={btnDisabled}>
        <Text style={tailwind('text-white font-semibold text-lg text-center')}>
          Continue with Google
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AuthScreen;
