// Template from https://github.com/venits/react-native-login-template

import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../../core/theme';


// { style, ...props }:{style: StyleProp<ViewStyle>; children: React.ReactNode
/**
 * @author Habib Affinnih
 */
export default function Button({ style, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                { backgroundColor: theme.colors.primary },
                style,
            ]}
            labelStyle={styles.text}
            mode='contained'
            children=''
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});
