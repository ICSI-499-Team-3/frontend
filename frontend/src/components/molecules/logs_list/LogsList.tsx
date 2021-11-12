import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LogCard from '../log_card/LogCard';
import { useQuery } from '@apollo/client';
import LogData from '../../../types/LogData';
import GET_LOGS_BY_USER_ID from '../../../queries/GetLogsByUserId';
import { useAuth } from '../../../contexts/Auth';

const LogsList = () => {

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<LogData>(GET_LOGS_BY_USER_ID, {
        variables: {
            userId: authData!.id,
        },
    });

	if (loading) return (
        <SafeAreaView style={styles.container}>
			<Text>Loading...</Text>
		</SafeAreaView>
    );

	if (error) return (
		<SafeAreaView>
			<Text>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

    if (data?.GetLogsByUserId.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No logs yet! Create one by tapping the floating action button.</Text>
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
    icon: {
        backgroundColor: "#00c2ff",
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute'
    }
});

export default LogsList;

