import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type ChipProps = {
    text: string;
    onPress: Function;
};

const Chip = ({ text, onPress }: ChipProps) => {

    const [selected, setSelected] = useState(false);

    return (
        <Pressable 
            key={text} 
            style={() => [
                { backgroundColor: selected ? "#9FE3FF" : "white" },
                styles.chip,
            ]}
            onPress={() => {
                setSelected(!selected);
                onPress();
            }}
        >
            <Text>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    chip: {
        padding: 10,
        margin: 5,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
    },
});

export default Chip;