import React, {FC} from 'react';
import {AuthProvider} from './contexts/AuthContext';
import Routes from './router/Routes';

const App: FC = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;
