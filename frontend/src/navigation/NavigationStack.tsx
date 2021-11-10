import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import LogShare from '../screens/LogShare';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps; // with LogCardProps param, it has to adhere to the structure of LogCardProps type
    LogCard: undefined; // with undefined, it doesnt expect any parameters 
    CreateLog: undefined;
    LogShare: undefined;
};

const NavigationStack = () => {

    const RootStack = createNativeStackNavigator<RootStackParamList>();

    return (
        <RootStack.Navigator initialRouteName="Tabs">
            <RootStack.Group>
                { /* TABS */ }
                <RootStack.Screen 
                    name="Tabs"
                    component={TabView}
                    options={{
                        headerShown: false,
                    }}
                />

                { /* LOGS SCREENS */ }
                <RootStack.Screen name="LogDetail" component={LogDetail} />
                <RootStack.Screen name="LogShare" component={LogShare} />

                { /* MEASUREMENTS SCREENS */ }

                { /* RECOMMENDATIONS SCREENS */ }

                { /* PROFILE SCREENS */ }
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