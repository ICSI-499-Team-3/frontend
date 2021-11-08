import React from 'react';
import { FlatList } from "react-native";
import MetricCard from "../metric_card/MetricCard";

const MetricList = () => {

    const data = [
        {
            title: 'wake up time', 
            xUnits: 'seconds', 
            yUnits: '',
            data: [
                { x: 1, y: 2},
                { x: 2, y: 3},
                { x: 3, y: 5}, 
                { x: 4, y: 4},
                { x: 5, y: 7},
            ],
        },
        {
            title: 'heart rate', 
            xUnits: 'seconds', 
            yUnits: 'bpm', 
            data: [
                { x: 1, y: 2},
                { x: 2, y: 3},
                { x: 3, y: 5}, 
                { x: 4, y: 4},
                { x: 5, y: 7},
            ],
        },
        {
            title: 'blood pressure', 
            xUnits: 'seconds', 
            yUnits: '',
            data: [
                { x: 1, y: 2},
                { x: 2, y: 3},
                { x: 3, y: 5}, 
                { x: 4, y: 4},
                { x: 5, y: 7},
            ],
        },
    ];
    
    return (
        <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => (
                <MetricCard 
                    title={item.title}
                    xUnits={item.xUnits}
                    yUnits={item.yUnits}
                    data={item.data}
                />
            )}
        />
    );
};

export default MetricList;