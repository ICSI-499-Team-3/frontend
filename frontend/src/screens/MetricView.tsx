import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import MetricList from "../components/molecules/metric_list/MetricList";
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../contexts/Auth';

type MetricViewNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricView'>;

const MetricView = () => {

    const navigation = useNavigation<MetricViewNavigationProp>();

    const { authData } = useAuth();
 
    return (
        <View style={{display: 'flex', alignItems: 'center'}}>
            <MetricList userId={authData?.id ?? ''} />
            <FAB
                style={styles.fab}
                label="New Metric"
                icon="plus"
                onPress={() => navigation.navigate('CreateMetric')}
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