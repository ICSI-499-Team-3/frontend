/**
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './src/contexts/Auth';

// const LOCAL_SYSTEM_IP_ADDR = '192.168.1.112'; // Habib 
//  const LOCAL_SYSTEM_IP_ADDR = '169.226.38.113' // Lauren
// const LOCAL_SYSTEM_IP_ADDR = '169.226.216.137'; // Emma
// const LOCAL_SYSTEM_IP_ADDR = '192.168.1.160'; // Tony

const LOCAL_SYSTEM_IP_ADDR = '169.226.38.113' // Lauren
const HOST = Platform.OS === 'ios' ? 'localhost' : LOCAL_SYSTEM_IP_ADDR;

console.log(`http://${HOST}:8989/graphql`);

const client = new ApolloClient({
    uri: `http://${HOST}:8989/graphql`,
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
