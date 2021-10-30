import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const options = [
    {
        name: "Delete",
    },
    {
        name: "Share", 
    },
    {
        name: "Label",
    },
    {
        name: "Share to Reddit", 
    },
    {
        name: "Share to Facebook", 
    },
    {
        name: "Share to Twitter", 
    },
    {
        name: "Edit",
    },
];

const LogDetailBottomSheet = () => {
    return (
        <View>
            {options.map(option => (
                <TouchableOpacity style={styles.option}>
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