import React, { useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chip, Text } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LogDetailBottomSheet from '../components/atoms/log_detail/LogDetailBottomSheet';
import CardIcons from '../components/atoms/card_icons/CardIcons';
import { useAuth } from '../contexts/Auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LogDetailProps = NativeStackScreenProps<AppStackParamList, 'LogDetail'>;

const LogDetail = ({ route, navigation }: LogDetailProps) => {

    const { id, userId, dateTimeOfActivity, notes, categories, mood} = route.params;

    const { authData } = useAuth();

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
        if (userId === authData?.id) {
            navigation.setOptions({
                headerRight: () => (
                    <IconButton 
                        icon="dots-vertical"
                        size={20}
                        onPress={handlePresentModalPress} 
                        hasTVPreferredFocus={undefined} 
                        tvParallaxProperties={undefined}
                    />
                ),
            });
        }
    }, [navigation]);

    const bottomSheetOptions = [
        {
            name: "Delete",
            onPress: () => {
              navigation.navigate('LogDelete')
              console.log('pressed!');
            },
        },
        {
            name: "Share", 
            onPress: () => {
                navigation.navigate('ShareScreen', {
                    sharedData: route.params,
                });
                console.log('pressed!');
            },
        },
        {
            name: "Label",
            onPress: () => {
                navigation.navigate('AddLabel')
                console.log('pressed!');
            },
        },
        {
            name: "Edit",
            onPress: () => {
                navigation.navigate('LogEdit')
                console.log('pressed!');
            },
        },
    ];

    const activitiesToIcons = new Map()
    activitiesToIcons.set('running', 'run') 
    activitiesToIcons.set('yoga', 'yoga') 
    activitiesToIcons.set('eating', 'food') 
    activitiesToIcons.set('going out', 'party-popper') 
    activitiesToIcons.set('spending time with friends', 'human-male-female')
    activitiesToIcons.set('physical therapy', 'doctor')
    activitiesToIcons.set('therapy', 'account-heart')


    //converting militray time to regular time
    var hours = date.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var finalTime = "Time - " + hours + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + " " + AmOrPm; 

    return (
        <BottomSheetModalProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.createdAt}>{date.toDateString()}</Text>
                <Text style={styles.time}> {finalTime}</Text>
                <View style={styles.categoriesContainer}>
                    {categories?.map(category => (
                        <Text 
                        style={styles.ActivityText}
                        key={category}>
                        <Icon key={category} name={activitiesToIcons.get(category)} size={20} />    {category} 
                        </Text>
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
                <LogDetailBottomSheet options={bottomSheetOptions} />
            </BottomSheetModal>
        </BottomSheetModalProvider>
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
    time: {
        fontSize: 15,
    },
    createdAt: {
        fontSize: 40,
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
        flex: 1,
    },
    ActivityText:{
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        borderWidth: 3,
        borderColor: 'black',
        padding : 2,
        textAlign: 'center',
        margin: 4,
        backgroundColor: '#fff' //white
    },

});

export default LogDetail;