import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CardIconsProps = {
    categories: string[];
};

 const CardIcons = ({ categories }: CardIconsProps) => {

    const activitiesToIcons = new Map()
    activitiesToIcons.set('running', 'run') 
    activitiesToIcons.set('eating', 'food') 
    activitiesToIcons.set('going out', 'party-popper') 
    activitiesToIcons.set('spending time with friends', 'human-male-female')
    activitiesToIcons.set('physical therapy', 'doctor')
    activitiesToIcons.set('therapy', 'account-heart')

    return (
    <View style={[styles.categoriesContainer]}>
        {categories.slice(0, 3).map(category => <Icon key={category} name={activitiesToIcons.get(category)} size={20} />)}
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