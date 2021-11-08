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

const App = () => {

  const {authData, loading} = useAuth();

  if(loading) {
    return <Loading/>
  }
  return (
    <>
      {authData ? <AppStack /> : <AuthStack />}
    </>
  );
};

export default App;
