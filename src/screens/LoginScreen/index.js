import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {TextInput as Input, useTheme} from 'react-native-paper';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/atoms/TextInput';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyBoardAvoidingWrapper';
import {userNameValidator, passwordValidator} from '../../helper/Validator';
// import {userSignIn} from '../../services/user';

const LoginScreen = () => {
  const [userName, setUserName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const navigation = useNavigation();
  const {colors} = useTheme();

  const onSubmit = async () => {
    const userNameError = userNameValidator(userName.value);
    const passwordError = passwordValidator(password.value);
    if (userNameError || passwordError) {
      setUserName({value: userName.value, error: userNameError});
      setPassword({value: password.value, error: passwordError});
      return;
    }

    try {
      // const response = await userSignIn(userName.value, password.value);
      // signIn(response, userName.value);
      // navigation.navigate(HOME, {});
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('userNamePasswordMismatchMsg');
      } else {
        console.log('somethingWentWrong');
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <TextInput
          label={'User Name'}
          returnKeyType="next"
          value={userName.value}
          onChangeText={text => setUserName({value: text, error: ''})}
          error={!!userName.error}
          errorText={userName.error}
          autoCapitalize="none"
          left={<Input.Icon name="account" color={colors.grey} />}
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
});

export default LoginScreen;
