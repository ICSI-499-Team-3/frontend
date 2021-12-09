import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useAuth } from "../../contexts/Auth";
import { theme } from "../../core/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigation/AppStack";
import TextInput from "../../components/atoms/login/TextInput";
import Button from "../../components/atoms/login/Button";
import { useMutation } from "@apollo/client";
import User from "../../graphql/types/User";
import { emailValidator } from "../../helpers/emailValidator";
import UPDATE_USER_EMAIL from "../../graphql/mutations/UpdateUserEmail";
import Toast from "react-native-toast-message";

type UpdateUserEmailProps = NativeStackScreenProps<AppStackParamList, 'UpdateUserEmail'>;

/**
 * @author Habib Affnnih
 */
const UpdateUserEmail = ({ route, navigation }: UpdateUserEmailProps) => {
    const auth = useAuth();
    const [email, setEmail] = useState({ value: '', error: '' });

    const successToast = () => {
        Toast.show({
            text1: 'Email Updated!',
        });
    };

    const [updateUserEmail] = useMutation<{ UpdateUserEmail: User; }, { id: String, name: String; }>(UPDATE_USER_EMAIL, {
        variables: {
            id: auth.authData?.id,
            email: email.value,
        },
        onCompleted: async (data) => {
            console.log(`completed updateUserEmail: ${data.UpdateUserEmail}`);

            await auth.updateAuthData(data.UpdateUserEmail);
            navigation.goBack();
            successToast();
        },
        onError: (error) => {
            console.log(`Error on updateUserEmail: ${error.message}`);
            const errorMessage = error.message.split(':')[1];
            setEmail({ ...email, error: errorMessage });
        },
    });


    const handleUpdateEmail = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        updateUserEmail();
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
            <Text style={styles.heading}>Update Email</Text>
            <View>
                <Text style={styles.currentName}>Current Email: {auth.authData?.email}</Text>
                <TextInput
                    label="New Email Address"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    description=''
                />
                <Button style={{ marginTop: 12 }} onPress={() => handleUpdateEmail()}>
                    Update Email
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

export default UpdateUserEmail;