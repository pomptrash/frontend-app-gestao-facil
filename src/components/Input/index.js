import { View, Text, TextInput } from 'react-native'
import { style } from './style'

export function Input({secureTextEntry, value, type, setLabel=false, label, onChangeText, placeholder, placeHolderColor, color}){

    return(
        <View>
            {setLabel && (<Text style={{color: color}}>{label}</Text>)}
            <TextInput value={value} keyboardType={type} style={style.input} placeholder={placeholder} placeholderTextColor={placeHolderColor} color={color} onChangeText={onChangeText} secureTextEntry={secureTextEntry}/>
        </View>
    )
}