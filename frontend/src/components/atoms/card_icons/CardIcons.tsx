import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CardIconsProps = {
    categories: string[];
};

const CardIcons = ({ categories }: CardIconsProps) => {

    categories = ['running', 'yoga', 'going out', 'physical therapy', 'therapy', 'eating', 'spending time with friends'];

    const [selectedCategories, setSelectedCategories] = useState(new Set<string>());

    const activitiesToIcons = new Map()
    activitiesToIcons.set(categories.indexOf('running'), 'run') // 0
    activitiesToIcons.set(categories.indexOf('eating'), 'food') // 5

    // console.log(activitiesToIcons);

    const pickedCategory = (category: string) => {
        if (selectedCategories.has(category)) { // true
            
            selectedCategories.delete(category);
        } else {
            selectedCategories.add(category);
        }
            setSelectedCategories(selectedCategories);
    };

    // console.log(selectedCategories);

    return (
        <View style={[styles.categoriesContainer]}>
            {categories.map(category => (
            <Icon key={category} name={activitiesToIcons.get(pickedCategory(category))} size={20} />
        ))}
        </View> 
    );
};

/*         <View style={[styles.categoriesContainer]}>
            {categories.slice(0, 3).map(category => <Icon key={category} name={'run'} size={20} />)}
        </View>

                {<Icon name={activitiesToIcons.get(categories.indexOf('running'))} size={20} />}
        {<Icon key={categories.indexOf('yoga')} name={activitiesToIcons.get(categories.indexOf('yoga'))} size={20} />}

        */

const styles = StyleSheet.create({
    categoriesContainer: {
        display: 'flex', 
        flexDirection: 'row',
    },
});

export default CardIcons;