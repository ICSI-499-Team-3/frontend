import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LogCard from '../log_card/LogCard';
import { useQuery, WatchQueryFetchPolicy } from '@apollo/client';
import LogData from '../../../graphql/types/LogData';
import GET_LOGS_BY_USER_ID from '../../../graphql/queries/GetLogsByUserId';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../../contexts/Auth';
import GetLogsBySharerAndShareeIdData from '../../../graphql/types/GetLogsBySharerAndShareeIdData';
import GET_LOGS_BY_SHARER_AND_SHAREE_ID from '../../../graphql/queries/GetLogsBySharerAndShareeId';
import Log from '../../../graphql/types/Log';

type LogsListProps = {
    userId: string;
};

const LogsList = ({ userId }: LogsListProps) => {

    const { authData } = useAuth();

    const queryOptions = {
        query: authData?.id === userId ? GET_LOGS_BY_USER_ID : GET_LOGS_BY_SHARER_AND_SHAREE_ID,
        options: {
            variables: authData?.id === userId ? { userId: userId } : { sharerId: userId, shareeId: authData?.id },
            fetchPolicy: authData?.id === userId ? 'cache-first' : 'cache-and-network',
        },
    };

    const { loading, error, data } = useQuery<LogData | GetLogsBySharerAndShareeIdData>(queryOptions.query, {
        variables: queryOptions.options.variables, 
        fetchPolicy: queryOptions.options.fetchPolicy as WatchQueryFetchPolicy,
    });

	if (loading) return (
        <SafeAreaView style={styles.messageContainer}>
			<ActivityIndicator/><Text style={styles.message}>Loading...</Text>
		</SafeAreaView>
    );

	if (error) return (
		<SafeAreaView style={styles.messageContainer}>
			<Text style={styles.message}>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

    if ((data as LogData).GetLogsByUserId && (data as LogData).GetLogsByUserId.length === 0) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>No logs yet! Create one by tapping the floating action button.</Text>
            </View>
        );
    }
    
    // copy log list and reverse
    let logs: Log[] = [];
    if ((data as LogData).GetLogsByUserId) {
        logs = (data as LogData).GetLogsByUserId.map(x => x).reverse();
    }
    if ((data as GetLogsBySharerAndShareeIdData).GetLogsBySharerAndShareeId) {
        logs = (data as GetLogsBySharerAndShareeIdData).GetLogsBySharerAndShareeId.map(x => x).reverse();
    }

    const pressHandler = () => {
        console.log("it do be workin");
    }

	return (
        <FlatList 
            style={styles.container}
            data={logs}
            renderItem={({ item }) => (
                <TouchableOpacity onLongPress={() => pressHandler()}>
                    <LogCard 
                        id={item.id}
                        userId={item.userId}
                        dateTimeOfActivity={item.dateTimeOfActivity}
                        notes={item.notes}
                        categories={item.categories}
                        mood={item.mood}
                    />
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    messageContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: "#00c2ff",
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute'
    },
    message: {
        fontSize: 21,
        paddingHorizontal: 30,
        color: 'black',
        textAlign: 'center',
    },
});

export default LogsList;

