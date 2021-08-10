import React, {FC} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from './contexts/AuthContext';
import Routes from './router/Routes';

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
