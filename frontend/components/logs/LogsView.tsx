import React from 'react';
import LogCard from '../log_card/LogCard';
import { View, Text, FlatList } from 'react-native';

const LogView = () => {

  const data = [
    {
      title: "Title", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2"
      ],
    },
    {
      title: "Title", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2"
      ],
    },
    {
      title: "Title", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2"
      ],
    },
    {
      title: "Title", 
      content: "Content", 
      categories: [
        "cat 1", 
        "cat 2"
      ],
    },
  ];

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

export default LogView;