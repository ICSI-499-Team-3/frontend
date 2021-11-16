import React, { useState, useContext } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export enum dateTimePickerModes {
    Date = "date", 
    Time = "time",
    DateTime = "datetime",
}

type DateTimePickerProps = {
    selectedDate: Date;
    setSelectedDate: Function;
    selectedTime: Date;
    setSelectedTime: Function;
    selectedDateTime: number;
    setSelectedDateTime: Function;
    isDatePickerVisible: boolean;
    setIsDatePickerVisible: Function;
    dateTimePickerMode: dateTimePickerModes;
    setDateTimePickerMode: Function;

    onConfirm?: Function; // for checking if selectedDateTime is different than dateTimeMeasured in update mode for CreateMeasurement
};

const DateTimePicker = (props: DateTimePickerProps) => {

    const handleDateConfirmed = (date: Date) => {
        switch (props.dateTimePickerMode) {
            case dateTimePickerModes.Date: 
                {
                    const dateTime = new Date(
                        date.getFullYear(),
                        date.getMonth(), 
                        date.getDate(), 
                        props.selectedTime.getHours(), 
                        props.selectedTime.getMinutes(), 
                        props.selectedTime.getSeconds(), 
                        props.selectedTime.getMilliseconds()
                    );
                    const epoch = dateTime.getTime() / 1000;
                    const epochDate = new Date(0);
                    epochDate.setUTCSeconds(epoch);
                    props.setSelectedDateTime(epoch);
                    props.setSelectedDate(date);
                    props.setIsDatePickerVisible(false);

                    if (props.onConfirm) {
                        props.onConfirm(epoch);
                    }
                }
                break;
            case dateTimePickerModes.Time: 
                {
                    const dateTime = new Date(
                        props.selectedDate.getFullYear(),
                        props.selectedDate.getMonth(), 
                        props.selectedDate.getDate(), 
                        date.getHours(), 
                        date.getMinutes(), 
                        date.getSeconds(), 
                        date.getMilliseconds()
                    );
                    const epoch = dateTime.getTime() / 1000;
                    const epochDate = new Date(0);
                    epochDate.setUTCSeconds(epoch);
                    props.setSelectedDateTime(epoch);
                    props.setSelectedTime(date);
                    props.setIsDatePickerVisible(false);

                    if (props.onConfirm) {
                        props.onConfirm(epoch);
                    }
                }
                break;
        }
    };

    return (
        <DateTimePickerModal 
            isVisible={props.isDatePickerVisible}
            mode={props.dateTimePickerMode}
            onConfirm={handleDateConfirmed}
            onCancel={() => props.setIsDatePickerVisible(false)}
        />
    );
};

export default DateTimePicker;