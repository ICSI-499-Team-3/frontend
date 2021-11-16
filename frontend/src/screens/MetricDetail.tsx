import React, { useLayoutEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { IconButton } from 'react-native-paper';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GET_METRIC_BY_ID from '../queries/GetMetricById';
import GetMetricByIdData from '../types/GetMetricByIdData';
import DELETE_METRIC from '../mutations/DeleteMetric';
import DeletMetricData from '../types/DeleteMetricData';
import GET_METRICS_BY_USER_ID from '../queries/GetMetricsByUserId';

type MetricDetailProps = NativeStackScreenProps<AppStackParamList, 'MetricDetail'>;

export type MetricDetailNavigationProps = {
    metricId: string;
};

const MetricDetail = ({ route, navigation }: MetricDetailProps) => {

    const { metricId } = route.params;

    const [deleteMetric] = useMutation<DeletMetricData, { metricId: string; }>(DELETE_METRIC, {
        variables: {
            metricId: metricId,
        },
        refetchQueries: [
            GET_METRICS_BY_USER_ID, 
            "GetMetricsByUserId",
        ],
        onCompleted: () => navigation.goBack(),
    });

    const { loading, error, data } = useQuery<GetMetricByIdData, { metricId: string; }>(GET_METRIC_BY_ID, {
        variables: {
            metricId: metricId,
        },
    });

    const deletePressHander = () => {
        Alert.alert(
            'Alert', 
            'Are you sure you\'d like to delete this metric?', 
            [
                {
                    'text': "Cancel", 
                    onPress: () => console.log('do nothing'), 
                    style: 'cancel', 
                }, 
                {
                    text: 'Ok', 
                    onPress: () => deleteMetric(),
                },
            ],
        );
    };

    const editPressHandler = () => {
        navigation.navigate("MeasurementsList", route.params);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MetricDetailOptions 
                    sharePressHandler={() => {}}
                    deletePressHander={deletePressHander}
                    editPressHandler={editPressHandler}
                />
            ),
        });
    }, [navigation]);

    if (loading) {
        return (
            <Text>Loading...</Text>
        );
    }

    if (error) {
        return (
            <Text>{`${error}`}</Text>
        );
    }

    if (data) {

        const { title, xUnits, yUnits } = data.GetMetricById;

        const sortedData = data.GetMetricById.data.map(item => item).sort((a, b) => a.dateTimeMeasured - b.dateTimeMeasured);

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{title}</Text>
                <VictoryChart 
                    theme={VictoryTheme.material}
                >
                    <VictoryLine data={sortedData} />
                    <VictoryAxis 
                        dependentAxis
                        label={yUnits}
                    />
                    <VictoryAxis 
                        label={xUnits}
                    />
                </VictoryChart>
            </View>
        );
    }
};

type MetricDetailOptionsProps = {
    sharePressHandler: () => void;
    deletePressHander: () => void;
    editPressHandler: () => void;
};

const MetricDetailOptions = ({ sharePressHandler, deletePressHander, editPressHandler }: MetricDetailOptionsProps) => {

    return (
        <View style={styles.optionsContainer}>
            <IconButton 
                icon="export-variant"
                size={20}
                onPress={() => console.log('clicked')}
            />
            <IconButton 
                icon="delete-outline"
                size={20}
                onPress={deletePressHander}
            />
            <IconButton 
                icon="pencil-outline"
                size={20}
                onPress={editPressHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        flexGrow: 1,
    },
    optionsContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'flex-end',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});


export default MetricDetail;