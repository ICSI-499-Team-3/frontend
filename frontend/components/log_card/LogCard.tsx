import React from 'react';
import {
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CardIcons from './CardIcons';

type LogCardProps = {
  title: string;
  content: string;
  categories: string[]; 
};

const LogCard = ({ title, content, categories }: LogCardProps) => {
  return (
    <View style={[styles.paper]}>
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleText]}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</Text>
        <CardIcons categories={categories} />
      </View>
      <Text style={[styles.contentText]}>{content.length > 150 ? `${content.substring(0, 150)}...` : content}</Text>
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    flexGrow: 1,
  },
  contentText: {
    paddingTop: 10,
  },
});

export default LogCard;