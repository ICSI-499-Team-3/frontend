import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CardIcons from '../components/atoms/card_icons/CardIcons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';


type LabelProps = NativeStackScreenProps<AppStackParamList, 'AddLabel'>;

const handlerLongClick = () => {
  Alert.alert("Pressed");
};

/**
 * @author Emma Wirth 
 */
const AddLabel = () => {

  const activitiesToIcons = new Map();
  activitiesToIcons.set('soccer', 'soccer');

  return (
    <View>
   <CardIcons categories={[]} />
        <Icon.Button
          name="soccer"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="baseball"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="basketball"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="tennis"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="football"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="swim"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
</View>
  );
        
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    padding: 30
  },
  space: {
    height: 10,
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 15,
},
ActivityText: {
  fontSize: 15,
  fontWeight: 'bold',
  flex: 1,
  borderWidth: 3,
  borderColor: 'black',
  padding: 2,
  textAlign: 'center',
  margin: 4,
  backgroundColor: '#fff' // white
},
})

export default AddLabel;

/*     {categories?.map(category => (
            <Text style={styles.ActivityText} key={category}>
              <Icon key={category} name={activitiesToIcons.get(category)} size={20} />
                  {category}
            </Text>
          ))}*/