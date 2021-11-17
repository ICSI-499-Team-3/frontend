import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogCardProps } from '../components/molecules/log_card/LogCard';
import LogDetail from '../screens/LogDetail';
import TabView from '../screens/TabView';
import CreateLog from '../screens/CreateLog';
import MetricDetail, { MetricDetailNavigationProps } from '../screens/MetricDetail';
import CreateMetric from '../screens/CreateMetric';
import { RecCardProps } from '../components/molecules/Rec_Card/RecCard'; //emma
import RecDetail from '../screens/RecDetail'; //emma
import LogShare from '../screens/LogShare';
import LogDelete from '../screens/LogDelete';
import LogEdit from '../screens/LogEdit';
import CreateMeasurement, { CreateMeasurementNavigationProps } from '../screens/CreateMeasurement';
import MeasurementsList, { MeasurementsListNavigationProps } from '../components/molecules/measurements_list/MeasurementsList';
import AddLabel from '../screens/AddLabel';
import UpdateUserName from '../screens/UpdateUserName';
import UpdateUserEmail from '../screens/UpdateUserEmail';
import UpdateUserPassword from '../screens/UpdateUserPassword';
import UpdateUserPreExistingConditions from '../screens/UpdateUserPreExistingConditions';

export type AppStackParamList = {
    AddLabel: undefined;
    CreateLog: undefined;
    CreateMetric: undefined;
    CreateMeasurement: CreateMeasurementNavigationProps;
    LogsViewHome: undefined;
    LogDetail: LogCardProps;
    LogCard: undefined;
    MetricView: undefined;
    MetricCard: undefined;
    MetricDetail: MetricDetailNavigationProps;
    MetricDetailOptions: undefined;
    MeasurementsList: MeasurementsListNavigationProps;
    MeasurementsListItem: undefined;
    Tabs: undefined;
    LogShare: undefined;
    LogsView: undefined;
    RecommendationsView: undefined;
    RecCard: undefined;
    RecDetail: RecCardProps;
    LogDelete: undefined;
    LogEdit: undefined;
    UpdateUserName: undefined;
    UpdateUserEmail: undefined;
    UpdateUserPassword: undefined;
    UpdateUserPreExistingConditions: undefined;
    ProfileScreen: undefined;
};

const AppStack = () => {

    const Stack = createNativeStackNavigator<AppStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Tabs">
            <Stack.Group>
                { /* TABS */}
                <Stack.Screen
                    name="Tabs"
                    component={TabView}
                />

                { /* LOGS SCREENS */}
                <Stack.Screen name="LogDetail" component={LogDetail} />
                <Stack.Screen name="LogShare" component={LogShare} />
                <Stack.Screen name="AddLabel" component={AddLabel} />
                <Stack.Screen name="LogDelete" component={LogDelete} />
                <Stack.Screen name="LogEdit" component={LogEdit} />


                { /* MEASUREMENTS SCREENS */}
                <Stack.Screen name="MetricDetail" component={MetricDetail} />
                <Stack.Screen name="MeasurementsList" component={MeasurementsList} />

                { /* RECOMMENDATIONS SCREENS */}
                <Stack.Screen name="RecommendationsView" component={LogDetail} />
                <Stack.Screen name="RecDetail" component={RecDetail} />


                { /* PROFILE SCREENS */}
                <Stack.Group>
                    <Stack.Screen name="UpdateUserName" component={UpdateUserName} />
                    <Stack.Screen name="UpdateUserEmail" component={UpdateUserEmail} />
                    <Stack.Screen name="UpdateUserPassword" component={UpdateUserPassword} />
                    <Stack.Screen name="UpdateUserPreExistingConditions" component={UpdateUserPreExistingConditions} />
                </Stack.Group>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="CreateLog"
                    component={CreateLog}
                />
                <Stack.Screen
                    name="CreateMetric"
                    component={CreateMetric}
                />
                <Stack.Screen
                    name="CreateMeasurement"
                    component={CreateMeasurement}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppStack;