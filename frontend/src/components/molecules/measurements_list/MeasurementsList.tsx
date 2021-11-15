import React from 'react';
import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FAB, Divider } from 'react-native-paper';
import { AppStackParamList } from '../../../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Measurement from '../../../types/Measurement';
import GET_METRIC_BY_ID from '../../../queries/GetMetricById';
import GetMetricByIdData from '../../../types/GetMetricByIdData';

export type MeasurementsListNavigationProps = {
    metricId: string;
};

type MeasurementsListProps = NativeStackScreenProps<AppStackParamList, 'MeasurementsList'>;

const MeasurementsList = ({ route, navigation }: MeasurementsListProps) => {

    const { metricId } = route.params;

    const { loading, error, data } = useQuery<GetMetricByIdData, { metricId: string; }>(GET_METRIC_BY_ID, {
        variables: {
            metricId: metricId,
        },
    });

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

        const { id, title } = data.GetMetricById;
        const reversedData = data.GetMetricById.data.map(item => item).reverse();

        return (
            <View style={styles.container}>
                <FlatList
                    data={reversedData}
                    renderItem={({ item }) => (
                        <View>
                            <MeasurementsListItem 
                                id={item.id}
                                x={item.x}
                                y={item.y}
                                dateTimeMeasured={item.dateTimeMeasured}
                            />
                            <Divider />
                        </View>
                    )}
                />
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => navigation.navigate('CreateMeasurement', {
                        metricId: id,
                        title: title, 
                    })}
                />
            </View>
        );
    }
};

type MeasurementsListItemProps = Measurement;

const MeasurementsListItem = ({ id, x, y, dateTimeMeasured }: MeasurementsListItemProps) => {
    
    const xDate = new Date(0);
    xDate.setUTCSeconds(parseFloat(x));

    const date = new Date(0);
    date.setUTCSeconds(dateTimeMeasured);
    const formattedDate = date.toLocaleString();

    return (
        <View style={styles.measurementItem}>
            <Text>{formattedDate}</Text>
            <Text>{`${xDate.toString()}, ${y}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingBottom: 50,
    },
    fab: {
        position: 'absolute',
        marginBottom: 96,
        marginRight: 16,
        right: 0,
        bottom: 0,
    },
    measurementItem: {
        padding: 10,
    },
});

export default MeasurementsList;