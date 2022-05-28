import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './context/AuthProvider';
import Routes from './routes';
import {Theme} from './theme';

const App: () => Node = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <Routes />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
