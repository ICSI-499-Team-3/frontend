import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { IconButton } from 'react-native-paper';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MetricDetailProps = NativeStackScreenProps<AppStackParamList, 'MetricDetail'>;

const MetricDetail = ({ route, navigation }: MetricDetailProps) => {

    const { id, userId, title, xUnits, yUnits, data } = route.params;

    const editPressHandler = () => {
        navigation.navigate("MeasurementsList", route.params);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MetricDetailOptions 
                    sharePressHandler={() => {}}
                    deletePressHander={() => {}}
                    editPressHandler={editPressHandler}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <VictoryChart 
                theme={VictoryTheme.material}
            >
                <VictoryLine data={data} />
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
                onPress={() => console.log('clicked')}
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