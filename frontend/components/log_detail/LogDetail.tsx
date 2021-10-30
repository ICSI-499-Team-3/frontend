import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LogStackParamList } from '../logs_view/LogsView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';

type LogDetailProps = NativeStackScreenProps<LogStackParamList, 'LogDetail'>;

const LogDetail = ({ route, navigation }: LogDetailProps) => {

    const { title, createdAt, content, categories, mood } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.createdAt}>{createdAt}</Text>
            <View style={styles.categoriesContainer}>
                {categories.map(category => (
                    <Text>{category}</Text>
                ))}
            </View>
            <Text style={styles.mood}>{mood}</Text>
            <Text>{content}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    createdAt: {
        paddingBottom: 10,
    },
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    mood: {
        paddingBottom: 10,
    },
  });

export default LogDetail;