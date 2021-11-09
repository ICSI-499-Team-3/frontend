import React, { useState, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { useAuth } from '../contexts/Auth';
import { useMutation } from '@apollo/client';
import CREATE_METRIC from '../mutations/CreateMetric';
import GET_METRICS_BY_USER_ID from '../queries/GetMetricsByUserId';
import Metric from '../types/Metric';
import MetricInput from '../types/MetricInput';

type CreateMetricProps = NativeStackScreenProps<AppStackParamList, 'CreateMetric'>;

const CreateMetric = ({ route, navigation }: CreateMetricProps) => {

    const defaultXUnits = 'Time';

    const [name, setName] = useState('');
    const [units, setUnits] = useState('');

    const [doneButtonIsDisabled, setDoneButtonIsDisabled] = useState(true);

    const { authData, loading } = useAuth();

    const [createMetric] = useMutation<{ createMetric: Metric }, { input: MetricInput }>(CREATE_METRIC, {
        variables: {
            input: {
                userId: authData!.id, 
                title: name, 
                xUnits: defaultXUnits, 
                yUnits: units,
            },
        },
        onCompleted: (data) => {
            console.log(`completed CreateMetric: ${data}`);
            navigation.goBack();
        }, 
        onError: (error) => console.log(`Error on CreateMetric: ${error}`),
        refetchQueries: [
            GET_METRICS_BY_USER_ID, 
            'GetMetricsByUserId',
        ],
    });

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
    }, [navigation, name]);

    const handleDonePressed = () => {
        createMetric();
    };

    return (
        <View>
            <TextInput 
                label="Metric name"
                value={name}
                onChangeText={text => {
                    setName(text);
                    if (text.trim() !== '') {
                        setDoneButtonIsDisabled(false);
                    } else {
                        setDoneButtonIsDisabled(true);
                    }
                }}
            />
            <TextInput
                label="Units (optional)"
                value={units}
                onChangeText={text => setUnits(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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

export default CreateMetric;