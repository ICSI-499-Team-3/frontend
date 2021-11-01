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

const client = new ApolloClient({
    uri: 'localhost:8989/graphql', 
    cache: new InMemoryCache(),
});

export default function Main() {

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer>
                    <PaperProvider>
                        <App />
                    </PaperProvider>
                </NavigationContainer>
            </GestureHandlerRootView> 
        </ApolloProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
