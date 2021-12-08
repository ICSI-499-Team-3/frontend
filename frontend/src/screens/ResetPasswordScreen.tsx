import { useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import BackButton from '../components/atoms/login/BackButton';
import Background from '../components/atoms/login/Background';
import Button from '../components/atoms/login/Button';
import Header from '../components/atoms/login/Header';
import Logo from '../components/atoms/login/Logo';
import TextInput from '../components/atoms/login/TextInput';
import { theme } from '../core/theme';
import RESET_USER_PASSWORD from '../graphql/mutations/ResetUserPassword';
import { passwordValidator } from '../helpers/passwordValidator';
import { AuthStackParamList } from '../navigation/AuthStack';

type ResetPasswordNavigationProps = NativeStackScreenProps<AuthStackParamList, 'ResetPasswordScreen'>;

export type ResetPasswordProps = {
    email: string;
};

export default function ResetPasswordScreen({ route, navigation }: ResetPasswordNavigationProps) {
    const { email } = route.params;
    const [password1, setPassword1] = useState({ value: '', error: '' });
    const [password2, setPassword2] = useState({ value: '', error: '' });

    const [resetUserPassword] = useMutation<{ ResetUserPassword: boolean; }, { email: string, password: string; }>(RESET_USER_PASSWORD, {
        onCompleted: (data) => {
            if (data.ResetUserPassword) {
                Toast.show({
                    text1: 'Password Successfully Reset!',
                    text2: 'Please log in',
                });

                navigation.popToTop();
            }
            else {
                Toast.show({
                    text1: 'Server Error',
                    text2: 'Please try again later',
                });
            }
        },
        onError: (error) => {
            console.log(`Error on RESET_USER_PASSWORD: ${error.message}`);
        },
    });

    const onResetPressed = () => {
        const password1Error = passwordValidator(password1.value);
        const password2Error = passwordValidator(password2.value);

        if (password1Error || password2Error) {
            setPassword1({ ...password1, error: password1Error });
            setPassword2({ ...password2, error: password2Error });
            return;
        }
        else if (password1.value != password2.value) {
            setPassword1({ ...password1, error: 'Paswords do not match!' });
            setPassword2({ ...password2, error: 'Paswords do not match!' });
            return;
        }

        setPassword1({ ...password1, error: '' });
        setPassword2({ ...password2, error: '' });

        resetUserPassword({ variables: { email: email, password: password1.value } });
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Reset Password</Header>
            <TextInput
                label="E-mail address"
                value={email}
                editable={false}
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password1.value}
                onChangeText={(text: string) => setPassword1({ value: text, error: '' })}
                error={!!password1.error}
                errorText={password1.error}
                secureTextEntry
                description='Enter new password'
            />
            <TextInput
                label="Re-enter Password"
                returnKeyType="done"
                value={password2.value}
                onChangeText={(text: string) => setPassword2({ value: text, error: '' })}
                error={!!password2.error}
                errorText={password2.error}
                secureTextEntry
                description='Re-enter new password'
            />
            <Button
                onPress={onResetPressed}
                style={{ marginTop: 24 }}
            >
                Reset Password
            </Button>
        </Background>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});
