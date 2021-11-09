import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FlatList } from "react-native";
import MetricCard from "../metric_card/MetricCard";
import { useAuth } from '../../../contexts/Auth';
import { useQuery } from '@apollo/client';
import GET_METRICS_BY_USER_ID from '../../../queries/GetMetricsByUserId';
import MetricData from '../../../types/MetricData';

const MetricList = () => {

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<MetricData>(GET_METRICS_BY_USER_ID, {
        variables: {
            userId: authData!.id,
        },
    });

	if (loading) return (
        <SafeAreaView>
			<Text>{'Loading...'}</Text>
		</SafeAreaView>
    );

	if (error) return (
		<SafeAreaView>
			<Text>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

    if (data) {
        return (
            <FlatList
                data={data.GetMetricsByUserId}
                numColumns={2}
                renderItem={({ item }) => (
                    <MetricCard 
                        id={item.id}
                        userId={item.userId}
                        title={item.title}
                        xUnits={item.xUnits}
                        yUnits={item.yUnits}
                        data={item.data}
                    />
                )}
            />
        );
    }
};

export default MetricList;