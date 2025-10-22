import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../contexts/theme/ThemeContext'; // ✅ Corrigido o caminho

export const Loading = () => {
    const { theme } = useTheme();

    const containerStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background
    };

    const textStyle = {
        color: theme.text,
        marginTop: 10
    };

    return (
        <View style={containerStyle}> 
            <ActivityIndicator size="large" color={theme.text} />
            <Text style={textStyle}>Carregando...</Text>
        </View>
    );
}; // ✅ CORRETO - apenas };