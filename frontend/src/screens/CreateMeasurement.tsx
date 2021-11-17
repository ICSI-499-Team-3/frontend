import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/Auth';
import { useQuery, useMutation } from '@apollo/client';
import { IconButton, TextInput } from 'react-native-paper';
import DateTimePicker, { dateTimePickerModes } from '../components/atoms/date_time_picker/DateTimePicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { Picker } from '@react-native-picker/picker';
import GET_METRICS_BY_USER_ID from '../graphql/queries/GetMetricsByUserId';
import GetMetricsByUserIdData from '../graphql/types/GetMetricsByUserIdData';
import CreateMeasurementInput from '../graphql/types/CreateMeasurementInput';
import CREATE_MEASUREMENT from '../graphql/mutations/CreateMeasurement';
import GET_METRIC_BY_ID from '../graphql/queries/GetMetricById';
import CreateMeasurementData from '../graphql/types/CreateMeasurementData';
import Measurement from '../graphql/types/Measurement';
import UpdateMeasurementInput from '../graphql/types/UpdateMeasurementInput';
import UPDATE_MEASUREMENT from '../graphql/mutations/UpdateMeasurement';
import UpdateMeasurementData from '../graphql/types/UpdateMeasurementData';

type CreateMeasurementProps = NativeStackScreenProps<AppStackParamList, 'CreateMeasurement'>;

export enum CreateMeasurementMode {
    Create, Update,
};

export type CreateMeasurementNavigationProps = { 
    metricId: string; 
    mode: CreateMeasurementMode;
    title: string;
    
    // data is Measurement if mode = Update, otherwise undefined
    measurementData?: Measurement;
};

const CreateMeasurement = ({ route, navigation }: CreateMeasurementProps) => {

    const { metricId, mode, title, measurementData } = route.params;

    const dateTimeMeasured = new Date(0);
    dateTimeMeasured.setUTCSeconds(measurementData ? measurementData.dateTimeMeasured : 0);

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<GetMetricsByUserIdData, { userId: string; }>(GET_METRICS_BY_USER_ID, {
        variables: {
            userId: authData!.id,
        },
    });

    const [value, setValue] = useState(measurementData ? measurementData.y : '');

    const [selectedDate, setSelectedDate] = useState(measurementData ? dateTimeMeasured : new Date());
    const [selectedTime, setSelectedTime] = useState(measurementData ? dateTimeMeasured : new Date());
    const [selectedDateTime, setSelectedDateTime] = useState(measurementData ? measurementData.dateTimeMeasured : new Date().getTime() / 1000);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [dateTimePickerMode, setDateTimePickerMode] = useState(dateTimePickerModes.Date);

    const [doneButtonIsDisabled, setDoneButtonIsDisabled] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(title);

    const [createMeasurement] = useMutation<CreateMeasurementData, { input: CreateMeasurementInput }>(CREATE_MEASUREMENT, {
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

            navigation.goBack();
        }, 
        onError: (error) => console.log(`Error on CreateMetric: ${error}`),
        update: (cache, { data }) => {
            const existingData = cache.readQuery<GetMetricsByUserIdData, { userId: string; }>({ query: GET_METRICS_BY_USER_ID, variables: { userId: authData!.id, } });
            const result = data?.CreateMeasurement;
            if (result) {
                const copiedExistingData: GetMetricsByUserIdData = JSON.parse(JSON.stringify(existingData));
                for (let i = 0; i < copiedExistingData.GetMetricsByUserId.length; i++) {
                    let metric = copiedExistingData.GetMetricsByUserId[i];
                    if (metric.id === metricId) {
                        metric.data.push(result);
                    }
                }
                cache.writeQuery<GetMetricsByUserIdData, { userId: string; }>({
                    query: GET_METRICS_BY_USER_ID, 
                    variables: {
                        userId: authData!.id,
                    },
                    data: copiedExistingData,
                });
            }
        },
        refetchQueries: [
            // refetch queries does the same cache update, doing it manually just optimizes bandwidth, 
            // also too lazy to update manually two different queries
            {
                query: GET_METRIC_BY_ID,
                variables: {
                    metricId: metricId,
                },
            },
            // { 
            //     query: GET_METRICS_BY_USER_ID, 
            //     variables: {
            //         userId: authData!.id,
            //     },
            // },
        ],
    });

    const [updateMeasurement] = useMutation<UpdateMeasurementData, { input: UpdateMeasurementInput }>(UPDATE_MEASUREMENT, {
        variables: {
            input: {
                id: measurementData?.id ?? '',
                metricId: metricId,
                x: selectedDateTime.toString(), 
                y: value, 
                dateTimeMeasured: selectedDateTime,
            },
        },
        onCompleted: (data) => {
            console.log(`completed UpdateMetric: ${data}`);

            navigation.goBack();
        }, 
        onError: (error) => console.log(`Error on UpdateMetric: ${error}`),
        update: (cache, { data }) => {
            const existingData = cache.readQuery<GetMetricsByUserIdData, { userId: string; }>({ query: GET_METRICS_BY_USER_ID, variables: { userId: authData!.id, } });
            const result = data?.UpdateMeasurement;
            if (result) {
                const copiedExistingData: GetMetricsByUserIdData = JSON.parse(JSON.stringify(existingData));
                for (let i = 0; i < copiedExistingData.GetMetricsByUserId.length; i++) {
                    let metric = copiedExistingData.GetMetricsByUserId[i];
                    if (metric.id === metricId) {
                        metric.data.push(result);
                    }
                }
                cache.writeQuery<GetMetricsByUserIdData, { userId: string; }>({
                    query: GET_METRICS_BY_USER_ID, 
                    variables: {
                        userId: authData!.id,
                    },
                    data: copiedExistingData,
                });
            }
        },
        refetchQueries: [
            // refetch queries does the same cache update, doing it manually just optimizes bandwidth, 
            // also too lazy to update manually two different queries
            {
                query: GET_METRIC_BY_ID,
                variables: {
                    metricId: metricId,
                },
            },
            // { 
            //     query: GET_METRICS_BY_USER_ID, 
            //     variables: {
            //         userId: authData!.id,
            //     },
            // },
        ],
    });

    const handleUpdate = () => {
        if (value !== measurementData?.y || selectedDateTime !== measurementData?.dateTimeMeasured) {
            Alert.alert(
                'Alert', 
                'Are you sure you\'d like to commit your changes?', 
                [
                    {
                        'text': "Cancel", 
                        onPress: () => console.log('do nothing'), 
                        style: 'cancel', 
                    }, 
                    {
                        text: 'Ok', 
                        onPress: () => updateMeasurement(),
                    },
                ],
            );
        }
    };

    const handleDonePressed = () => {
        if (mode === CreateMeasurementMode.Create) {
            createMeasurement();
        } else {
            handleUpdate();
        }
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
    }, [navigation, value, selectedDateTime]);

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
                onConfirm={(selectedDateTime: number) => {
                    if (selectedDateTime !== measurementData?.dateTimeMeasured && mode === CreateMeasurementMode.Update) {
                        setDoneButtonIsDisabled(false);
                    } else {
                        setDoneButtonIsDisabled(true);
                    }
                }}
            />
            <View style={styles.settingContainer}>
                <Text style={styles.label}>Selected Metric</Text>
                <Text style={styles.settingValueText}>{selectedCategory}</Text>
            </View>
            <ConditionalPicker 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                data={data!}
                mode={mode}
            />
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

type ConditionalPickerProps = {
    selectedCategory: string;
    setSelectedCategory: Function;
    data: GetMetricsByUserIdData;
    mode: CreateMeasurementMode;
};

const ConditionalPicker = ({ selectedCategory, setSelectedCategory, data, mode }: ConditionalPickerProps) => {
    if (mode === CreateMeasurementMode.Create) {
        return (
            <Picker 
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
            >
                {data.GetMetricsByUserId.map(metric => (
                    <Picker.Item key={metric.id} label={metric.title} value={metric.title} />
                ))}
            </Picker>
        );
    }

    return <View></View>;
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