import React, {useContext} from 'react';
import {IconButton, Colors} from 'react-native-paper';
import {AuthContext} from '../../../context/AuthProvider';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);

  return (
    <IconButton icon="power" color={Colors.red500} size={30} onPress={logout} />
  );
};

export default LogoutButton;
