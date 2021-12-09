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
import Log from '../../../graphql/types/Log';

export type LogCardProps = Log;

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'LogCard'>;

/**
 * @author Tony Comanzo, Lauren Velez, Emma Wirth
 */
const LogCard = ({ id, userId, dateTimeOfActivity, notes, categories, mood}: LogCardProps) => {

  const navigation = useNavigation<LogCardNavigationProp>();

  const date = new Date(0);
  date.setUTCSeconds(dateTimeOfActivity);

  return (
    <TouchableOpacity 
      style={[styles.paper]}
      onPress={() => {
        navigation.navigate("LogDetail", {
          id: id,
          userId: userId,
          dateTimeOfActivity: dateTimeOfActivity,
          notes: notes, 
          categories: categories,
          mood: mood,
        });
      }}
    >
      <View style={[styles.titleContainer]}>
      <Text style={[styles.dateText]}>{date.toDateString()}</Text>
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
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    flexGrow: 1,

  },
});

export default LogCard;