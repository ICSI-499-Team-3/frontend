import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStackParamList } from '../../../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

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
            navigation.navigate('AddLabel')
            console.log('pressed!');
        },
    },
    {
        name: "Edit",
        onPress: () => {
            navigation.navigate('LogEdit')
            console.log('pressed!');
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