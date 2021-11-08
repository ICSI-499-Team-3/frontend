import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CardIcons from '../../atoms/card_icons/CardIcons';
import { AppStackParamList } from '../../../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Log from '../../../types/Log';

export type LogCardProps = Log;

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'LogCard'>;

const LogCard = ({ id, dateTimeOfActivity, notes, categories, mood }: LogCardProps) => {

  const navigation = useNavigation<LogCardNavigationProp>();

  return (
    <TouchableOpacity 
      style={[styles.paper]}
      onPress={() => {
        navigation.navigate("LogDetail", {
          id: id,
          dateTimeOfActivity: dateTimeOfActivity,
          notes: notes, 
          categories: categories,
          mood: mood,
        });
      }}
    >
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleText]}>{notes ? (notes.length > 20 ? `${notes.substring(0, 20)}...` : notes) : ''}</Text>
        <CardIcons categories={categories ? categories : []} />
      </View>
      <Text style={[styles.contentText]}>{notes ? (notes.length > 150 ? `${notes.substring(0, 150)}...` : notes) : ''}</Text>
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