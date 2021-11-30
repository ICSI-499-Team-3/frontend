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
import User from '../graphql/types/User';
import UserInput from '../graphql/types/UserInput';
import CREATE_USER from '../graphql/mutations/CreateUser';
import Toast from 'react-native-toast-message';

type RegiserScreenProps = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: RegiserScreenProps) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password1, setPassword1] = useState({ value: '', error: '' });
    const [password2, setPassword2] = useState({ value: '', error: '' });

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
                password: password1.value,
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
        const password1Error = passwordValidator(password1.value);
        const password2Error = passwordValidator(password2.value);

        if (emailError) {
            setName({ ...name, error: nameError });
            return;
        }
        
        if (nameError) {
            setEmail({ ...email, error: emailError });
            return
        }

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
                value={password1.value}
                onChangeText={(text: string) => setPassword1({ value: text, error: '' })}
                error={!!password1.error}
                errorText={password1.error}
                secureTextEntry
                description=''
            />
            <TextInput
                label="Re-enter Password"
                returnKeyType="done"
                value={password2.value}
                onChangeText={(text: string) => setPassword2({ value: text, error: '' })}
                error={!!password2.error}
                errorText={password2.error}
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
