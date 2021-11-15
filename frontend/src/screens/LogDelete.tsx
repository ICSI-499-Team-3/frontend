import React from 'react';
import { View, Button, TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'
//import LogsList from '../components/molecules/logs_list/LogsList'
import LogData from '../types/LogData';
import { useAuth } from '../contexts/Auth';
import { useMutation } from '@apollo/client';
import GET_LOGS_BY_USER_ID_DELETE from '../queries/GetLogsByUserIdDelete';
import GET_ALL_LOGS from '../queries/GetAllLogs';


const LogDelete = () => {
   
    const { logData } = useAuth();

    const [toDelete] = useMutation<LogData>(GET_LOGS_BY_USER_ID_DELETE,
        {
            update(cache, { data }) {
                const existingLogs: any = cache.readQuery({ 
                    query: GET_ALL_LOGS
              });
                 const newLogs = existingLogs!.getLogsByUserIdDelete.filter((t:any) => (t.id !== logData!.id));
                 cache.writeQuery({
                    query: GET_ALL_LOGS,
                    data: {getLogsByUserIdDelete: newLogs}
                  });
          }
         });

    const deleteLog = () => {
        Alert.alert(
            'Delete Log',
            'Are you sure want to delete this log?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => deleteLogDetail()},
        
            ],
                { cancelable: false }
        );

        toDelete({
            variables: { id: logData!.id },
        });
    }
        
    const deleteLogDetail = () => {
        Alert.alert('Deleted')
        
        //const data = useMutation<LogData>(GET_ALL_LOGS);
        
        //LogsList.splice()
        //const filteredData = data?.GetLogsByUserId.filter((item: { id: any; }) => item.id !== id);
    };

    return (
        <TouchableOpacity>
            <View style={{ marginTop: 50 }}>
                <Button onPress={deleteLog} title="Delete Log" />
            </View>
        </TouchableOpacity>
      ); 
};

export default LogDelete;