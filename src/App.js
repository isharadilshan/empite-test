import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Routes from './routes';
import {Theme} from './theme';

const App: () => Node = () => {
  return (
    <PaperProvider theme={Theme}>
      <Routes />
    </PaperProvider>
  );
};

export default App;
