import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/AppStack';
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import Metric from '../../../types/Metric';

export type MetricCardProps = Metric;

type MetricCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricCard'>;

const MetricCard = ({ id, userId, title, xUnits, yUnits, data }: MetricCardProps) => {

    const navigation = useNavigation<MetricCardNavigationProp>();

    const handlePress = () => {
        navigation.navigate("MetricDetail", {
            metricId: id,
        });
    };

    return (
        <TouchableOpacity 
            style={[styles.paper, styles.container]}
            onPress={handlePress}
        >
            <Text style={styles.titleText}>{title.substring(0, 14)}</Text>
            <VictoryChart 
                padding={{top: 0, right: 0, bottom: 0, left: 0}} 
                width={150} height={150} 
                theme={VictoryTheme.material}
            >
                <VictoryLine data={data} />
                <VictoryAxis style={{
                    axis: { stroke: 'transparent' }, 
                    ticks: { stroke: 'transparent' }, 
                    tickLabels: { fill: 'transparent' },
                }} />
            </VictoryChart>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        backgroundColor: 'white', 
        padding: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1,
    },
});

export default MetricCard;