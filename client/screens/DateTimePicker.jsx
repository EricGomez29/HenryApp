import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from 'expo-constants';
import DateTimePicker from 'react-datetime-picker';
 
const Example = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    };
    if(!Constants.platform.web){
        return (
        <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            />
        </View>
        );
    }else{
        const [value, onChange] = useState(new Date());
        return (
            <div>
                <DateTimePicker
                onChange={onChange}
                value={value}
                format="dd/MM/y"
                />
            </div>
        );
    };
}
 
export default Example;