import React, { useState } from 'react';
import { Dimensions, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import LogsList from './LogsList';
import { FAB } from 'react-native-paper';

type LogsViewProps = {
  data: { title: string; content: string; categories: string[] }[];
};

const LogsView = ({ data }: LogsViewProps) => {

  const FirstRoute = () => (
    <LogsList data={data} />
  );

  const SecondRoute = () => (
    <LogsList data={data} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const initialLayout = { 
    height: Dimensions.get('window').height, 
    width: Dimensions.get('window').width 
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'My Logs'},
    { key: 'second', title: 'Shared' },
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log("pressed")}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default LogsView;