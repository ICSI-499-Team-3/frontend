import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { AppStackParamList } from '../navigation/AppStack';

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'LogShare'>;

const LogDetailBottomSheet = () => {

const navigation = useNavigation<LogCardNavigationProp>();

const options = [
    {
        name: "Delete",
        onPress: () => {
          navigation.navigate('LogDelete')
          console.log('pressed!');
        },
    },
    {
        name: "Share", 
        onPress: () => {
            navigation.navigate('LogShare')
            console.log('pressed!');
        },
    },
    {
        name: "Label",
        onPress: () => {
            navigation.navigate('LogLabel')
            console.log('pressed!');
        },
    },
    /*{
        name: "Share to Reddit",
        onPress: () => {
            console.log('pressed!');
        }, 
    },
    {
        name: "Share to Facebook", 
        onPress: () => {
            console.log('pressed!');
        },
    },
    {
        name: "Share to Twitter",
        onClick: () => {
            console.log('clicked');
        }, 
    },*/
    {
        name: "Edit",
        onClick: () => {
            console.log('clicked');
        },
    },
];
    return (
        <View>
            {options.map(option => (
                <TouchableOpacity onPress={option.onPress} key={option.name} style={styles.option}>
                    <Text>{option.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    option: {
        padding: 10,
    },
});

export default LogDetailBottomSheet;