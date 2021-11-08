import React, { useState, useLayoutEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { IconButton, TextInput as TextInputPaper } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/NavigationStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../components/atoms/chip/Chip';
import { useMutation } from '@apollo/client';
import Log from '../types/Log';
import LogInput from '../types/LogInput';
import CREATE_LOG from '../mutations/CreateLog';
import GET_ALL_LOGS from '../queries/GetAllLogs';

type CreateLogProps = NativeStackScreenProps<RootStackParamList, 'CreateLog'>;

enum dateTimePickerModes {
    Date = "date", 
    Time = "time",
    DateTime = "datetime",
}

const CreateLog = ({ route, navigation }: CreateLogProps) => {

    const categories = ['running', 'yoga', 'going out', 'physical therapy', 'therapy', 'eating', 'spending time with friends'];

    const moods = ['happy', 'sad', 'angry', 'stressed', 'anxious', 'goofy', 'spontaneous', 'excited'];

    const [selectedCategories, setSelectedCategories] = useState(new Set<string>());

    const [selectedMoods, setSelectedMoods] = useState(new Set<string>())

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [dateTimePickerMode, setDateTimePickerMode] = useState(dateTimePickerModes.Date);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedTime, setSelectedTime] = useState(new Date());

    const [selectedDateTime, setSelectedDateTime] = useState(new Date().getTime() / 1000);

    const [contentText, setContentText] = useState('');

    const [createLog] = useMutation<{ createLog: Log }, { input: LogInput }>(CREATE_LOG, {
        variables: {
            input: {
                dateTimeOfActivity: selectedDateTime, 
                notes: contentText, 
                categories: Array.from(selectedCategories), 
                mood: Array.from(selectedMoods),
            }
        },
        onCompleted: (data) => {
            console.log(`completed CreateLog: ${data}`);
            navigation.goBack();
        }, 
        onError: (error) => console.log(`Error on CreateLog: ${error}`),
        refetchQueries: [
            GET_ALL_LOGS, 
            'GetAllLogs',
        ],
    });

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirmed = (date: Date) => {
        switch (dateTimePickerMode) {
            case dateTimePickerModes.Date: {
                    const dateTime = new Date(
                        date.getFullYear(),
                        date.getMonth(), 
                        date.getDate(), 
                        selectedTime.getHours(), 
                        selectedTime.getMinutes(), 
                        selectedTime.getSeconds(), 
                        selectedTime.getMilliseconds()
                    );
                    const epoch = dateTime.getTime() / 1000;
                    const epochDate = new Date(0);
                    epochDate.setUTCSeconds(epoch);
                    setSelectedDateTime(epoch);
                    setSelectedDate(date);
                    hideDatePicker();
                }
                break;
            case dateTimePickerModes.Time: {
                    const dateTime = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(), 
                        selectedDate.getDate(), 
                        date.getHours(), 
                        date.getMinutes(), 
                        date.getSeconds(), 
                        date.getMilliseconds()
                    );
                    const epoch = dateTime.getTime() / 1000;
                    const epochDate = new Date(0);
                    epochDate.setUTCSeconds(epoch);
                    setSelectedDateTime(epoch);
                    setSelectedTime(date);
                    hideDatePicker();
                }
                break;
        }
    };

    const handleCreate = () => {
        const categoryString = [...selectedCategories].join(', ');
        const moodString = [...selectedMoods].join(', ');
        console.log(`
            ${selectedDate}
            ${selectedTime},
            ${contentText},
            ${categoryString},
            ${moodString}
        `);

        const y = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(), 
            selectedDate.getDate(), 
            selectedTime.getHours(), 
            selectedTime.getMinutes(), 
            selectedTime.getSeconds(), 
            selectedTime.getMilliseconds()
        );
        console.log(y.toString());
        const epoch = y.getTime() / 1000;
        console.log(epoch);
        const j = new Date(0);
        j.setUTCSeconds(epoch);
        console.log(j.toString());

        createLog();
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
                    onPress={handleCreate}
                    title="Create"
                    accessibilityLabel="Create log"
                />
            ),
            title: '',
        });
    }, [navigation, handleCreate]);

    return (
        <SafeAreaView style={styles.container}>
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