import React, { useState } from 'react';
import { View } from 'react-native';
import { LogStackParamList } from '../logs_view/LogsView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';

type LogDetailProps = NativeStackScreenProps<LogStackParamList, 'LogDetail'>;

const LogDetail = ({ route, navigation }: LogDetailProps) => {

    const { title, content, categories } = route.params;

    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
};

export default LogDetail;