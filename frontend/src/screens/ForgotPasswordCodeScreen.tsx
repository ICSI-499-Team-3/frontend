import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import BackButton from '../components/atoms/login/BackButton';
import Background from '../components/atoms/login/Background';
import Button from '../components/atoms/login/Button';
import Header from '../components/atoms/login/Header';
import Logo from '../components/atoms/login/Logo';
import TextInput from '../components/atoms/login/TextInput';
import { AuthStackParamList } from '../navigation/AuthStack';

type ForgotPasswordCodeNavigationProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordCodeScreen'>;

export type ForgotPasswordCodeProps = {
    email: string;
};

export default function ForgotPasswordCodeScreen({ route, navigation }: ForgotPasswordCodeNavigationProps) {
    const { email } = route.params;
    const [code, setCode] = useState({ value: '', error: '' });

    const verifyCode = () => {

    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Forgot Password</Header>
            <TextInput
                label="E-mail address"
                value={email}
                editable={false}
            />
            <TextInput
                label="Code"
                returnKeyType="done"
                value={code.value}
                onChangeText={(text: string) => setCode({ value: text, error: '' })}
                error={!!code.error}
                errorText={code.error}
                keyboardType="number-pad"
                description="Enter the code from your email."
            />
            <Button
                onPress={verifyCode}
                style={{ marginTop: 16 }}>
                Verify Code
            </Button>
        </Background>
    );
}
