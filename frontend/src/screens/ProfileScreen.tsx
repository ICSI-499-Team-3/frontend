import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useAuth } from "../contexts/Auth";
import { theme } from "../core/theme";
import { ListItem } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/AppStack";
import { useNavigation } from "@react-navigation/native";

type ProfileScreenProps = NativeStackNavigationProp<AppStackParamList, 'ProfileScreen'>;

const ProfileScreen = () => {
    const auth = useAuth();
    const navigation = useNavigation<ProfileScreenProps>();

    const logOut = async () => {
        await auth.signOut();
    };

    const logOutAlert = () => {
        Alert.alert("Log out", "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => logOut() }
            ]);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.greeting}>Hello {auth.authData?.name}!</Text>
            <View>
                <ListItem containerStyle={styles.listItemContainer} onPress={() => navigation.navigate("UpdateUserName")}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.listItemTitle}>Update name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={styles.listItemContainer} onPress={() => navigation.navigate("UpdateUserEmail")}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.listItemTitle}>Update email</ListItem.Title>
                        <ListItem.Subtitle>{auth.authData?.email}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={styles.listItemContainer} onPress={() => navigation.navigate("UpdateUserPassword")}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.listItemTitle}>Update password</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={styles.listItemContainer} onPress={() => navigation.navigate("UpdateUserPreExistingConditions")}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.listItemTitle}>Pre-existing conditions</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={styles.listItemContainer} onPress={() => logOutAlert()}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.listItemTitle}>Log out</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
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

    greeting: {
        fontSize: 30,
        textAlign: "center",
        padding: 30,
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
        height: 65,
        borderWidth: .8,
        borderColor: '#ECECEC',
    },

    listItemTitle: {
        fontSize: 18,
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