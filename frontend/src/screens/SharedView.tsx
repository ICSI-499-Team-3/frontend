import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { useAuth } from '../contexts/Auth';
import { useNavigation } from '@react-navigation/core';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GetSharersByShareeIdData from '../graphql/types/GetSharersByShareeIdData';
import GET_SHARERS_BY_SHAREE_ID from '../graphql/queries/GetSharersByShareeId';

type SharedViewNavigationProps = NativeStackNavigationProp<AppStackParamList, 'SharedView'>;

const SharedView = () => {

    const navigation = useNavigation<SharedViewNavigationProps>();

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<GetSharersByShareeIdData, { id: string; }>(GET_SHARERS_BY_SHAREE_ID, {
        variables: {
            id: authData!.id,
        },
        fetchPolicy: 'cache-and-network',
    });

    if (loading) {
        return (
            <Text>Loading...</Text>
        );
    }

    if (error) {
        return (
            <Text>{`${error}`}</Text>
        );
    }

    if (data?.GetSharersByShareeId.length === 0) {
        return (
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>Nothing to see here yet! This screen will populate as other users share their data with you.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {data?.GetSharersByShareeId.map(sharer => (
                <View key={sharer.id} style={styles.sharerContainer}>
                    <Text style={styles.title}>{sharer.name}</Text>
                    <Button
                        title="Logs"
                        onPress={() => navigation.navigate("SharedLogsView", {
                            userId: sharer.id,
                        })}
                    />
                    <Button
                        title="Metrics"
                        onPress={() => navigation.navigate("SharedMetricView", {
                            userId: sharer.id,
                        })}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      padding: 10,
    }, 
    title: {
        fontSize: 24,
    },
    sharerContainer: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 30,
        padding: 10,
    },
    messageWrapper: {
        display: 'flex',
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
    },
  });

export default SharedView;