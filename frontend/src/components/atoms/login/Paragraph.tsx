// Template from https://github.com/venits/react-native-login-template

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

/**
 * @author Habib Affinnih
 */
export default function Paragraph(props) {
    return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 12,
    },
});
