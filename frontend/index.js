/**
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

export default function Main() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
                <PaperProvider>
                    <App />
                </PaperProvider>
            </NavigationContainer>
        </GestureHandlerRootView> 
    );
}

AppRegistry.registerComponent(appName, () => Main);
