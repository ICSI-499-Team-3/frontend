import React from 'react';
import MetricList from '../components/molecules/metric_list/MetricList';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SharedMetricViewNavigationProps = NativeStackScreenProps<AppStackParamList, 'SharedMetricView'>;

export type SharedMetricViewProps = {
    userId: string;
};

const SharedMetricView = ({ route }: SharedMetricViewNavigationProps) => {

    const { userId } = route.params;

    return (
        <MetricList userId={userId} />
    );
};

export default SharedMetricView;