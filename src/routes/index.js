import React, {useCallback, useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../components/organisms/Loading';
import {AuthContext} from '../context/AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(
    authUser => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      }
      setLoading(false);
    },
    [setUser, initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
