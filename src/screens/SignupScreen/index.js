import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput as Input, useTheme} from 'react-native-paper';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/atoms/TextInput';
import KeyboardAvoidingWrapper from '../../components/wrappers/KeyBoardAvoidingWrapper';
import {AuthContext} from '../../context/AuthProvider';
import {emailValidator, passwordValidator} from '../../helper/Validator';

const SignupScreen = () => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const {register} = useContext(AuthContext);
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
    register(email.value, password.value);
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
          onPress={() => navigation.navigate('LOGIN', {})}>
          Already have an account ?
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            contentStyle={[
              styles.buttonStyle,
              {backgroundColor: colors.matGreen},
            ]}
            onPress={onSubmit}>
            {'Sign Up'}
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
  textNoAccount: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
