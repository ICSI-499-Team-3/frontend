import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LogCard from '../log_card/LogCard';
import { useQuery } from '@apollo/client';
import LogData from '../../../graphql/types/LogData';
import GET_LOGS_BY_USER_ID from '../../../graphql/queries/GetLogsByUserId';
import { useAuth } from '../../../contexts/Auth';
import { ActivityIndicator } from 'react-native-paper';

const LogsList = () => {

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<LogData>(GET_LOGS_BY_USER_ID, {
        variables: {
            userId: authData!.id,
        },
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

    if (data?.GetLogsByUserId.length === 0) {
        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>No logs yet! Create one by tapping the floating action button.</Text>
            </View>
        );
    }
    
    // copy log list and reverse
	const logs = data?.GetLogsByUserId.map(x => x).reverse();

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

