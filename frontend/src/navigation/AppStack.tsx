import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import { MetricCardProps } from '../components/molecules/metric_card/MetricCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import MetricDetail from '../screens/MetricDetail';
import CreateMetric from '../screens/CreateMetric';

export type AppStackParamList = {
    CreateLog: undefined;
    CreateMetric: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    MetricView: undefined;
    MetricCard: undefined;
    MetricDetail: MetricCardProps;
    Tabs: undefined;
};

const AppStack = () => {

    const Stack = createNativeStackNavigator<AppStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Tabs">
            <Stack.Group>
                { /* TABS */}
                <Stack.Screen
                    name="Tabs"
                    component={TabView}
                />

                { /* LOGS SCREENS */}
                <Stack.Screen name="LogDetail" component={LogDetail} />

                { /* MEASUREMENTS SCREENS */}
                <Stack.Screen name="MetricDetail" component={MetricDetail} />

                { /* RECOMMENDATIONS SCREENS */}

                { /* PROFILE SCREENS */}
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="CreateLog"
                    component={CreateLog}
                />
                <Stack.Screen
                    name="CreateMetric"
                    component={CreateMetric}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppStack;