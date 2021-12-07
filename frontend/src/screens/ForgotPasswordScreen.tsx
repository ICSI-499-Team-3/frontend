import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import BackButton from '../components/atoms/login/BackButton';
import Background from '../components/atoms/login/Background';
import Button from '../components/atoms/login/Button';
import Header from '../components/atoms/login/Header';
import Logo from '../components/atoms/login/Logo';
import TextInput from '../components/atoms/login/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import { AuthStackParamList } from '../navigation/AuthStack';

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordScreen'>;

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
    const [email, setEmail] = useState({ value: '', error: '' });

    const continueToCodeScreen = (sendEmail: boolean) => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        if(sendEmail) {
            // Email sending logic
        }

        navigation.navigate('ForgotPasswordCodeScreen', { email: email.value });
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Forgot Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with a password reset code."
            />
            <Button
                onPress={continueToCodeScreen}
                style={{ marginTop: 16 }}>
                Send Code
            </Button>
            <Button
                onPress={continueToCodeScreen}
                style={{ marginTop: 16 }}>
                I Already Have a Code
            </Button>
        </Background>
    );
}
