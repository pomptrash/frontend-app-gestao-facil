import {Text, TouchableOpacity } from 'react-native'

export function Button({btnText, onPress, style, textStyle}){

    return(
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={textStyle} >{btnText}</Text>
        </TouchableOpacity>
    )
}