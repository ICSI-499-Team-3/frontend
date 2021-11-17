// Template from https://github.com/venits/react-native-login-template

import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Background from '../components/atoms/login/Background';
import Logo from '../components/atoms/login/Logo';
import Header from '../components/atoms/login/Header';
import Button from '../components/atoms/login/Button';
import TextInput from '../components/atoms/login/TextInput';
import BackButton from '../components/atoms/login/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { singlePasswordValidator } from '../helpers/passwordValidator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useAuth } from '../contexts/Auth';
import User from '../graphql/types/User';
import GET_USER_BY_EMAIL_AND_PASSWORD from '../graphql/queries/GetUserByEmailAndPassword';
import { useLazyQuery } from '@apollo/client';
import UserLoginInput from '../graphql/types/UserLoginInput';
import Toast from 'react-native-toast-message';
import UserData from '../graphql/types/UserData';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loginPressed, setLoginPressed] = useState(false);

    const auth = useAuth();

    const [getUser, { loading: queryLoading, error, data }] = useLazyQuery<UserData, { input: UserLoginInput; }>(
        GET_USER_BY_EMAIL_AND_PASSWORD, {
        fetchPolicy: "network-only",
        pollInterval: 0
    });

    const errorToast = () => {
        setLoginPressed(false);
        Toast.show({
            text1: 'Incorrect email or password!',
            text2: "Please try again"
        });
    };


    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = singlePasswordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        setLoginPressed(true);

        getUser({
            variables: {
                input: {
                    email: email.value,
                    password: password.value
                }
            }
        });
    };

    if (data) {
        const userData: User = data?.GetUserByEmailAndPassword;

        if (loginPressed && userData === null) {
            console.log("loginPressed before: ", loginPressed);
            setLoginPressed(false);
            errorToast();
            console.log("loginPressed after: ", loginPressed);
        }
        else if (userData !== null) {
            auth.updateAuthData(userData);
        }
    }

    // TODO: This needs to be caught
    if (error) {
        console.log(error)
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            {queryLoading ? (
                <ActivityIndicator color={'#000'} animating={true} size='small' />
            ) : (<>
                <Logo />
                <Header>Welcome back!</Header>
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
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPasswordScreen')}>
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={onLoginPressed} style={{}}>
                    Login
                </Button>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </>
            )}
        </Background>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});
