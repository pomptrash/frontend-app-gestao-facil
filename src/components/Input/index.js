import {View, Text, TextInput } from 'react-native'
import { style } from './style'

export function Input({value, type, label, onChangeText, placeholder, color}){

    return(
        <View>
            <Text style={{color: color}}>{label}</Text>
            <TextInput style={style.input} placeholder={placeholder} placeholderTextColor={color}/>
        </View>
    )
}