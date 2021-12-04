import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CardIconsProps = {
    categories: string[]
};

//{categories.slice(0, 6).map(category  => <Icon key={category} name={activitiesToIcons.get('running')} size={20} />)}
//{categories.slice(0, 6).map(category => <Icon key={category} name={activitiesToIcons.get('yoga')} size={20} />)}
//{categories.slice(0, 6).map(category => <Icon key={category} name={activitiesToIcons.get('eating')} size={20} />)}

const CardIcons = ({ categories }: CardIconsProps) => {

    //categories = ['running', 'yoga', 'going out', 'physical therapy', 'therapy', 'eating', 'spending time with friends'];

    const activitiesToIcons = new Map()
    activitiesToIcons.set('running', 'run')
    activitiesToIcons.set('yoga', 'yoga')
    activitiesToIcons.set('going out', 'party-popper')
    activitiesToIcons.set('physical therapy', 'doctor')
    activitiesToIcons.set('therapy', 'account-heart')
    activitiesToIcons.set('eating', 'food')
    activitiesToIcons.set('spending time with friends', 'human-male-female')



  /* {categories.map(category => (
                        <Icon 
                        key={category} 
                        name={activitiesToIcons.get(categories.indexOf('yoga'))} 
                        size={20}
                        onPress={() => handlePickCategory(category)}
                         />
                    ))}*/

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