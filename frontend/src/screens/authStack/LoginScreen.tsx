// Template from https://github.com/venits/react-native-login-template

import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/atoms/login/BackButton';
import Background from '../../components/atoms/login/Background';
import Button from '../../components/atoms/login/Button';
import Header from '../../components/atoms/login/Header';
import Logo from '../../components/atoms/login/Logo';
import TextInput from '../../components/atoms/login/TextInput';
import { useAuth } from '../../contexts/Auth';
import { theme } from '../../core/theme';
import GET_USER_BY_EMAIL_AND_PASSWORD from '../../graphql/queries/GetUserByEmailAndPassword';
import User from '../../graphql/types/User';
import UserLoginInput from '../../graphql/types/UserLoginInput';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { AuthStackParamList } from '../../navigation/AuthStack';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const auth = useAuth();

    const [getUser, { loading: queryLoading }] = useLazyQuery<{ GetUserByEmailAndPassword: User; }, { input: UserLoginInput; }>(
        GET_USER_BY_EMAIL_AND_PASSWORD, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data.GetUserByEmailAndPassword !== null) {
                auth.updateAuthData(data.GetUserByEmailAndPassword);
            }
            else {
                Toast.show({
                    text1: "Incorrect email or password!",
                    text2: "Please try again"
                });
            }
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        getUser({
            variables: {
                input: {
                    email: email.value,
                    password: password.value
                }
            }
        });
    };

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
                        onPress={() => navigation.navigate('ForgotPasswordScreen', { email: email.value })}>
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => onLoginPressed()} style={{}}>
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
