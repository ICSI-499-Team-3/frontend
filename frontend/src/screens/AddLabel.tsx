import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardIcons from '../components/atoms/card_icons/CardIcons';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native'

const handlerLongClick = () => {
  Alert.alert("Pressed");
};


/**
 * @author Lauren Velez, Emma Wirth 
 */
const AddLabel = ({...props }) => {

  return (
    <View>
        <CardIcons categories={[]} />
        <Icon.Button
          name="run"
          onPress={handlerLongClick}>
        </Icon.Button>
        <View style={styles.space} /> 
        <Icon.Button
          name="food"
          onPress={handlerLongClick}>
        </Icon.Button>
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
})

export default AddLabel;