import React from 'react';
import { AppStackParamList } from '../navigation/AppStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LogsViewHome from '../components/molecules/log_view_home/LogsViewHome';

type SharedLogsViewNavigationProps = NativeStackScreenProps<AppStackParamList, 'SharedLogsView'>;

export type SharedLogsViewProps = {
    userId: string;
};

/**
 * @author Tony Comanzo 
 */
const SharedLogsView = ({ route }: SharedLogsViewNavigationProps) => {

    const { userId } = route.params;
    
    return (
        <LogsViewHome userId={userId} />
    );
};

export default SharedLogsView;