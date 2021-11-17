import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useAuth } from "../contexts/Auth";
import { theme } from "../core/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/AppStack";
import TextInput from "../components/atoms/login/TextInput";
import Button from "../components/atoms/login/Button";
import { useMutation } from "@apollo/client";
import User from "../graphql/types/User";
import UPDATE_USER_NAME from "../graphql/mutations/UpdateUserName";
import Toast from "react-native-toast-message";

type UpdateUserNameProps = NativeStackScreenProps<AppStackParamList, 'UpdateUserName'>;

const UpdateUserName = ({ route, navigation }: UpdateUserNameProps) => {
    const auth = useAuth();
    const [name, setName] = useState({ value: '', error: '' });

    const successToast = () => {
        Toast.show({
            text1: 'Name Updated!',
        });
    };

    const [updateUserName] = useMutation<{ UpdateUserName: User; }, { id: String, name: String; }>(UPDATE_USER_NAME, {
        variables: {
            id: auth.authData?.id,
            name: name.value,
        },
        onCompleted: async (data) => {
            console.log(`completed usernameupdate: ${data.UpdateUserName}`);

            await auth.updateAuthData(data.UpdateUserName);
            navigation.goBack();
            successToast();
        },
        onError: (error) => console.log(`Error on CreateLog: ${error}`),
    });

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
            <Text style={styles.heading}>Update Name</Text>
            <View>
                <Text style={styles.currentName}>Current Name: {auth.authData?.name}</Text>
                <TextInput
                    label="New Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text: string) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                    description=''
                />
                <Button style={{ marginTop: 12 }} onPress={() => updateUserName()}>
                    Update Name
                </Button>
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
        padding: 30,
    },

    heading: {
        fontSize: 30,
        textAlign: "center",
        paddingBottom: 20,
        borderBottomWidth: .9,
    },

    currentName: {
        fontSize: 20,
        paddingTop: 20,
        textAlign: "center",
    }
});

export default UpdateUserName;