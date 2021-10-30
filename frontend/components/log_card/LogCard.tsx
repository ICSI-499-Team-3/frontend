import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CardIcons from '../card_icons/CardIcons';
import { LogsViewHomeProps } from '../log_view_home/LogsViewHome';
import { LogStackParamList } from '../logs_view/LogsView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type LogCardProps = {
  title: string;
  createdAt: number;
  content: string;
  categories: string[]; 
  mood: string;
};

type LogCardNavigationProp = NativeStackNavigationProp<LogStackParamList, 'LogCard'>;

const LogCard = ({ title, createdAt, content, categories, mood }: LogCardProps) => {

  const navigation = useNavigation<LogCardNavigationProp>();

  return (
    <TouchableOpacity 
      style={[styles.paper]}
      onPress={() => {
        navigation.navigate("LogDetail", {
          title: title, 
          createdAt: createdAt,
          content: content, 
          categories: categories,
          mood: mood,
        });
      }}
    >
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleText]}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</Text>
        <CardIcons categories={categories} />
      </View>
      <Text style={[styles.contentText]}>{content.length > 150 ? `${content.substring(0, 150)}...` : content}</Text>
    </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    flexGrow: 1,
  },
  contentText: {
    paddingTop: 10,
  },
});

export default LogCard;