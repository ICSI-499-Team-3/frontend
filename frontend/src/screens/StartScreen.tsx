import React from 'react';
import Background from '../components/atoms/login/Background';
import Logo from '../components/atoms/login/Logo';
import Header from '../components/atoms/login/Header';
import Button from '../components/atoms/login/Button';
import Paragraph from '../components/atoms/login/Paragraph';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppStack';

type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

export default function StartScreen({ navigation }: StartScreenProps) {
    return (
        <Background>
            <Logo />
            <Header>Dyevo</Header>
            <Paragraph>
                Holistic, Efficient Fitness & Healthcare
            </Paragraph>
            <Button onPress={() => navigation.navigate('LoginScreen')} style={undefined}>
                Login
            </Button>
            <Button onPress={() => navigation.navigate('RegisterScreen')} style={undefined}>
                Sign Up
            </Button>
        </Background>
    );
}
