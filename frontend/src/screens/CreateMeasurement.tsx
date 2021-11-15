import React, { useState, useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/Auth';
import { useQuery, useMutation } from '@apollo/client';
import { IconButton, TextInput } from 'react-native-paper';
import DateTimePicker, { dateTimePickerModes } from '../components/atoms/date_time_picker/DateTimePicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { Picker } from '@react-native-picker/picker';
import GET_METRICS_BY_USER_ID from '../queries/GetMetricsByUserId';
import GetMetricsByUserIdData from '../types/GetMetricsByUserIdData';
import Measurement from '../types/Measurement';
import MeasurementInput from '../types/MeasurementInput';
import CREATE_MEASUREMENT from '../mutations/CreateMeasurement';

type CreateMeasurementProps = NativeStackScreenProps<AppStackParamList, 'CreateMeasurement'>;

export type CreateMeasurementNavigationProps = { 
    metricId: string; 
    title: string; 
};

const CreateMeasurement = ({ route, navigation }: CreateMeasurementProps) => {

    const { metricId, title } = route.params;

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<GetMetricsByUserIdData>(GET_METRICS_BY_USER_ID, {
        variables: {
            userId: authData!.id,
        },
    });

    const [value, setValue] = useState('');

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState(new Date().getTime() / 1000);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [dateTimePickerMode, setDateTimePickerMode] = useState(dateTimePickerModes.Date);

    const [doneButtonIsDisabled, setDoneButtonIsDisabled] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(title);

    const [createMeasurement] = useMutation<{ createMeasurement: Measurement }, { input: MeasurementInput }>(CREATE_MEASUREMENT, {
        variables: {
            input: {
                metricId: metricId,
                x: selectedDateTime.toString(), 
                y: value, 
                dateTimeMeasured: selectedDateTime,
            },
        },
        onCompleted: (data) => {
            console.log(`completed CreateMetric: ${data}`);

            // pop to top until you fix measurementsList and metricDetail not getting updated when you
            // add new measurement, likely have to 
            // switch MetricDetail and MeasurementsList to query rather than accept props.
            // i think the reason why this and MetricDetail don't get updated is because
            // the props are only passed when someone navigates to either of those components
            navigation.popToTop();

            // navigation.goBack();
        }, 
        onError: (error) => console.log(`Error on CreateMetric: ${error}`),
        update: (cache, { data }) => {
            const existingData = cache.readQuery<any>({ query: GET_METRICS_BY_USER_ID, variables: { userId: authData!.id, } });
            const result = data?.CreateMeasurement;
            if (result) {
                const copiedExistingData = JSON.parse(JSON.stringify(existingData));
                for (let i = 0; i < copiedExistingData.GetMetricsByUserId.length; i++) {
                    let metric = copiedExistingData.GetMetricsByUserId[i];
                    if (metric.id === metricId) {
                        metric.data.push(result);
                    }
                }
                cache.writeQuery({
                    query: GET_METRICS_BY_USER_ID, 
                    variables: {
                        userId: authData!.id,
                    },
                    data: copiedExistingData,
                });
            }
        },
        // refetchQueries: [ // refetch queries does the same cache update, doing it manually just optimizes bandwidth
        //     GET_METRICS_BY_USER_ID, 
        //     'GetMetricsByUserId',
        // ],
        // refetchQueries: [
        //     { 
        //         query: GET_METRICS_BY_USER_ID, 
        //         fetchPolicy: 'network-only',
        //         variables: {
        //             userId: authData!.id,
        //         },
        //     },
        // ],
    });

    const handleDonePressed = () => {
        createMeasurement();
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
                <TouchableOpacity 
                    disabled={doneButtonIsDisabled}
                    style={[styles.doneButton, doneButtonIsDisabled ? styles.doneButtonDisabled : styles.doneButtonEnabled]}
                    onPress={handleDonePressed}
                >
                    <Text style={doneButtonIsDisabled ? styles.fontDisabled : styles.fontEnabled}>Done</Text>
                </TouchableOpacity>
            ),
            title: '',
        });
    }, [navigation, value]);

    if (loading) return (
        <SafeAreaView>
			<Text>{'Loading...'}</Text>
		</SafeAreaView>
    );

	if (error) return (
		<SafeAreaView>
			<Text>{`${error}\n\n\n\n\n\n\n`}</Text>
		</SafeAreaView>
	);

    return (
        <View style={{padding: 10}}>
            <View style={styles.settingContainer}>
                <Button title="Pick date" onPress={() => {
                    setDateTimePickerMode(dateTimePickerModes.Date);
                    setIsDatePickerVisible(true);
                }} />
                <Text style={styles.settingValueText}>{selectedDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.settingContainer}>
                <Button title="Pick time" onPress={() => {
                    setDateTimePickerMode(dateTimePickerModes.Time);
                    setIsDatePickerVisible(true);
                }} />
                <Text style={styles.settingValueText}>{`${selectedTime.toLocaleTimeString()}`}</Text>
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
            <View style={styles.settingContainer}>
                <Text style={styles.label}>Selected Metric</Text>
                <Text style={styles.settingValueText}>{selectedCategory}</Text>
            </View>
            <Picker 
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
            >
                {data?.GetMetricsByUserId.map(metric => (
                    <Picker.Item key={metric.id} label={metric.title} value={metric.title} />
                ))}
            </Picker>
            <TextInput 
                label="Value"
                value={value}
                onChangeText={text => {
                    setValue(text);
                    if (text.trim() !== '') {
                        setDoneButtonIsDisabled(false);
                    } else {
                        setDoneButtonIsDisabled(true);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    settingContainer: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValueText: {
        marginLeft: 'auto',
    },
    label: {
        fontSize: 17,
    },
    doneButton: {
        paddingTop: 10, 
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20, 
        borderRadius: 20,
    },
    doneButtonEnabled: {
        backgroundColor: '#00C2FF',
    },
    doneButtonDisabled: {
        backgroundColor: 'rgba(0, 194, 255, 0.2)',
    },
    fontEnabled: {
        color: 'rgba(0, 0, 0, 1.0)',
    },
    fontDisabled: {
        color: 'rgba(0, 0, 0, 0.2)',
    },
});

export default CreateMeasurement;