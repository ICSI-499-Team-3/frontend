// Template from https://github.com/venits/react-native-login-template

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../../../core/theme';

/**
 * @author Habib Affinnih
 */
export default function Header(props: { children?: React.ReactNode; }) {
    return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        color: theme.colors.primary,
        // borderColor: theme.colors.text,
        // borderWidth: 1,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
});
