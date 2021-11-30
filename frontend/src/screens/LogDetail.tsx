import React, { useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LogDetailBottomSheet from '../components/atoms/log_detail/LogDetailBottomSheet';
import CardIcons from '../components/atoms/card_icons/CardIcons';


type LogDetailProps = NativeStackScreenProps<AppStackParamList, 'LogDetail'>;

const LogDetail = ({ route, navigation }: LogDetailProps) => {

    const { id, dateTimeOfActivity, notes, categories, mood} = route.params;

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const date = new Date(0);
    date.setUTCSeconds(dateTimeOfActivity);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handle sheet changes', index);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton 
                    icon="dots-vertical"
                    size={20}
                    onPress={handlePresentModalPress} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}                />
            ),
        });
    }, [navigation]);

    return (
        <BottomSheetModalProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.createdAt}>{date.toDateString()}</Text>
                <Text>Time - {date.getHours()}:{date.getMinutes()}</Text>
                <View style={styles.categoriesContainer}>
                    {categories?.map(category => (
                        <Text 
                        style={styles.MoodText}
                        key={category}>Activity: {category}     </Text>
                    ))}
                </View>
                <View style={styles.mood}>
                    {mood?.map(category => (
                        <Text 
                        style={styles.MoodText}
                        key={category}>Mood: {category}     </Text>
                    ))}
                </View>
                <Text style={styles.NotesText}>Notes: </Text>
                <Text style={styles.notes}>{notes} </Text>
               
            </ScrollView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <LogDetailBottomSheet />
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    createdAt: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15,
    },
    mood: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    notes: {
        fontSize: 20,
        paddingTop: 10,
    },
    NotesText:{
        fontSize: 15,
        paddingTop: 50,
        fontWeight: 'bold',
    },
    MoodText:{
        fontSize: 15,
        paddingTop: 15,
        fontWeight: 'bold',
    },
    ActivityText:{
        fontSize: 15,
        fontWeight: 'bold',
    },

});

export default LogDetail;