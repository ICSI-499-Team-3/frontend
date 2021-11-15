import React from 'react';
import { View, Button, TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'

const LogEdit = () => {

    const edit = () => {
        Alert.alert('Edit Log');
    };

    return (
        <TouchableOpacity>
            <View style={{ marginTop: 50 }}>
                <Button onPress={edit} title="Edit Log" />
            </View>
        </TouchableOpacity>
      ); 
}

export default LogEdit;