import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordCodeScreen, { ForgotPasswordCodeProps } from '../screens/ForgotPasswordCodeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import StartScreen from '../screens/StartScreen';

export type AuthStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ForgotPasswordCodeScreen: ForgotPasswordCodeProps
    ForgotPasswordScreen: undefined;
    StartScreen: undefined;
};

const AuthStack = () => {

    const Stack = createNativeStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="ForgotPasswordCodeScreen" component={ForgotPasswordCodeScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AuthStack;