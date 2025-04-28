import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './constants/query-client';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigator from './navigation/navigator';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
