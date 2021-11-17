import React, { useLayoutEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Alert, Text, View, StyleSheet, ScrollView } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryBar } from 'victory-native';
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

        // regex to test if strings contains only digits
        const regex = /^\d+$/;
        let numbersOnly = true;
        for (let i = 0; i < data.GetMetricById.data.length; i++) {
            if (!regex.test(data.GetMetricById.data[i].y.trim())) {
                numbersOnly = false;
                break;
            }
        }

        const processedData = data.GetMetricById.data.map(item => {
            const i = JSON.parse(JSON.stringify(item));
            if (numbersOnly) {
                i.y = parseFloat(i.y);
                return i;
            } else {
                return i;
            }
        }).sort((a, b) => a.dateTimeMeasured - b.dateTimeMeasured);

        if (numbersOnly) {
            return (
                <View style={styles.container}>
                    <Text style={styles.titleText}>{title}</Text>
                    <VictoryChart 
                        width={350}
                        height={350}
                        padding={{top: 20, right: 30, bottom: 50, left: 80}}
                        theme={VictoryTheme.material}
                    >
                        <VictoryLine data={processedData} />
                        <VictoryAxis 
                            dependentAxis
                            label={yUnits}
                            axisLabelComponent={
                                <VictoryLabel
                                    dy={-40}
                                    angle={-90}
                                />
                            }
                        />
                        <VictoryAxis 
                            label={xUnits}
                            axisLabelComponent={
                                <VictoryLabel
                                    dy={20}
                                />
                            }
                            tickFormat={(x) => {
                                const date = new Date(0);
                                date.setUTCSeconds(x);
                                const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
                                return formattedDate;
                                // return date.toLocaleDateString();
                            }}
                            fixLabelOverlap
                        />
                    </VictoryChart>
                </View>
            );
        } else {
            let map = new Map();
            for (let i = 0; i < processedData.length; i++) {
                const item = processedData[i];
                const key = item.y.trim().toLowerCase();
                if (map.has(key)) {
                    map.set(key, map.get(key) + 1);
                } else {
                    map.set(key, 1);
                }
            }
            let data = [];
            for (const [key, value] of map.entries()) {
                data.push({ x: key, y: value });
            }

            return (
                <View>
                    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                        <VictoryBar 
                            data={data}
                        />
                        <VictoryAxis
                            dependentAxis
                        />
                        <VictoryAxis
                            tickLabelComponent={
                                <VictoryLabel
                                    angle={-45}
                                />
                            }
                        />
                    </VictoryChart>
                </View>
            );
        }
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