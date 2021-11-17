import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from "react-native";
import MetricCard from "../metric_card/MetricCard";
import { useAuth } from '../../../contexts/Auth';
import { useQuery } from '@apollo/client';
import GET_METRICS_BY_USER_ID from '../../../graphql/queries/GetMetricsByUserId';
import GetMetricsByUserIdData from '../../../graphql/types/GetMetricsByUserIdData';

const MetricList = () => {

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<GetMetricsByUserIdData, { userId: string; }>(GET_METRICS_BY_USER_ID, {
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
                style={styles.container}
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

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});

export default MetricList;