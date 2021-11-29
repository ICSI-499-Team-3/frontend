import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { theme } from "../../core/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigation/AppStack";
import Button from "../../components/atoms/login/Button";
import Toast from "react-native-toast-message";
import notifee, { AndroidImportance, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type NotificationSettingsProps = NativeStackScreenProps<AppStackParamList, 'UpdateUserName'>;

type NotificationData = {
    on: boolean;
    time: Date;
};

const NotificationSettings = ({ route, navigation }: NotificationSettingsProps) => {
    const [notification, setNotification] = useState<NotificationData>({ on: false, time: new Date() });
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    useEffect(() => {
        // Load notification data each time the page is opened
        loadNotificationSettings();
    }, []);

    async function loadNotificationSettings(): Promise<void> {
        try {
            //Try get the data from Async Storage
            const notificationDataSerialized = await AsyncStorage.getItem('@NotificationData');
            if (notificationDataSerialized) {
                //If there are data, it's converted to an Object and the state is updated.
                const _notificationData: NotificationData = JSON.parse(notificationDataSerialized);
                setNotification({ on: _notificationData.on, time: new Date(_notificationData.time) });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async () => {
        await AsyncStorage.setItem('@NotificationData', JSON.stringify(notification));
        createTriggerNotification();

        Toast.show({
            text1: 'Notification Preferences Saved!',
        });

        navigation.goBack();
    };

    async function createTriggerNotification() {
        // It's safe to assume the channel is not created when the app is launched.
        // Rerunning this line simply upadted the channel if it already exists
        await notifee.createChannel({
            id: 'log-reminder',
            name: 'Log Reminder',
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,
        });

        const timestamp = notification.time;
        timestamp.setSeconds(0);

        // Create a time-based trigger
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: timestamp.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
        };

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                title: 'Log Reminder',
                body: 'Don\'t forget to log your activities today!',
                android: {
                    channelId: 'log-reminder',
                    pressAction: {
                        id: 'default',
                    }
                },
            },
            trigger,
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Update Notifications</Text>
            <ListItem containerStyle={styles.listItemContainer}>
                <ListItem.Content>
                    <ListItem.Title style={styles.listItemTitle}>Daily Notification</ListItem.Title>
                </ListItem.Content>
                <Switch value={notification.on} onValueChange={() => (setNotification({ on: !notification.on, time: notification.time }))} />
            </ListItem>
            {notification.on && (
                <>
                    <ListItem containerStyle={styles.listItemContainer} onPress={() => setIsDatePickerVisible(true)}>
                        <ListItem.Content style={{ alignItems: 'center' }}>
                            <ListItem.Title style={styles.listItemTime}>{notification.time.toLocaleTimeString()}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="time"
                        onConfirm={(time) => {
                            time.setSeconds(0);
                            setNotification({ on: notification.on, time: time });
                            setIsDatePickerVisible(false);
                        }}
                        onCancel={() => setIsDatePickerVisible(false)}
                    />
                </>
            )}
            <Button style={{ marginTop: 12 }} onPress={() => handleSave()}>
                Save
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surface,
        padding: 30,
    },

    heading: {
        fontSize: 30,
        textAlign: "center",
        paddingBottom: 20,
        borderBottomWidth: .9,
    },

    currentName: {
        fontSize: 20,
        paddingTop: 20,
        textAlign: "center",
    },

    listItemContainer: {
        height: 65,
        borderWidth: .8,
        borderColor: '#ECECEC',
    },

    listItemTitle: {
        fontSize: 18,
    },

    listItemTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default NotificationSettings;