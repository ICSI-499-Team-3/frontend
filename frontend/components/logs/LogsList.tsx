import React from 'react';
import { View, FlatList } from 'react-native';
import LogCard from '../log_card/LogCard';

type LogsListProps = {
    data: { title: string; content: string; categories: string[] }[];
};

const LogsList = ({ data }: LogsListProps) => {

    return (
        <View>
            <FlatList 
                data={data} 
                renderItem={({ item }) => (
                    <LogCard 
                        title={item.title} 
                        content={item.content}
                        categories={item.categories}
                    />
                )}
            />
        </View>
    );
};

export default LogsList;