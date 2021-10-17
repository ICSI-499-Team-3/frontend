import React from 'react';
import {
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';

type LogCardProps = {
  title: string;
  content: string;
  categories: string[]; 
};

const LogCard = ({ title, content, categories }: LogCardProps) => {
  console.log(categories);
  return (
    <View style={[styles.paper]}>
      <View style={[styles.titleContainer]}>
        <Text style={[{flexGrow: 1}]}>{title}</Text>
        <View style={[styles.categoriesContainer]}>
          {categories.map(category => <Text key={category}>{category}</Text>)}
        </View>
      </View>
      <Text>{content.length > 150 ? `${content.substring(0, 150)}...` : content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paper: {
    backgroundColor: 'white', 
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    display: 'flex', 
    flexDirection: 'row',
  },
  categoriesContainer: {
    display: 'flex', 
    flexDirection: 'row',
  },
});

export default LogCard;