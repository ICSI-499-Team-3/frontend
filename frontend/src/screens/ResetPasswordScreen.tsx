import React, { useState } from 'react';
import Background from '../components/atoms/login/Background';
import BackButton from '../components/atoms/login/BackButton';
import Logo from '../components/atoms/login/Logo';
import Header from '../components/atoms/login/Header';
import TextInput from '../components/atoms/login/TextInput';
import Button from '../components/atoms/login/Button';
import { emailValidator } from '../helpers/emailValidator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppStack';

type ResetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ResetPasswordScreen'>;

export default function ResetPasswordScreen({ navigation }: ResetPasswordScreenProps) {
    const [email, setEmail] = useState({ value: '', error: '' });

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        navigation.navigate('LoginScreen');
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
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
                description="You will receive email with password reset link."
            />
            <Button
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}>
                Send Instructions
            </Button>
        </Background>
    );
}
