import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

export type AuthStackParamList = {
    StartScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ResetPasswordScreen: undefined;
};

const AuthStack = () => {

    const Stack = createNativeStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AuthStack;