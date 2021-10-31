import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../log_card/LogCard';
import LogDetail from '../log_detail/LogDetail';
import TabView from '../tab_view/TabView';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined; 
    LogDetail: LogCardProps;
    LogCard: undefined;
};

const NavigationStack = () => {

    const RootStack = createNativeStackNavigator<RootStackParamList>();

    return (
        <RootStack.Navigator initialRouteName="Tabs">
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
        </RootStack.Navigator>
    );
};

export default NavigationStack;