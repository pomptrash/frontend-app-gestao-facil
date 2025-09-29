import {View, Text} from 'react-native'

import { useTheme } from '../../theme/ThemeContext'

export function ClientAssets(){
    const { theme } = useTheme()
    return (
        <View style={{flex:1,justifyContent:'center', alignItems: 'center', backgroundColor: theme.background}}>
            <Text style={{fontSize: 32, color: theme.text}}>Ativos</Text>
        </View>
    )
}