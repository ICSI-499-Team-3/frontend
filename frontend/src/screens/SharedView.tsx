import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

    return (
        <View style={styles.container}>
            {
                data?.GetSharersByShareeId.length === 0
                ? (<Text>No shared data yet!</Text>)
                : (
                    data?.GetSharersByShareeId.map(sharer => (
                        <View>
                            <View style={styles.sharerContainer}>
                                <Text style={styles.title}>{sharer.name}</Text>
                                <Button
                                    title="Logs"
                                    onPress={() => navigation.navigate("SharedLogsView", {
                                        userId: sharer.id,
                                    })}
                                />
                                <Button
                                    title="Metrics"
                                />
                            </View>
                        </View>
                    ))
                )
            }
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
  });

export default SharedView;