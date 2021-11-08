import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import MetricList from "../components/molecules/metric_list/MetricList";
import { RootStackParamList } from '../navigation/NavigationStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

type MetricViewNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MetricView'>;

const MetricView = () => {

    const navigation = useNavigation<MetricViewNavigationProp>();
 
    return (
        <View style={{display: 'flex', alignItems: 'center'}}>
            <MetricList />
            <FAB
                style={styles.fab}
                label="New Metric"
                icon="plus"
                onPress={() => navigation.navigate('CreateLog')}
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

export default MetricView;