import React from 'react';
import { useMutation } from '@apollo/client';
import { Platform, View, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import MetricList from "../components/molecules/metric_list/MetricList";
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../contexts/Auth';
import { syncHealthKitData } from '../helpers/health-services/apple/ReadHealthKitData';
import { isHealthValue, isBloodPressureSampleValue } from '../helpers/health-services/apple/TestType';
import { HealthValue, BloodPressureSampleValue } from 'react-native-health';
import SyncInput from '../graphql/types/SyncInput';
import SyncData from '../graphql/types/SyncData';
import SyncMetricInput from '../graphql/types/SyncMetricInput';
import SyncMeasurementInput from '../graphql/types/SyncMeasurementInput';
import SYNC from '../graphql/mutations/Sync';
import Toast from 'react-native-toast-message';
import GET_METRICS_BY_USER_ID from '../graphql/queries/GetMetricsByUserId';

type MetricViewNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricView'>;

const MetricView = () => {

    const navigation = useNavigation<MetricViewNavigationProp>();

    const { authData } = useAuth();

    const [sync, { loading }] = useMutation<SyncData, { input: SyncInput }>(SYNC, {
        refetchQueries: [
            GET_METRICS_BY_USER_ID, 
            'GetMetricsByUserId',
        ]
    });

    const syncIos = () => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);

        syncHealthKitData((error, title, results) => {

            if (error) {
                console.log(error);
                return;
            }

            if (results.length === 0) {
                Toast.show({
                    type: 'error',
                    text1: `Currently no ${title} data to sync`,
                });
                return;
            }

            /* need to limit data to make server processing quicker, and 
            also, switching between tabs takes forever when there's too much */
            if (results.length > 200) {
                results = results.splice(0, 200);
            }

            let measurements: SyncMeasurementInput[] = [];
            if (isHealthValue(results[0])) {
                measurements = (results as HealthValue[]).map(item => ({
                    x: (new Date(item.startDate).getTime() / 1000).toString(), 
                    y: item.value.toString(), 
                    dateTimeMeasured: new Date(item.startDate).getTime() / 1000,
                }));
            } else if (isBloodPressureSampleValue(results[0])) {
                measurements = (results as BloodPressureSampleValue[]).map(item => ({
                    x: (new Date(item.startDate).getTime() / 1000).toString(), 
                    y: `${item.bloodPressureSystolicValue}/${item.bloodPressureDiastolicValue}`,
                    dateTimeMeasured: new Date(item.startDate).getTime() / 1000, 
                }));
            }

            const metric: SyncMetricInput = {
                userId: authData?.id ?? '', 
                title: title, 
                xUnits: 'Time', 
                yUnits: '',
                data: measurements,
            };

            console.log(`${metric.title}: ${metric.data.length}`);

            sync({
                variables: {
                    input: {
                        userId: authData?.id ?? '', 
                        metrics: [metric],
                    },
                },
            }).then(() => {
                Toast.show({
                    type: 'success', 
                    text1: 'Finished syncing ' + title,
                });
            });
        }, startDate);
    };

    const syncMetrics = () => {
        console.log('syncing...');

        if (Platform.OS === 'ios') {
            syncIos();
        } else {
            Toast.show({
                type: 'error',
                text1: 'Sync Failed',
                text2: 'Syncing currently unsupported for your device',
            });
        }
    };
 
    return (
        <View style={{display: 'flex', alignItems: 'center'}}>
            <MetricList userId={authData?.id ?? ''} />
            {loading && <ActivityIndicator style={styles.activityIndicator} />}
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
    activityIndicator: {
        position: 'absolute', 
        margin: 32, 
        marginBottom: 150,
        right: 0, 
        bottom: 0,
        // position: 'absolute', 
        // margin: 16, 
        // left: 0, 
        // bottom: 0,
    },
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