import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from 'expo-constants';
import DateTimePicker from 'react-datetime-picker';
import { EDIT_FECHA_COHORTE } from '../apollo/cohorte'
import { useMutation } from "@apollo/client";
 
const Example = ({id}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    console.log(id)
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        try {
            const response = useMutation(EDIT_FECHA_COHORTE, {
                variables:{
                    fecha: date.toString(),
                    id 
                }
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        hideDatePicker();
    };
    if(!Constants.platform.web){
        return (
        <View style={{backgroundColor: "white", width:"100%", zIndex:100}}>
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