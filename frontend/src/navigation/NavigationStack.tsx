import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import { MetricCardProps } from '../components/molecules/metric_card/MetricCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import MetricDetail from '../screens/MetricDetail';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    CreateLog: undefined;
    MetricCard: undefined;
    MetricDetail: MetricCardProps;
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
                />

                { /* LOGS SCREENS */ }
                <RootStack.Screen name="LogDetail" component={LogDetail} />

                { /* MEASUREMENTS SCREENS */ }
                <RootStack.Screen name="MetricDetail" component={MetricDetail} />

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