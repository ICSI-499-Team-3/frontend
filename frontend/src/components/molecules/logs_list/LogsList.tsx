import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text } from 'react-native';
import LogCard from '../log_card/LogCard';
import { useQuery } from '@apollo/client';
import LogData from '../../../types/LogData';
import GET_ALL_LOGS from '../../../queries/GetAllLogs';

const LogsList = () => {

    const { loading, error, data } = useQuery<LogData>(GET_ALL_LOGS);

	if (loading) return <Text>{'\n\n\nLoading...'}</Text>

	if (error) return (
		<SafeAreaView>
			<Text>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

	const logs = data?.GetAllLogs.map(x => x).reverse();
    
	return (
        <SafeAreaView>
            <FlatList 
                data={logs} 
                renderItem={({ item }) => (
                    <LogCard 
						id={item.id}
                        dateTimeOfActivity={item.dateTimeOfActivity}
                        notes={item.notes}
                        categories={item.categories}
                        mood={item.mood}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default LogsList;