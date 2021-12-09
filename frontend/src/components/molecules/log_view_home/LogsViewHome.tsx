import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogsList from '../logs_list/LogsList';
import { FAB } from 'react-native-paper';
import { AppStackParamList } from '../../../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../../contexts/Auth';

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'LogsViewHome'>;

type LogsViewHomeProps = {
    userId: string;
};

/**
 * @author Tony Comanzo 
 */
const LogsViewHome = ({ userId }: LogsViewHomeProps) => {

    const navigation = useNavigation<LogCardNavigationProp>();

    const { authData } = useAuth();

    return (
        <View>
            <LogsList userId={userId} />
            {authData?.id === userId && 
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('CreateLog')}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
});

export default LogsViewHome;