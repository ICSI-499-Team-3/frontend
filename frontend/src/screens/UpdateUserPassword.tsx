import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useAuth } from "../contexts/Auth";
import { theme } from "../core/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigation/AppStack";
import TextInput from "../components/atoms/login/TextInput";
import Button from "../components/atoms/login/Button";
import { useMutation } from "@apollo/client";
import User from "../types/User";
import UPDATE_USER_PASSWORD from "../mutations/UpdateUserPassword";
import { doublePasswordValidator, singlePasswordValidator } from "../helpers/passwordValidator";
import Toast from "react-native-toast-message";

type UpdateUserPasswordProps = NativeStackScreenProps<AppStackParamList, 'UpdateUserPassword'>;

const UpdateUserPassword = ({ route, navigation }: UpdateUserPasswordProps) => {
    const auth = useAuth();
    const [currentPassword, setCurrentPassword] = useState({ value: '', error: '' });
    const [newPassword, setNewPassword] = useState({ value: '', error: '' });
    const [confirmNewPassword, setConfirmNewPassword] = useState({ value: '', error: '' });

    const successToast = () => {
        Toast.show({
            text1: 'Password Updated!',
        });
    };

    const [updateUserPassword] = useMutation<{ UpdateUserPassword: User; }, { id: String, currentPassword: String, newPassword: String; }>(UPDATE_USER_PASSWORD, {
        variables: {
            id: auth.authData?.id,
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
        },
        onCompleted: async (data) => {
            console.log(`completed usernameupdate: ${data.UpdateUserPassword}`);

            await auth.updateAuthData(data.UpdateUserPassword);
            navigation.goBack();
            successToast();
        },
        onError: (error) => {
            console.log(`Error on CreateUser: ${error.message}`);
            const errorMessage = error.message.split(':')[1];
            setCurrentPassword({ ...currentPassword, error: errorMessage });
        },
    });


    const handleUpdatePassword = () => {
        const currentPasswordError = singlePasswordValidator(currentPassword.value);
        const newPasswordError = doublePasswordValidator(newPassword.value, confirmNewPassword.value);
        
        if(currentPasswordError){
            setCurrentPassword({ ...currentPassword, error: currentPasswordError });
            return;
        }
        
        if (newPasswordError) {
            setNewPassword({ ...newPassword, error: newPasswordError });
            setConfirmNewPassword({ ...confirmNewPassword, error: newPasswordError });
            return;
        }

        setCurrentPassword({ ...currentPassword, error: '' });
        setNewPassword({ ...newPassword, error: '' });
        setConfirmNewPassword({ ...confirmNewPassword, error: '' });

        updateUserPassword();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Update Password</Text>
            <View>
                <TextInput
                    label="Current Password"
                    returnKeyType="done"
                    value={currentPassword.value}
                    onChangeText={(text: string) => setCurrentPassword({ value: text, error: '' })}
                    error={!!currentPassword.error}
                    errorText={currentPassword.error}
                    secureTextEntry
                    description=''
                />
                <TextInput
                    label="New Password"
                    returnKeyType="done"
                    value={newPassword.value}
                    onChangeText={(text: string) => setNewPassword({ value: text, error: '' })}
                    error={!!newPassword.error}
                    errorText={newPassword.error}
                    secureTextEntry
                    description=''
                />
                <TextInput
                    label="Confirm New Password"
                    returnKeyType="done"
                    value={confirmNewPassword.value}
                    onChangeText={(text: string) => setConfirmNewPassword({ value: text, error: '' })}
                    error={!!confirmNewPassword.error}
                    errorText={confirmNewPassword.error}
                    secureTextEntry
                    description=''
                />
                <Button style={{ marginTop: 12 }} onPress={() => handleUpdatePassword()}>
                    Update Password
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

export default UpdateUserPassword;