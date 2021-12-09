//Emma
import React, { useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type RecDetailProps = NativeStackScreenProps<AppStackParamList, 'RecDetail'>;

/**
 * @author Emma Wirth 
 */
const RecDetail = ({ route, navigation }: RecDetailProps) => {

    const { title, content } = route.params;

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '50%'], []);

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
                    onPress={handlePresentModalPress}
                />
            ),
        });
    }, [navigation]);

    return (
        <BottomSheetModalProvider>
            <ScrollView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>{content}</Text>
            </ScrollView>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        //backgroundColor: 'black', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
});

export default RecDetail;