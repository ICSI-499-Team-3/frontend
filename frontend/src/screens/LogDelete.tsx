import React from 'react';
import { View, Button, TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'
//import LogsList from '../components/molecules/logs_list/LogsList'
import LogData from '../types/LogData';
import { useAuth } from '../contexts/Auth';
import GET_LOGS_BY_USER_ID_DELETE from '../queries/GetLogsByUserIdDelete';
import GET_ALL_LOGS from '../queries/GetAllLogs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { useMutation, useQuery } from '@apollo/client';
import LogDeleteData from '../types/LogDeleteData';
import DELETE_LOG from '../mutations/DeleteLog';
import GET_LOGS_BY_USER_ID from '../queries/GetLogsByUserId';
import GetLogByIdData from '../types/GetLogByIdData';

type LogDeleteProps = NativeStackNavigationProp<AppStackParamList, 'Tabs'>;

//export type LogDeleteNavigationProps = {
//    userId: string;
//};

const LogDelete = () => {
/*const LogDelete = ({ route, navigation }: LogDeleteProps) => {

    const { userId } = route.params;

    const [deleteLog] = useMutation<LogDeleteData, { userId: string; }>(DELETE_LOG, {
        variables: {
            userId: userId,
        },
        refetchQueries: [
            GET_LOGS_BY_USER_ID, 
            "GetLogsByUserId",
        ],
        onCompleted: () => navigation.goBack(),
    });

    const { loading, error, data } = useQuery<GetLogByIdData, { id: string; }>(GET_LOGS_BY_USER_ID, {
        variables: {
            id: userId,
        },
    });

    const deletePressHander = () => {
        Alert.alert(
            'Alert', 
            'Are you sure you want to delete this log?', 
            [
                {
                    'text': "Cancel", 
                    onPress: () => console.log('do nothing'), 
                    style: 'cancel', 
                }, 
                {
                    text: 'Ok', 
                    onPress: () => deleteLog(),
                },
            ],
        );
    };*/













/*const navigation = useNavigation<LogCardNavigationProp>();
   
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
      ); */

};

export default LogDelete;

