import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogsView from './LogsView';
import ProfileScreen from './ProfileScreen';

const TabView = () => {

    const Tab = createMaterialBottomTabNavigator();

    const LogsRoute = () => <LogsView />;

    const MeasurementsRoute = () => (
        <SafeAreaView>
            <Text>Measurements</Text>
        </SafeAreaView>
    );

    const RecommendationsRoute = () => (
        <SafeAreaView>
            <Text>Recommendations</Text>
        </SafeAreaView>
    );

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