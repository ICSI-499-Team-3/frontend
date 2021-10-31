import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../log_card/LogCard';
import LogDetail from '../log_detail/LogDetail';
import TabView from '../tab_view/TabView';
import CreateLog from '../create_log/CreateLog';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    CreateLog: undefined;
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

                { /* MEASUREMENTS SCREENS */ }

                { /* RECOMMENDATIONS SCREENS */ }

                { /* PROFILE SCREENS */ }
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen 
                    name="CreateLog" 
                    component={CreateLog}
                    options={{
                        headerShown: false,
                    }} 
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
};

export default NavigationStack;