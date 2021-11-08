import React, { useLayoutEffect } from 'react';
import { RootStackParamList } from '../navigation/NavigationStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { IconButton } from 'react-native-paper';

type MetricDetailProps = NativeStackScreenProps<RootStackParamList, 'MetricDetail'>;

const MetricDetail = ({ route, navigation }: MetricDetailProps) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MetricDetailOptions />
            ),
        });
    }, [navigation]);

    const { title, xUnits, yUnits, data } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <VictoryChart 
                theme={VictoryTheme.material}
            >
                <VictoryLine data={data} />
                {/* <VictoryAxis style={{
                    axis: { stroke: 'transparent' }, 
                    ticks: { stroke: 'transparent' }, 
                    tickLabels: { fill: 'transparent' },
                }} /> */}
            </VictoryChart>
        </View>
    );
};

const MetricDetailOptions = () => {
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
                onPress={() => console.log('clicked')}
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
});

export default MetricDetail;