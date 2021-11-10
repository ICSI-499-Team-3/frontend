import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import { RecCardProps } from '../components/molecules/Rec_Card/RecCard';
import LogDetail from '../screens/LogDetail';
import RecDetail from '../screens/RecDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';

export type RootStackParamList = {
    Tabs: undefined;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    CreateLog: undefined;
    RecommendationsView: undefined;
    RecCard: undefined;
    RecDetail: RecCardProps;
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
                <RootStack.Screen name="RecommendationsView" component={LogDetail} />
                <RootStack.Screen name="RecDetail" component={RecDetail} />
                

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