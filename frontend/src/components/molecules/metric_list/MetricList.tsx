import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from "react-native";
import MetricCard from "../metric_card/MetricCard";
import { useAuth } from '../../../contexts/Auth';
import { useQuery } from '@apollo/client';
import GET_METRICS_BY_USER_ID from '../../../graphql/queries/GetMetricsByUserId';
import GetMetricsByUserIdData from '../../../graphql/types/GetMetricsByUserIdData';
import GET_METRICS_BY_SHARER_AND_SHAREE_ID from '../../../graphql/queries/GetMetricsBySharerAndShareeId';
import GetMetricsBySharerAndShareeIdData from '../../../graphql/types/GetMetricsBySharerAndShareeIdData';
import Metric from '../../../graphql/types/Metric';

type MetricListProps = {
    userId: string;
};

const MetricList = ({ userId }: MetricListProps) => {

    const { authData } = useAuth();

    if (authData?.id === userId) {
        return <CurrentUserMetricList userId={userId} />
    } else {
        return <SharedContentMetricList sharerId={userId} shareeId={authData?.id ?? ''} />
    }
};

type SharedContentMetricListProps = {
    sharerId: string;
    shareeId: string;
};

const SharedContentMetricList = ({ sharerId, shareeId }: SharedContentMetricListProps) => {

    const { loading, error, data } = useQuery<GetMetricsBySharerAndShareeIdData, { sharerId: string; shareeId: string; }>(GET_METRICS_BY_SHARER_AND_SHAREE_ID, {
        variables: {
            sharerId: sharerId,
            shareeId: shareeId,
        },
        fetchPolicy: 'cache-and-network',
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

    return (
        <MetricCardList data={data?.GetMetricsBySharerAndShareeId ?? []} />
    );
};

type CurrentUserMetricListProps = {
    userId: string;
};

const CurrentUserMetricList = ({ userId}: CurrentUserMetricListProps) => {

    const { loading, error, data } = useQuery<GetMetricsByUserIdData, { userId: string; }>(GET_METRICS_BY_USER_ID, {
        variables: {
            userId: userId,
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

    return (
        <MetricCardList data={data?.GetMetricsByUserId ?? []} />
    );
};

type MetricCardListProps = {
    data: Metric[];
};

const MetricCardList = ({ data }: MetricCardListProps) => {
    return (
        <FlatList
            style={styles.container}
            data={data}
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
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});

export default MetricList;