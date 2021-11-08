import React from 'react';
import { View } from 'react-native';
import MetricList from "../components/molecules/metric_list/MetricList";

const MetricView = () => {
    return (
        <View style={{display: 'flex', alignItems: 'center'}}>
            <MetricList />
        </View>
    );
};

export default MetricView;