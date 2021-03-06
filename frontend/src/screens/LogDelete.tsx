import React from 'react';
import { View, Button, TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'
//import LogsList from '../components/molecules/logs_list/LogsList'
import LogData from '../graphql/types/LogData';
import { useAuth } from '../contexts/Auth';
import { useMutation } from '@apollo/client';
import GET_LOGS_BY_USER_ID_DELETE from '../graphql/queries/GetLogsByUserIdDelete';
import GET_ALL_LOGS from '../graphql/queries/GetAllLogs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';

type LogCardNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Tabs'>;

/**
 * @author Emma Wirth, Lauren Velez
 */
const LogDelete = () => {

    const navigation = useNavigation<LogCardNavigationProp>();
   
    const { authData } = useAuth();

    const [toDelete] = useMutation<LogData>(GET_LOGS_BY_USER_ID_DELETE,
        {
            update(cache, {}) {
                const existingLogs: any = cache.readQuery({ 
                    query: GET_ALL_LOGS
              });
                 const newLogs = existingLogs!.getLogsByUserIdDelete.filter((t:any) => (t.id !== authData!.id));
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
            variables: { id: authData!.id },
        });
    }
        
    const deleteLogDetail = () => {

        Alert.alert(
            'Deleted',
            'This log has been deleted.',
            [
                {text: 'OK', onPress: () => navigation.navigate('Tabs')},
        
            ],
                { cancelable: false }
        );
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

