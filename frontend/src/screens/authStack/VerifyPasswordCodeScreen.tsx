import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import BackButton from '../../components/atoms/login/BackButton';
import Background from '../../components/atoms/login/Background';
import Button from '../../components/atoms/login/Button';
import Header from '../../components/atoms/login/Header';
import Logo from '../../components/atoms/login/Logo';
import TextInput from '../../components/atoms/login/TextInput';
import VERIFY_PASSWORD_RESET_CODE from '../../graphql/queries/VerifyPasswordResetCode';
import { AuthStackParamList } from '../../navigation/AuthStack';

type VerifyPasswordCodeNavigationProps = NativeStackScreenProps<AuthStackParamList, 'VerifyPasswordCodeScreen'>;

export type VerifyPasswordCodeProps = {
    email: string;
};

/**
 * @author Habib Affinnih 
 */
export default function VerifyPasswordCodeScreen({ route, navigation }: VerifyPasswordCodeNavigationProps) {
    const [email, setEmail] = useState({ value: route.params.email, error: '' });
    const [code, setCode] = useState({ value: '', error: '' });

    const [verifyResetCode, { loading }] = useLazyQuery<
        { VerifyPasswordResetCode: boolean; },
        { email: string, passwordResetCode: string; }
    >(
        VERIFY_PASSWORD_RESET_CODE, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            // true if the code was verified, false if the user does not exist
            if (data.VerifyPasswordResetCode) {
                navigation.navigate('ResetPasswordScreen', { email: email.value });
            }
            else {
                setEmail({ ...email, error: "Account not found!" });
                setCode({ ...code, error: '' });
            }
        },
        onError: (error) => {
            console.log(`Error on VERIFY_PASSWORD_RESET_CODE: ${error.message}`);
            const errorMessage = error.message.split(':')[1];
            setCode({ ...code, error: errorMessage });
        }
    });

    const handleVerifyCode = () => {
        if (code.value == "") {
            setCode({ ...code, error: "Code can't be empty." });
            setEmail({ ...email, error: '' });
            return;
        }

        verifyResetCode({ variables: { email: email.value, passwordResetCode: code.value } });
    };

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            {loading ? <ActivityIndicator color={'#000'} animating={true} size='small' /> :
                <>
                    <Logo />
                    <Header>Verify Reset Code</Header>
                    <TextInput
                        label="E-mail address"
                        value={email.value}
                        onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
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
                        onPress={() => handleVerifyCode()}
                        style={{ marginTop: 16 }}>
                        Verify Code
                    </Button>
                </>
            }
        </Background>
    );
}
