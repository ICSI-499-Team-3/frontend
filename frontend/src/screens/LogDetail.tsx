import React, { useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation/NavigationStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LogDetailBottomSheet from '../components/atoms/log_detail/LogDetailBottomSheet';

type LogDetailProps = NativeStackScreenProps<RootStackParamList, 'LogDetail'>;

const LogDetail = ({ route, navigation }: LogDetailProps) => {

    const { title, createdAt, content, categories, mood } = route.params;

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
                <Text style={styles.createdAt}>{createdAt}</Text>
                <View style={styles.categoriesContainer}>
                    {categories.map(category => (
                        <Text key={category}>{category}</Text>
                    ))}
                </View>
                <Text style={styles.mood}>{mood}</Text>
                <Text>{content}</Text>
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