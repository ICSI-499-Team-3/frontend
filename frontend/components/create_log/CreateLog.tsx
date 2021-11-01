import React, { useState, useLayoutEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { IconButton, TextInput as TextInputPaper } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation_stack/NavigationStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../chip/Chip';

type CreateLogProps = NativeStackScreenProps<RootStackParamList, 'CreateLog'>;

enum dateTimePickerModes {
    Date = "date", 
    Time = "time",
    DateTime = "datetime",
};

const CreateLog = ({ route, navigation }: CreateLogProps) => {

    const [titleText, setTitleText] = useState('');

    const categories = ['running', 'yoga', 'going out', 'physical therapy', 'therapy', 'eating', 'spending time with friends'];

    const moods = ['happy', 'sad', 'angry', 'stressed', 'anxious', 'goofy', 'spontaneous', 'excited'];

    const [selectedCategories, setSelectedCategories] = useState(new Set<string>());

    const [selectedMoods, setSelectedMoods] = useState(new Set<string>())

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [dateTimePickerMode, setDateTimePickerMode] = useState(dateTimePickerModes.Date);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedTime, setSelectedTime] = useState(new Date());

    const [contentText, setContentText] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirmed = (date: Date) => {
        switch (dateTimePickerMode) {
            case dateTimePickerModes.Date:
                setSelectedDate(date);
                hideDatePicker();
                break;
            case dateTimePickerModes.Time:
                setSelectedTime(date);
                hideDatePicker();
                break;
        }
    };

    const createLog = () => {
        const categoryString = [...selectedCategories].join(', ');
        const moodString = [...selectedMoods].join(', ');
        console.log(`
            ${titleText}, 
            ${selectedDate}
            ${selectedTime},
            ${contentText},
            ${categoryString},
            ${moodString}
        `);
    };

    const handlePickCategory = (category: string) => {
        if (selectedCategories.has(category)) {
            selectedCategories.delete(category);
        } else {
            selectedCategories.add(category);
        }
        setSelectedCategories(selectedCategories);
    };

    const handlePickMood = (mood: string) => {
        if (selectedMoods.has(mood)) {
            selectedMoods.delete(mood);
        } else {
            selectedMoods.add(mood);
        }
        setSelectedMoods(selectedMoods);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <IconButton 
                    icon="close"
                    size={20}
                    onPress={() => navigation.goBack()}
                />
            ),
            headerRight: () => (
                <Button 
                    onPress={createLog}
                    title="Create"
                    accessibilityLabel="Create log"
                />
            ),
            title: '',
        });
    }, [navigation, createLog]);

    return (
        <SafeAreaView style={styles.container}>
            <TextInputPaper
                label="Title"
                value={titleText}
                onChangeText={(text) => setTitleText(text)}
            />
            <View style={styles.moodsContainer}>
                <Text>Select categories (optional)</Text>
                <View style={styles.moodsGrid}>
                    {categories.map(category => (
                        <Chip key={category} text={category} onPress={() => handlePickCategory(category)} />
                    ))}
                </View>
            </View>
            <View style={styles.moodsContainer}>
                <Text>Select mood (optional)</Text>
                <View style={styles.moodsGrid}>
                    {moods.map(mood => (
                        <Chip key={mood} text={mood} onPress={() => handlePickMood(mood)} />
                    ))}
                </View>
            </View>
            <View style={styles.dateContainer}>
                <Button title="Pick date" onPress={() => {
                    setDateTimePickerMode(dateTimePickerModes.Date);
                    showDatePicker();
                }} />
                <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Button title="Pick time" onPress={() => {
                    setDateTimePickerMode(dateTimePickerModes.Time);
                    showDatePicker();
                }} />
                <Text style={styles.dateText}>{`${selectedTime.toLocaleTimeString()}`}</Text>
            </View>
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode={dateTimePickerMode}
                onConfirm={handleDateConfirmed}
                onCancel={hideDatePicker}
            />
            <TextInput 
                style={styles.contentInput}
                multiline
                placeholder="Add optional notes"
                onChangeText={setContentText}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        display: 'flex', 
        flexDirection: 'row',
    },
    moodsContainer: {
        paddingTop: 10,
    },
    moodsGrid: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dateContainer: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        marginLeft: 'auto',
    },
    contentInput: {
        flexGrow: 1,
    },
})

export default CreateLog;