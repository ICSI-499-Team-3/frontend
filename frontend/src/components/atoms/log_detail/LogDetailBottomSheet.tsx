import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export type LogDetailBottomSheetProps = {
    options: {
        name: string;
        onPress: () => void;
    }[];
};

/**
 * @author Tony Comanzo, Lauren Velex, Emma Wirth 
 */
const LogDetailBottomSheet = ({ options }: LogDetailBottomSheetProps) => {

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