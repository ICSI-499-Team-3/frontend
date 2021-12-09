/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Loading } from './src/components/atoms/login/Loading';
import { useAuth } from './src/contexts/Auth';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { theme } from './src/core/theme';

/**
 * @author Tony Comanzo, Habib Affinnih
 * @returns
 */
const App = () => {

  const { authData, loading } = useAuth();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: theme.colors.primary,
        }}
        text1Style={{
          fontSize: 16,
        }}
        text2Style={{
          fontSize: 16,
        }}
      />
    )
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {authData ? <AppStack /> : <AuthStack />}
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
