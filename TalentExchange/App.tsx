import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#1F2937',
    disabled: '#9CA3AF',
    placeholder: '#6B7280',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#EF4444',
  },
};

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#2563EB"
            translucent={false}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
