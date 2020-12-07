import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Switch } from 'react-native';
import styled from 'styled-components';

export default function Welcome( { navigation } ){
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <TouchableOpacity>
                <View>
                    <Text>BIENVENIDO!</Text>
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </TouchableOpacity>
            {/* <TouchableOpacity  >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    PERIL
                </Text>
            </TouchableOpacity> */}
            
        </View>
    )
}

