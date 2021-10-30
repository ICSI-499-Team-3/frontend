import React, { useState } from 'react';
import { Dimensions, StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';
import LogDetail from '../log_detail/LogDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogsViewHome from '../log_view_home/LogsViewHome';

type LogsViewProps = {
  data: { title: string; content: string; categories: string[] }[];
};

export type LogStackParamList = {
  LogsViewHome: undefined; 
  LogCard: {
    title: string;
    content: string;
    categories: string[];
  };
  LogDetail: {
    title: string;
    content: string;
    categories: string[];
  };
};

const LogsView = () => {

  const LogsStack = createNativeStackNavigator<LogStackParamList>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <LogsStack.Navigator initialRouteName="LogsViewHome">
        <LogsStack.Screen name="LogsViewHome" component={LogsViewHome} />
        <LogsStack.Screen name="LogDetail" component={LogDetail} />
      </LogsStack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default LogsView;