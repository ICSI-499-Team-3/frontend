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
import Toast from "react-native-toast-message";
import UPDATE_USER_PRE_EXISTING_CONDITIONS from "../../graphql/mutations/UpdateUserPreExistingConditions";

type UpdateUserConditionsProps = NativeStackScreenProps<AppStackParamList, 'UpdateUserPreExistingConditions'>;

const UpdateUserPreExistingConditions = ({ navigation }: UpdateUserConditionsProps) => {
    const auth = useAuth();
    const [conditions, setConditions] = useState({ value: auth.authData?.preExistingConditions, error: '' });

    const successToast = () => {
        Toast.show({
            text1: 'Conditions Updated!',
        });
    };

    const [updateUserPreExistingConditions] = useMutation<{ UpdateUserPreExistingConditions: User; }, { id: String, name: String; }>(UPDATE_USER_PRE_EXISTING_CONDITIONS, {
        variables: {
            id: auth.authData?.id,
            conditions: conditions.value,
        },
        onCompleted: async (data) => {
            console.log(`completed updateUserPreExistingConditions: ${data.UpdateUserPreExistingConditions}`);

            await auth.updateAuthData(data.UpdateUserPreExistingConditions);
            navigation.goBack();
            successToast();
        },
        onError: (error) => console.log(`Error on CreateLog: ${error}`),
    });

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
            <Text style={styles.heading}>Update Pre-Existing Conditions</Text>
            <View>
                <TextInput
                    label="Add conditions such as diabeties or asthma"
                    returnKeyType="next"
                    value={conditions.value}
                    onChangeText={(text: string) => setConditions({ value: text, error: '' })}
                    error={!!conditions.error}
                    errorText={conditions.error}
                    description=''
                    multiline={true}
                />
                <Button style={{ marginTop: 12 }} onPress={() => updateUserPreExistingConditions()}>
                    Update Conditions
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

export default UpdateUserPreExistingConditions;