import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/atoms/login/Background';
import Logo from '../components/atoms/login/Logo';
import Header from '../components/atoms/login/Header';
import Button from '../components/atoms/login/Button';
import TextInput from '../components/atoms/login/TextInput';
import BackButton from '../components/atoms/login/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useMutation } from '@apollo/client';
import User from '../types/User';
import UserInput from '../types/UserInput';
import CREATE_USER from '../mutations/CreateUser';
import Toast from 'react-native-toast-message';

type RegiserScreenProps = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: RegiserScreenProps) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const successToast = () => {
        Toast.show({
            text1: 'Account Created!',
            text2: 'Please log in',
        });
    };

    const [createUser] = useMutation<{ createUser: User; }, { input: UserInput; }>(CREATE_USER, {
        variables: {
            input: {
                name: name.value,
                email: email.value,
                password: password.value,
            }
        },
        onCompleted: (data) => {
            console.log(`completed Created User: ${data}`);
            navigation.goBack();
            successToast();
        },
        onError: (error) => {
            console.log(`Error on CreateUser: ${error.message}`);
            const errorMessage = error.message.split(':')[1];
            setEmail({ ...email, error: errorMessage });
        },
    });

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        createUser();
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Create Account</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text: string) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
                description=''
            />
            <TextInput
                label="Email"
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
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                description=''
            />
            <Button
                onPress={onSignUpPressed}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
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