import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Button from "../components/atoms/login/Button";
import { useAuth } from "../contexts/Auth";
import { theme } from "../core/theme";
import { AuthData } from "../services/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {
    const auth = useAuth();

    const [authData, setAuthData] = useState<AuthData>();

    useEffect(() => {
        loadAuthData();
    });

    async function loadAuthData() {
        try {
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                const _authData: AuthData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {

        }
    }

    const logOut = async () => {
        await auth.signOut();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={{ fontSize: 33, textAlign: 'center', paddingTop: 30 }}>Profile Screen under construction</Text>
                <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: 30 }}>Hello {authData?.email}!</Text>
            </View>
            <View style={styles.buttonList}>
                <Button style={undefined} onPress={logOut}>Log Out</Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surface,
    },

    topSection: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },

    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },

    buttonList: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileScreen;