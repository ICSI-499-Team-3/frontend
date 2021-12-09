import React, { useState, useLayoutEffect } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { IconButton, TextInput as TextInputPaper } from 'react-native-paper';
import DateTimePicker, { dateTimePickerModes } from '../components/atoms/date_time_picker/DateTimePicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../components/atoms/chip/Chip';
import { useMutation } from '@apollo/client';
import Log from '../graphql/types/Log';
import LogInput from '../graphql/types/LogInput';
import CREATE_LOG from '../graphql/mutations/CreateLog';
import GET_LOGS_BY_USER_ID from '../graphql/queries/GetLogsByUserId';
import { useAuth } from '../contexts/Auth';

type CreateLogProps = NativeStackScreenProps<AppStackParamList, 'CreateLog'>;

/**
 * @author Tony Comanzo 
 */
const CreateLog = ({ route, navigation }: CreateLogProps) => {

    const categories = ['Running', 'Yoga', 'Going out', 'Physical therapy', 'Therapy', 'Eating', 'Spending time with friends'];

    const moods = ['Happy', 'Sad', 'Angry', 'Stressed', 'Anxious', 'Goofy', 'Spontaneous', 'Excited'];

    const [selectedCategories, setSelectedCategories] = useState(new Set<string>());

    const [selectedMoods, setSelectedMoods] = useState(new Set<string>());

    const [contentText, setContentText] = useState('');

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState(new Date().getTime() / 1000);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [dateTimePickerMode, setDateTimePickerMode] = useState(dateTimePickerModes.Date);

    const { authData } = useAuth();

    const [createLog] = useMutation<{ CreateLog: Log; }, { input: LogInput; }>(CREATE_LOG, {
        onCompleted: (data) => {
            console.log(`completed CreateLog: ${data}`);
            navigation.goBack();
        },
        onError: (error) => console.log(`Error on CreateLog: ${error}`),
        refetchQueries: [
            GET_LOGS_BY_USER_ID,
            'GetLogsByUserId',
        ],
    });

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

        createLog({
            variables: {
                input: {
                    userId: authData!.id,
                    dateTimeOfActivity: selectedDateTime,
                    notes: contentText,
                    categories: Array.from(selectedCategories),
                    mood: Array.from(selectedMoods),
                }
            }
        });
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
                    onPress={() => navigation.goBack()} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} />
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
                    setIsDatePickerVisible(true);
                }} />
                <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Button title="Pick time" onPress={() => {
                    setDateTimePickerMode(dateTimePickerModes.Time);
                    setIsDatePickerVisible(true);
                }} />
                <Text style={styles.dateText}>{`${selectedTime.toLocaleTimeString()}`}</Text>
            </View>
            <DateTimePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDateTime={selectedDateTime}
                setSelectedDateTime={setSelectedDateTime}
                isDatePickerVisible={isDatePickerVisible}
                setIsDatePickerVisible={setIsDatePickerVisible}
                dateTimePickerMode={dateTimePickerMode}
                setDateTimePickerMode={setDateTimePickerMode}
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
});

export default CreateLog;