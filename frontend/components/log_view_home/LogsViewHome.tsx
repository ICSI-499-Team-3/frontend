import React, { createContext, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogStackParamList } from '../logs_view/LogsView';
import LogsList from '../logs_list/LogsList';
import { FAB } from 'react-native-paper';

export type LogsViewHomeProps = NativeStackScreenProps<LogStackParamList, 'LogsViewHome'>;

const LogNavigationContext = createContext({});

export const useLogNavigationContext = () => useContext(LogNavigationContext);

const LogsViewHome = ({ route, navigation }: LogsViewHomeProps) => {

    navigation.setOptions({
        headerShown: false,
    });

    return (
        <LogNavigationContext.Provider value={navigation}>
            <View>
                <LogsList />
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => console.log("pressed")}
                />
            </View>
        </LogNavigationContext.Provider>
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