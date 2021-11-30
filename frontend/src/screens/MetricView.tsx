import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import MetricList from "../components/molecules/metric_list/MetricList";
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../contexts/Auth';
import AppleHealthKit, {
    HealthValue,
    BloodPressureSampleValue 
} from 'react-native-health';

type MetricViewNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricView'>;

const MetricView = () => {

    const navigation = useNavigation<MetricViewNavigationProp>();

    const { authData } = useAuth();
    const syncMetrics = () => {
        console.log('syncing...');

        // need to get date of last sync
        const options = {
            startDate: new Date(2020, 1, 1).toISOString(),
        };
    
        // heart rate
        AppleHealthKit.getHeartRateSamples(
            options, 
            (callbackError: string, results: HealthValue[]) => {
                console.log(results);
            }
        );

        // blood pressure
        AppleHealthKit.getBloodPressureSamples(
            options, 
            (callbackError: string, results: BloodPressureSampleValue[]) => {
                console.log(results);
            }
        );

        // body temp
        AppleHealthKit.getBodyTemperatureSamples(
            options, 
            (callbackError: string, results: HealthValue[]) => {
                console.log(results);
            }
        );

        // vo2 max
        AppleHealthKit.getVo2MaxSamples(
            options, 
            (callbackError: string, results: HealthValue[]) => {
                console.log(results);
            }
        );
    };
 
    return (
        <View style={{display: 'flex', alignItems: 'center'}}>
            <MetricList userId={authData?.id ?? ''} />
            <FAB
                style={styles.syncFab}
                icon="sync"
                onPress={syncMetrics}
            />
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
    syncFab: {
        position: 'absolute',
        marginRight: 16,
        marginBottom: 80,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default MetricView;