import React from 'react';
import LogCard from '../log_card/LogCard';
import { View, Text, FlatList } from 'react-native';

type LogsViewProps = {
  data: { title: string; content: string; categories: string[] }[];
}

const LogsView = ({ data }: LogsViewProps) => {

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

export default LogsView;