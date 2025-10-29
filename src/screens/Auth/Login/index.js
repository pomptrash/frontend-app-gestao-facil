import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { useAuthContext } from "../../../contexts/auth/AuthContext";
import authService from "../../../service/authService";
import { getStyle } from "../style";

export function Login() {
  // --------------------------------------------------
  // 🎛️ Estados locais
  // --------------------------------------------------
  const [form, setForm] = useState({ email: "", password: "" });
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // 🧠 Hooks globais
  // --------------------------------------------------
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { login: authLogin } = useAuthContext();

  const style = getStyle(theme);

  // --------------------------------------------------
  // 🔄 Mensagem de sucesso pós-cadastro
  // --------------------------------------------------
  useEffect(() => {
    if (route.params?.message) {
      setSuccessMessage(route.params.message);
    }
  }, [route.params]);

  // --------------------------------------------------
  // 🧩 Manipuladores
  // --------------------------------------------------
  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError("Preencha todos os campos");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("E-mail inválido");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log("🔐 Iniciando login com:", { email: form.email });
      const result = await authService.login(form.email, form.password);
      console.log("✅ Login bem-sucedido:", result);

      // Atualiza o estado global e persiste token
      await authLogin(result.token);
      // Redirecionamento automático via StackRoutes
    } catch (err) {
      console.error("❌ Erro ao logar:", err);
      setError(err?.message || "Falha ao realizar login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignUp = () => navigation.navigate("SignUp");

  const handleForgotPassword = () => {
    // Futuro: navegar para tela de recuperação
    console.log("⚙️ Implementar fluxo de recuperação de senha futuramente");
  };

  // --------------------------------------------------
  // 🖼️ Renderização
  // --------------------------------------------------
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={style.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={style.title}>Gestão Fácil</Text>

        <View style={style.form}>
          <Text style={style.label}>Entrar</Text>

          {/* Campo de e-mail */}
          <Input
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
            placeholder="E-mail"
            color={theme.text}
            placeHolderColor={theme.text}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
          />

          {/* Campo de senha */}
          <View style={style.passwordInput}>
            <Input
              value={form.password}
              onChangeText={(value) => handleInputChange("password", value)}
              placeholder="Senha"
              color={theme.text}
              placeHolderColor={theme.text}
              SetSecureTextEntry={true}
              secureTextEntry={hidePassword}
              setHidePassword={setHidePassword}
              hidePassword={hidePassword}
              autoComplete="password"
              returnKeyType="done"
            />
          </View>

          {/* Feedback de erro/sucesso */}
          {!!error && <Text style={[{color:theme.error}]}>{error}</Text>}
          {!!successMessage && <Text style={style.success}>{successMessage}</Text>}

          {/* Botão principal */}
          <Button
            btnText={loading ? "Entrando..." : "Entrar"}
            style={[
              style.btnLogin,
              loading || !form.email || !form.password
                ? { opacity: 0.6 }
                : {},
            ]}
            textStyle={style.btnLoginText}
            onPress={handleLogin}
            disabled={loading || !form.email || !form.password}
          />

          {loading && (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="small" color={theme.text} />
            </View>
          )}

          {/* Ações secundárias */}
          <Button
            btnText="Esqueci minha senha"
            textStyle={style.btnExtra}
            onPress={handleForgotPassword}
          />

          <Button
            btnText="Criar nova conta"
            textStyle={style.btnExtra}
            onPress={handleNavigateToSignUp}
          />
        </View>
        <Text></Text>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
