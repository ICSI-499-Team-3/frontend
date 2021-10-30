/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LogsView from './components/logs_view/LogsView';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Route } from 'react-native-tab-view';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
  
  const ProfileRoute = () => (
    <SafeAreaView>
      <Text>Profile</Text>
    </SafeAreaView>
  );

  const Tab = createMaterialBottomTabNavigator();

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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
