// Template from https://github.com/venits/react-native-login-template

import React from 'react';
import {Image, StyleSheet} from 'react-native';

/**
 * @author Habib Affinnih
 */
export default function Logo() {
    return (
        <Image source={require('../../../assets/logo_no_text.png')} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 110,
        marginBottom: 8,
    },
});
