import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {TextInput as Input, useTheme} from 'react-native-paper';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/atoms/TextInput';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyBoardAvoidingWrapper';
import {emailValidator, passwordValidator} from '../../helper/Validator';
import {HOME} from '../../routes/route-paths';

const LoginScreen = () => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const navigation = useNavigation();
  const {colors} = useTheme();

  const onSubmit = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({value: email.value, error: emailError});
      setPassword({value: password.value, error: passwordError});
      return;
    }

    try {
      const response = await auth().signInWithEmailAndPassword(
        email.value,
        password.value,
      );
      if (response) {
        navigation.navigate(HOME, {});
      }
      console.log('RESPONSE ---------------------------', response);
    } catch (error) {
      console.log('ERROR ---------------------------', error);

      console.log('some thing went wrong');
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
