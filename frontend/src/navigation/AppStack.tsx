import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    CreateLog: undefined;
    StartScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ResetPasswordScreen: undefined;
};

const NavigationStack = () => {

    const RootStack = createNativeStackNavigator<RootStackParamList>();

    return (
        <RootStack.Navigator initialRouteName="StartScreen">
            <RootStack.Group screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="StartScreen" component={StartScreen} />
                <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
                <RootStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            </RootStack.Group>
            <RootStack.Group>
                { /* TABS */}
                <RootStack.Screen
                    name="Tabs"
                    component={TabView}
                    options={{
                        headerShown: false,
                    }}
                />

                { /* LOGS SCREENS */}
                <RootStack.Screen name="LogDetail" component={LogDetail} />

                { /* MEASUREMENTS SCREENS */}

                { /* RECOMMENDATIONS SCREENS */}

                { /* PROFILE SCREENS */}
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen
                    name="CreateLog"
                    component={CreateLog}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
};

export default NavigationStack;