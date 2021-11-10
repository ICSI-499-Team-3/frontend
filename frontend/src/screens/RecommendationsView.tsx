//Emma
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecList from '../components/molecules/Rec_List/RecList';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'RecommendationsView'>;

const RecommendationsView = () => {

    const navigation = useNavigation<LogCardNavigationProp>();

    return (
        <View style={[styles.container]}>
            <Text style={styles.title}>Recommendations</Text>
            <RecList />
        </View>
    );
};


const styles = StyleSheet.create({

    //***** change this ****
    container: {
        flex: 1,
        padding: 24, //keeps it under the time/wifi/battery symbols
        backgroundColor: "#eaeaea" //white background color of app
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 5,
        borderColor: "#61dafb",
        borderRadius: 1,
        backgroundColor: "#20232a", //color of background behind letters
        color: "#ffffff",  //color of letters
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
      }

});

export default RecommendationsView;