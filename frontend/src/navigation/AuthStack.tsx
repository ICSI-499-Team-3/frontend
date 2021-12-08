import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import VerifyPasswordCodeScreen, { VerifyPasswordCodeProps } from '../screens/VerifyPasswordCodeScreen';
import ForgotPasswordScreen, { ForgotPasswordScreenProps } from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen, { ResetPasswordProps } from '../screens/ResetPasswordScreen';
import StartScreen from '../screens/StartScreen';

export type AuthStackParamList = {
    ForgotPasswordScreen: ForgotPasswordScreenProps;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ResetPasswordScreen: ResetPasswordProps;
    StartScreen: undefined;
    VerifyPasswordCodeScreen: VerifyPasswordCodeProps
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
                <Stack.Screen name="VerifyPasswordCodeScreen" component={VerifyPasswordCodeScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AuthStack;