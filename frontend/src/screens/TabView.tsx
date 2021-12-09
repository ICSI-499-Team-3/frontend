import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogsView from './LogsView';
import RecommendationsView from './RecommendationsView'; //emma
import MetricView from './MetricView';
import ProfileScreen from './profile/ProfileScreen';
import SharedView from './SharedView';

/**
 * @author Tony Comanzo, Habib Affinnih, Emma Wirth, Lauren Velez
 */
const TabView = () => {

    const Tab = createMaterialBottomTabNavigator();

    const LogsRoute = () => <LogsView />;

    const MeasurementsRoute = () => <MetricView />;

    const SharedRoute = () => <SharedView />;
  
    //emma
    const RecommendationsRoute = () => <RecommendationsView />;

    const ProfileRoute = () => <ProfileScreen />;

    return (
        <Tab.Navigator
            initialRouteName="My Logs"
        >
            <Tab.Screen
                name="My Logs"
                component={LogsRoute}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="text" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Biometrics"
                component={MeasurementsRoute}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chart-line-variant" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Shared"
                component={SharedRoute}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Recs"
                component={RecommendationsRoute}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="assistant" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileRoute}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabView;