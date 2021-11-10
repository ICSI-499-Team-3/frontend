//Emma
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import { RootStackParamList } from '../../../navigation/NavigationStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native'

export type RecCardProps = {
    title: string;
    content: string;
  };

  type RecCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecCard'>;

  const RecCard = ({ title, content }: RecCardProps) => {

    const navigation = useNavigation<RecCardNavigationProp>();

    const handlerLongClick = () => {
      Alert.alert("Long Press");
    };

    return (
      <TouchableOpacity 
      style={[styles.paper]}
      onPress={() => {
        navigation.navigate("RecDetail", {
          title: title, 
          content: content
        });
      }}
      onLongPress={handlerLongClick}
    >
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleText]}>{title.length > 20 ? `${title.substring(0, 20)}...` : title}</Text>
      </View>
      <Text style={[styles.contentText]}>{content.length > 150 ? `${content.substring(0, 150)}...` : content}</Text>
    </TouchableOpacity>
    );

};  

const styles = StyleSheet.create({
  paper: {
    backgroundColor: 'white', 
    padding: 10,
    margin: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  titleContainer: {
    display: 'flex', 
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentText: {
    paddingTop: 10, //space in between title and rec
  },
});

export default RecCard;