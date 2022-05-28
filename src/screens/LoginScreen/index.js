import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text} from 'react-native';
import {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {TextInput as Input, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/atoms/TextInput';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyBoardAvoidingWrapper';
import {AuthContext} from '../../context/AuthProvider';
import {emailValidator, passwordValidator} from '../../helper/Validator';

const LoginScreen = () => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const {login, loginWithCredentials} = useContext(AuthContext);
  const {colors} = useTheme();
  const navigation = useNavigation();

  const onSubmit = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({value: email.value, error: emailError});
      setPassword({value: password.value, error: passwordError});
      return;
    }
    login(email.value, password.value);
  };

  const onPressLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'User deneid login process',
        });
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Something went wrong obtaining access token',
        });
        return;
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      loginWithCredentials(facebookCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <TextInput
          label={'Email'}
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          left={<Input.Icon name="email" color={colors.grey} />}
        />
        <TextInput
          label={'Password'}
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          left={<Input.Icon name="lock" color={colors.grey} />}
        />
        <Text
          style={[styles.textNoAccount, {color: colors.matBlue}]}
          onPress={() => navigation.navigate('SIGNUP', {})}>
          Don't have an account ?
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            contentStyle={[
              styles.buttonStyle,
              {backgroundColor: colors.matGreen},
            ]}
            onPress={onSubmit}>
            {'Login'}
          </Button>
        </View>
        <LoginButton onPress={onPressLoginWithFacebook} />
      </KeyboardAvoidingWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonStyle: {
    width: 250,
  },
  textNoAccount: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
