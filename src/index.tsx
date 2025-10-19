import './i18n';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './constants/query-client';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigator from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
