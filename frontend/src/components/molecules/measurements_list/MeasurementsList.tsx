import React, { useState, useLayoutEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FAB, Divider, IconButton } from 'react-native-paper';
import { AppStackParamList } from '../../../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Measurement from '../../../graphql/types/Measurement';
import GET_METRIC_BY_ID from '../../../graphql/queries/GetMetricById';
import GetMetricByIdData from '../../../graphql/types/GetMetricByIdData';
import { CreateMeasurementMode } from '../../../screens/CreateMeasurement';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DELETE_MEASUREMENT from '../../../graphql/mutations/DeleteMeasurement';
import DeleteMeasurementData from '../../../graphql/types/DeleteMeasurementData';
import { useAuth } from '../../../contexts/Auth';

export type MeasurementsListNavigationProps = {
    metricId: string;
    userId: string;
};

type MeasurementsListProps = NativeStackScreenProps<AppStackParamList, 'MeasurementsList'>;

/**
 * @author Tony Comanzo 
 */
const MeasurementsList = ({ route, navigation }: MeasurementsListProps) => {

    const [selectedListItems, setSelectedListItems] = useState(new Set<string>());

    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const [mode, setMode] = useState(MeasurementsListMode.Regular);

    const onSelect = (measurement: Measurement) => {

        /* only perform logic if the user id of the metric is the same
        as the currently logged in user */
        if (authData?.id !== userId) {
            return;
        }
        if (selectedListItems.has(measurement.id)) {
            selectedListItems.delete(measurement.id);
        } else {
            selectedListItems.add(measurement.id);
        }

        setSelectedListItems(selectedListItems);

        if (selectedListItems.size > 0) {
            setShowDeleteButton(true);
            setMode(MeasurementsListMode.Delete);
        } else {
            setShowDeleteButton(false);
            setMode(MeasurementsListMode.Regular);
        }
    };

    const { metricId, userId } = route.params;

    const { authData } = useAuth();

    const handleDelete = () => {
        // console.log(`${[...selectedListItems]}`);

        // for some reason, declaring the variables in the useMutation hook was preventing 
        // all of the selectedListItems from getting deleted. for some reason, only the first
        // one you selected got sent to server. defining the variables here seemingly fixes it. 
        deleteMeasurement({
            variables: {
                metricId: metricId, 
                input: [...selectedListItems],
            },
        });
        selectedListItems.clear();
        setSelectedListItems(selectedListItems);
        setShowDeleteButton(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (showDeleteButton) {
                    return (
                        <IconButton 
                            icon="delete-outline"
                            size={20}
                            onPress={handleDelete}
                        />
                    );
                } else {
                    return (
                        <View></View>
                    );
                }
            },
            title: '',
        });
    }, [navigation, showDeleteButton]);

    const [deleteMeasurement] = useMutation<DeleteMeasurementData, { metricId: string; input: string[]; }>(DELETE_MEASUREMENT, {
        refetchQueries: [
            GET_METRIC_BY_ID, 
            'GetMetricById',
        ],
    });

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
        const reversedData = data.GetMetricById.data.map(item => item).sort((a, b) => a.dateTimeMeasured - b.dateTimeMeasured).reverse();

        return (
            <View style={styles.container}>
                <FlatList
                    data={reversedData}
                    renderItem={({ item }) => (
                        <MeasurementsListItem 
                            measurement={item}
                            metricId={metricId}
                            userId={userId}
                            title={title}
                            onLongPress={onSelect}
                            mode={mode}
                        />
                    )}
                />
                {
                    /* only show fab if the user if of the metric is the 
                    same as the currently logged in user */
                    authData?.id === userId && 
                    <FAB
                        style={styles.fab}
                        icon="plus"
                        onPress={() => navigation.navigate('CreateMeasurement', {
                            metricId: metricId,
                            title: title, 
                            mode: CreateMeasurementMode.Create,
                        })}
                    />
                }
            </View>
        );
    }
};

enum MeasurementsListMode {
    Regular, Delete
};

type MeasurementsListItemProps = {
    measurement: Measurement;
    metricId: string;
    userId: string;
    title: string;
    onLongPress: Function;
    mode: MeasurementsListMode;
};

type MeasurementsListItemNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MeasurementsListItem'>;

/**
 * @author Tony Comanzo 
 */
const MeasurementsListItem = ({ measurement, metricId, userId, title, onLongPress, mode }: MeasurementsListItemProps) => {

    const navigation = useNavigation<MeasurementsListItemNavigationProp>();

    const { authData } = useAuth();

    const [selected, setSelected] = useState(false);

    const { x, y, dateTimeMeasured } = measurement;
    
    const xDate = new Date(0);
    xDate.setUTCSeconds(parseFloat(x));

    const date = new Date(0);
    date.setUTCSeconds(dateTimeMeasured);
    const formattedDate = date.toLocaleString();

    const navigate = () => {
        navigation.navigate('CreateMeasurement', {
            metricId: metricId, 
            title: title, 
            mode: CreateMeasurementMode.Update, 
            measurementData: measurement,
        });
    };

    const handleSelect = () => {
        /* only perform logic if the user id of the metric is the same
        as the currently logged in user */
        if (authData?.id !== userId) {
            return;
        }
        setSelected(!selected);
        onLongPress(measurement);
    };

    const handleOnPress = () => {
        mode === MeasurementsListMode.Delete 
        ? handleSelect()
        : navigate();
    };

    return (
        <TouchableOpacity
            disabled={authData?.id !== userId}
            style={selected ? styles.selectedListItem : {}}
            onLongPress={handleSelect}
            onPress={handleOnPress}
        >
            <View style={styles.measurementItem}>
                <Text>{formattedDate}</Text>
                <Text>{`${xDate.toString()}, ${y}`}</Text>
            </View>
            <Divider />
        </TouchableOpacity>
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
    selectedListItem: {
        backgroundColor: "#9FE3FF",
    },
});

export default MeasurementsList;