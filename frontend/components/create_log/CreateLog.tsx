import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { IconButton, TextInput as TextInputPaper } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation_stack/NavigationStack';

type CreateLogProps = NativeStackScreenProps<RootStackParamList, 'CreateLog'>;

const CreateLog = ({ route, navigation }: CreateLogProps) => {

    const [titleText, setTitleText] = useState('');

    const moods = ['happy', 'sad', 'angry', 'stressed', 'anxious', 'goofy', 'spontaneous', 'excited'];

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            {/* TODO: use a custom navigation header instead */}
            <View style={styles.header}>
                <IconButton 
                    icon="close"
                    size={20}
                    onPress={() => navigation.goBack()}
                />
                <Button 
                    onPress={() => console.log('pressed')}
                    title="Create"
                    accessibilityLabel="Create log"
                />
            </View>
            <TextInputPaper
                label="Title"
                value={titleText}
                onChangeText={text => setTitleText(text)}
            />
            <Text>How did you feel?</Text>
            <View style={styles.moodsContainer}>
                {moods.map(mood => (
                    <View style={styles.moodItem}>
                        <Text>{mood}</Text>
                    </View>
                ))}
            </View>
            <Text>Pick the date and time</Text>
            <Button title="Add date" onPress={showDatePicker} />
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TextInput 
                multiline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        display: 'flex', 
        flexDirection: 'row',
    },
    moodsContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    moodItem: {
        padding: 30,
        borderColor: 'black',
        borderWidth: 2,
    },
})

export default CreateLog;