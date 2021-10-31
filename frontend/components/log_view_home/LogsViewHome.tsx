import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogsList from '../logs_list/LogsList';
import { FAB } from 'react-native-paper';

const LogsViewHome = () => {

    return (
        <View>
            <LogsList />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log("pressed")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

export default LogsViewHome;