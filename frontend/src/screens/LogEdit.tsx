import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import { useMutation } from '@apollo/client';
import { Alert } from 'react-native'
import Log from '../graphql/types/Log';
import LogInput from '../graphql/types/LogInput';
import CREATE_LOG from '../graphql/mutations/CreateLog';
import GET_LOGS_BY_USER_ID from '../graphql/queries/GetLogsByUserId';
import NotesInput from '../graphql/types/NotesInput';
import LOG_EDIT from '../graphql/mutations/LogEdit';


const LogEdit = () => {

    const [contentText, setContentText] = useState('');

    //createLog
    const [editLog] = useMutation<{ input: NotesInput }>(LOG_EDIT, {
        variables: {
            input: {
                notes: contentText
            }
        },
        onCompleted: (data) => {
            console.log(`Yay: ${data}`);
        }, 
        onError: (error) => console.log(`Error: ${error}`),
    });

    const handleEdit = () => {
        console.log(`
        ${contentText},
    `);
        editLog();
    }

    return(
        <TouchableOpacity>
            <View style={{ marginTop: 50 }}>
                <Button onPress={handleEdit} title="Edit Log"/>
            </View>
            <TextInput 
                    style={styles.contentInput}
                    multiline
                    placeholder="Add notes"
                    onChangeText={setContentText}
                />
        </TouchableOpacity>
    );

   /* const edit = () => {
        Alert.alert('Edit');
    }
onPress={handleCreate}
    return (
        <TouchableOpacity>
            <View style={{ marginTop: 50 }}>
                <Button onPress={edit} title="Edit Log" />
            </View>
        </TouchableOpacity>
      ); */
}

const styles = StyleSheet.create({
    contentInput: {
        flexGrow: 1,
    },
})

export default LogEdit;