import {View, Text} from 'react-native'

import { useTheme } from '../../theme/ThemeContext'
import { getGlobalStyles } from '../../theme/themeStyles'

export function ClientAssets(){
    const { theme } = useTheme()
    const globalStyles = getGlobalStyles(theme)

    return (
        <View style={[{flex:1,justifyContent:'center', alignItems: 'center'}, globalStyles.background]}>
            <Text style={[{fontSize: 32}, globalStyles.text]}>Ativos</Text>
        </View>
    )
}