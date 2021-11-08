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
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './src/contexts/Auth';

const LOCAL_SYSTEM_IP_ADDR = '192.168.1.112'; // Habib

const client = new ApolloClient({
    uri: `http://${LOCAL_SYSTEM_IP_ADDR}:8989/graphql`,
    cache: new InMemoryCache(),
});

export default function Main() {

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <PaperProvider>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </PaperProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </ApolloProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
