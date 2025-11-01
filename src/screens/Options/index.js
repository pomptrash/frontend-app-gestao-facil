import React from "react";
import { View, Text, Alert, Platform } from "react-native";
import { useAuthContext } from "../../contexts/auth/AuthContext";
import { useTheme } from "../../contexts/theme/ThemeContext";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export function Options() {
  const { logout, user } = useAuthContext();
  const { theme } = useTheme();
  const navigation = useNavigation();

  console.log("🧩 [Options] Tela Perfil montada. Usuário:", user);

  const handleLogout = async () => {
    console.log("🧭 [Options] Botão pressionado — iniciando fluxo de logout...");

    // ✅ Detecta ambiente (Web ou Mobile)
    if (Platform.OS === "web") {
      const confirmLogout = window.confirm("Tem certeza que deseja sair da conta?");
      if (!confirmLogout) {
        console.log("🚫 [Options] Logout cancelado no navegador.");
        return;
      }

      try {
        console.log("⚙️ [Options] Executando logout() do contexto...");
        await logout();
        console.log("✅ [Options] Logout concluído, redirecionando para Login...");
      } catch (error) {
        console.error("❌ [Options] Erro ao sair:", error);
        alert("Erro ao sair da conta.");
      }
      return;
    }

    // 📱 Alert nativo (funciona Android/iOS)
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair do aplicativo?",
      [
        { text: "Cancelar", style: "cancel", onPress: () => console.log("🚫 [Options] Cancelado pelo usuário") },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("⚙️ [Options] Executando logout() do contexto...");
              await logout();
              console.log("✅ [Options] Logout concluído, redirecionando para Login...");
            } catch (error) {
              console.error("❌ [Options] Erro ao sair:", error);
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
        justifyContent: "space-between",
      }}
    >
      <View style={{marginTop:20}}>
        <Text
          style={{
            color: theme.text,
            fontSize: 24,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Perfil do Usuário
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight:'bold', textTransform:'uppercase' }}>
            <Text style={{ fontWeight: "600", fontSize: 20 }}>E-mail: </Text>
            {user?.email || "Não disponível"}
          </Text>

          <Text style={{ color: theme.text, fontSize: 16, fontWeight:'bold', textTransform:'uppercase' }}>
            <Text style={{ fontWeight: "600", fontSize: 20}}>Cargo: </Text>
            {user?.role || "Não informado"}
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Button
          btnText="Sair da Conta"
          onPress={() => {
            console.log("🖱️ [Options] Clique detectado — chamando handleLogout()");
            handleLogout();
          }}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3,
            elevation: 3,
          }}
          textStyle={{
            color: "#FFF",
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        />
      </View>
    </View>
  );
}
