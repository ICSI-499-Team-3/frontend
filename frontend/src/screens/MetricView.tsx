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
import readAllGoogleFitData from '../helpers/health-services/google/ReadAllGoogleFitData';
import { isBloodPressureResponse } from '../helpers/health-services/google/TestGoogleFitTypes';
import { initAppleHealthKit } from '../helpers/health-services/apple/HealthKitSetup';
import { initGoogleFit } from '../helpers/health-services/google/GoogleFitSetup';

type MetricViewNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricView'>;

/**
 * @author Tony Comanzo 
 */
const MetricView = () => {

    const navigation = useNavigation<MetricViewNavigationProp>();

    const { authData } = useAuth();

    const [sync, { loading }] = useMutation<SyncData, { input: SyncInput }>(SYNC, {
        refetchQueries: [
            GET_METRICS_BY_USER_ID, 
            'GetMetricsByUserId',
        ],
    });

    const healthKitInitCallback = () => {

        // there is no way in health kit to check if user 
        // has given permission to app to read health data
        // due to privacy concerns, so just auth and read
        // and present error empty array returned for certain samples

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
                    text2: 'Either permission was not granted or there is no data',
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
        
    }

    const syncIos = () => {

        // will request user permission the first time this is called
        // will be silent if user denies or accepts
        initAppleHealthKit(healthKitInitCallback);
    };

    // if already authorized, read data
    const googleFitOnAlreadyAuthorized = async () => {
        console.log('syncing...');

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const endDate = new Date();

        try {
            const results = await readAllGoogleFitData(startDate, endDate);
            const metrics = results.map(({ samples, title }) => {
                const measurements: SyncMeasurementInput[] = samples.map(sample => {
                    const date = new Date(sample.startDate).getTime() / 1000;
                    if (isBloodPressureResponse(sample)) {
                        return ({
                            x: date.toString(), 
                            y: `${sample.systolic} / ${sample.diastolic}`,
                            dateTimeMeasured: date,
                        });
                    } else {
                        return ({
                            x: date.toString(),
                            y: sample.value.toString(),  
                            dateTimeMeasured: date,
                        });
                    }
                });
                const metric: SyncMetricInput = {
                    userId: authData?.id ?? '',
                    title: title, 
                    xUnits: 'Time', 
                    yUnits: '',
                    data: measurements,
                };
                return metric;
            });

            const metricsWithoutData: SyncMetricInput[] = [];
            const metricsWithData: SyncMetricInput[] = [];
            for (const metric of metrics) {
                if (metric.data.length === 0) {
                    metricsWithoutData.push(metric);
                } else {
                    metricsWithData.push(metric);
                }
            }

            if (metricsWithData.length === 0) {
                Toast.show({
                    type: 'error', 
                    text1: 'Sync failed', 
                    text2: 'No data in Google Fit to sync with',
                });
                return;
            } 
            
            // if (metricsWithData.length > 0 && metricsWithoutData.length > 0) {
            //     Toast.show({
            //         type: 'error', 
            //         text1: 'Unable to sync all data', 
            //         text2: `Unable to sync ${metricsWithoutData.map(metric => metric.title).join(',')}`,
            //     });
            // }
            
            const input: SyncInput = {
                userId: authData?.id ?? '', 
                metrics: metricsWithData,
            };

            sync({
                variables: {
                    input: input, 
                }
            }).then(() => {
                let text2: string;
                if (metricsWithData.length > 0 && metricsWithoutData.length > 0) {
                    text2 = `Synced ${metricsWithData.map(metric => metric.title).join(',')}, unable to sync ${metricsWithoutData.map(metric => metric.title).join(',')}`;
                } else {
                    text2 = `Synced ${metricsWithData.map(metric => metric.title).join(',')}`;
                }
                Toast.show({
                    type: 'success', 
                    text1: 'Finished syncing', 
                    text2: text2,
                });
            });
        } catch (error) {
            console.warn(error);
        }
    };

    // read data after auth success
    const googleFitOnAuthorizeSuccess = () => {
        console.log("AUTH_SUCCESS");
        googleFitOnAlreadyAuthorized();
    };

    const googleFitOnAccessDenied = (message: string) => {
        console.log('AUTH_DENIED', message);
    };

    const googleFitOnAuthorizeError = () => {
        console.log("AUTH_ERROR");
    };

    const syncAndroid = () => {

        initGoogleFit(
            googleFitOnAlreadyAuthorized, 
            googleFitOnAuthorizeSuccess, 
            googleFitOnAccessDenied,
            googleFitOnAuthorizeError
        );
    };

    const syncMetrics = () => {
        if (Platform.OS === 'ios') {
            syncIos();
        } else if (Platform.OS === 'android') {
            syncAndroid();
        } else {
            Toast.show({
                type: 'error',
                text1: 'Sync Failed',
                text2: 'Syncing is currently unsupported for your device',
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