// Template from https://github.com/venits/react-native-login-template

import React, { FC } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { theme } from '../../../core/theme';

/**
 * @author Habib Affinnih
 */
export default function Background({ children }: { children: JSX.Element[]; }) {
    return (
        <View style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surface,
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
