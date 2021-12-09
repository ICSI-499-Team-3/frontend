import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/atoms/login/BackButton';
import Background from '../../components/atoms/login/Background';
import Button from '../../components/atoms/login/Button';
import Header from '../../components/atoms/login/Header';
import Logo from '../../components/atoms/login/Logo';
import TextInput from '../../components/atoms/login/TextInput';
import SEND_PASSWORD_RESET_CODE from '../../graphql/queries/SendPasswordResetCode';
import { emailValidator } from '../../helpers/emailValidator';
import { AuthStackParamList } from '../../navigation/AuthStack';

type ForgotPasswordScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordScreen'>;

export type ForgotPasswordScreenProps = {
    email: string;
};

/**
 * @author Habib Affinnih
 */
export default function ForgotPasswordScreen({ route, navigation }: ForgotPasswordScreenNavigationProps) {
    const [email, setEmail] = useState({ value: route.params.email, error: '' });

    const [sendPasswordResetCode, { loading }] = useLazyQuery<{ SendPasswordResetCode: boolean; }, { email: String; }>(
        SEND_PASSWORD_RESET_CODE, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            // returns true if the email was sent to the user
            if (data.SendPasswordResetCode) {
                navigation.navigate('VerifyPasswordCodeScreen', { email: email.value });
                Toast.show({
                    text1: "Reset code sent!",
                    text2: "Please check your email"
                });
            }
            else {
                Toast.show({
                    text1: "Server error!",
                    text2: "Please try again later"
                });
            }
        },
        onError: (error) => {
            console.log(`Error on sendForgotPassword: ${error.message}`);
        }
    });

    const continueToCodeScreen = async (sendEmail: boolean) => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        if (sendEmail) {
            sendPasswordResetCode({ variables: { email: email.value } });
        }
        else {
            navigation.navigate('VerifyPasswordCodeScreen', { email: email.value });
        }
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            {loading ? <ActivityIndicator color={'#000'} animating={true} size='small' /> :
                <>
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
                    <Button onPress={() => continueToCodeScreen(true)} style={{ marginTop: 16 }}>
                        Send Code
                    </Button>
                    <Button onPress={() => continueToCodeScreen(false)} style={{ marginTop: 16 }}>
                        I Already Have a Code
                    </Button>
                </>
            }
        </Background>
    );
}
