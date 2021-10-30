import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CardIconsProps = {
    categories: string[];
};

const CardIcons = ({ categories }: CardIconsProps) => {
    return (
        <View style={[styles.categoriesContainer]}>
            {categories.slice(0, 3).map(category => <Icon key={category} name={'run'} size={20} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        display: 'flex', 
        flexDirection: 'row',
    },
});

export default CardIcons;