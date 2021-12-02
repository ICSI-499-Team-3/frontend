import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../navigation/AppStack';
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from 'victory-native';
import Metric from '../../../graphql/types/Metric';

export type MetricCardProps = Metric;

type MetricCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'MetricCard'>;

const MetricCard = ({ id, userId, title, xUnits, yUnits, data }: MetricCardProps) => {

    const navigation = useNavigation<MetricCardNavigationProp>();

    const handlePress = () => {
        navigation.navigate("MetricDetail", {
            metricId: id,
            userId: userId,
        });
    };

    // regex for validating that a string is a number
    // const regex = /^\d+$/;
    const regex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    let numbersOnly = true;
    for (let i = 0; i < data.length; i++) {
        if (!regex.test(data[i].y.trim())) {
            numbersOnly = false;
            break;
        }
    }

    const processedData = data.map(item => {
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
            <TouchableOpacity 
                style={[styles.paper, styles.container]}
                onPress={handlePress}
            >
                <Text style={styles.titleText}>{title.substring(0, 14)}</Text>
                <VictoryChart 
                    padding={{top: 0, right: 0, bottom: 0, left: 0}} 
                    width={150} 
                    height={150} 
                    theme={VictoryTheme.material}
                >
                    <VictoryLine data={processedData} />
                    <VictoryAxis style={{
                        axis: { stroke: 'transparent' }, 
                        ticks: { stroke: 'transparent' }, 
                        tickLabels: { fill: 'transparent' },
                    }} />
                </VictoryChart>
            </TouchableOpacity>
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
            <TouchableOpacity 
                style={[styles.paper, styles.container]}
                onPress={handlePress}
            >
                <Text style={styles.titleText}>{title.substring(0, 14)}</Text>
                <VictoryChart 
                    theme={VictoryTheme.material} 
                    domainPadding={20}
                    padding={{top: 0, right: 0, bottom: 0, left: 0}} 
                    width={150} 
                    height={150} 
                >
                    <VictoryBar 
                        data={data}
                    />
                </VictoryChart>
            </TouchableOpacity>
        );
    }
    
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