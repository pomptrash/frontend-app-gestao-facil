import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { Button } from '../../components/Button';

export function Options() {
    const { logout, user } = useAuth();
    const { theme } = useTheme();

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Sair', 
                    style: 'destructive',
                    onPress: logout
                }
            ]
        );
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
            <Text style={{ color: theme.text, fontSize: 18, marginBottom: 20 }}>
                Logado como: {user?.email}
            </Text>
            <Text style={{ color: theme.text, fontSize: 16, marginBottom: 20 }}>
                Cargo: {user?.cargo}
            </Text>
            
            {/* ✅ BUTTON COM ESTILOS CORRETOS */}
            <Button 
                btnText="Sair da Conta"
                onPress={handleLogout}
                style={{ 
                    backgroundColor: '#FF3B30',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 10
                }}
                textStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16
                }}
            />
        </View>
    );
}