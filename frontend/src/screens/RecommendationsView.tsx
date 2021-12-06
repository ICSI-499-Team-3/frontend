import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GET_LOGS_AND_METRICS_BY_USER_ID from '../graphql/queries/GetLogsAndMetricsByUserId';
import GetLogsAndMetricsByUserIdData from '../graphql/types/GetLogsAndMetricsByUserIdData';
import { useAuth } from '../contexts/Auth';

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'RecommendationsView'>;

const RecommendationsView = () => {

    const { authData } = useAuth();

    const { loading, error, data } = useQuery<GetLogsAndMetricsByUserIdData, { userId: string; }>(GET_LOGS_AND_METRICS_BY_USER_ID, {
        variables: {
            userId: authData?.id ?? '',
        },
    });

    if (loading) {
        return (
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>Loading...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>{`${error}`}</Text>
            </View>
        );
    }

    // create frequency list 
    const buckets: {[key: string]: {[key: string]: number}} = {
        happy: {}, 
        goofy: {}, 
        spontaneous: {}, 
        excited: {},
    };

    // process frequency list
    data?.GetLogsByUserId.map(log => {
        log.mood?.map(mood => {
            log.categories?.map(category => {
                if (mood.toLowerCase() in buckets) {
                    if (category in buckets[mood.toLowerCase()]) {
                        buckets[mood.toLowerCase()][category] += 1;
                    } else {
                        buckets[mood.toLowerCase()][category] = 1;
                    }
                }
            });
        });
    });
    const bestCategories: {[key: string]: string} = {};
    Object.keys(buckets).map(mood => {
        const bestCategory = Object.keys(buckets[mood]).reduce((previousCategory, currentCategory) => buckets[mood][previousCategory] > buckets[mood][currentCategory] ? previousCategory : currentCategory, '');
        bestCategories[mood] = bestCategory;
    });

    let shouldRenderInsufficientDataMessage = true;
    Object.keys(bestCategories).forEach(mood => {
        const category = bestCategories[mood];
        if (buckets[mood][category] > 4) {
            shouldRenderInsufficientDataMessage = false;
        }
    });

    // console.log(bestCategories);

    if (data?.GetLogsByUserId.length === 0 || shouldRenderInsufficientDataMessage) {
        return (
            <View style={styles.messageWrapper}>
                <Text style={styles.message}>Not enough data to perform an analysis yet! As you select categories and moods when you log, insights will appear here.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>Insights</Text>
                <Text style={styles.subHeader}>I've noticed that...</Text>
            </View>
            <View style={styles.container}>
                {
                    Object.entries(bestCategories).map(entry => {
                        const mood = entry[0];
                        const category = entry[1].toLowerCase();
                        if (category === '' || buckets[mood][category] < 5) return;
                        return (
                            <View key={`${mood}-${category}`} style={styles.insightWrapper}>
                                <Text style={[styles.insight]}>You are most </Text>
                                <Text style={[styles.insight, styles.insightBold]}>{mood}</Text>
                                <Text style={[styles.insight]}> when you are </Text>
                                <Text style={[styles.insight, styles.insightBold]}>{category}</Text>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerWrapper: {
        borderBottomWidth: 1, 
        borderColor: 'black',
    },
    header: {
        fontSize: 32, 
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 20,
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
    insightWrapper: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        flexWrap: 'wrap'
    },
    insight: {
        fontSize: 18,
    },
    insightBold: {
        fontWeight: 'bold',
    },
});

export default RecommendationsView;