// Template from https://github.com/venits/react-native-login-template

import React from 'react';
import { TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * @author Habib Affinnih
 */
export default function BackButton({ goBack }: { goBack: (event: GestureResponderEvent) => void; }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../assets/arrow_back.png')}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 4,
    },
    image: {
        width: 24,
        height: 24,
    },
});
