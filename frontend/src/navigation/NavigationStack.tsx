import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import { MetricCardProps } from '../components/molecules/metric_card/MetricCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import MetricDetail from '../screens/MetricDetail';
import CreateMetric from '../screens/CreateMetric';

export type RootStackParamList = {
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
                <RootStack.Screen 
                    name="CreateMetric"
                    component={CreateMetric}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
};

export default NavigationStack;