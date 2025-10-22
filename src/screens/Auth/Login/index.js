import { View, Text } from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../../hooks/useAuth";
import authService from "../../../service/authService";
import { getStyle } from "../style";

export function Login() {
  // Estados
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Hooks
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { login: authLogin } = useAuth();
  
  const style = getStyle(theme);

  // Effects
  useEffect(() => {
    // Verificar se veio mensagem de sucesso do cadastro
    if (route.params?.message) {
      setSuccessMessage(route.params.message);
    }
  }, [route.params]);

  // Handlers
  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar erros ao digitar
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError('Preencha todos os campos');
      return false;
    }

    if (!form.email.includes('@')) {
      setError('E-mail inválido');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      console.log('Fazendo login com:', { email: form.email });
      
      const result = await authService.login(form.email, form.password);
      console.log('Login bem-sucedido:', result);
      
      await authLogin(result.token);
      // Navegação automática pelo StackRoutes
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    // TODO: Implementar recuperação de senha
    console.log('Recuperação de senha');
  };

  // Render
  return (
    <View style={style.container}>
      <Text style={style.title}>Gestão Fácil</Text>
      
      <View style={style.form}>
        <Text style={style.label}>Entrar</Text>
        
        <Input
          onChangeText={(value) => handleInputChange('email', value)}
          value={form.email}
          placeholder="E-mail"
          color={theme.text}
          placeHolderColor={theme.text}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        
        <View style={style.passwordInput}>
          <Input
            onChangeText={(value) => handleInputChange('password', value)}
            value={form.password}
            placeholder="Senha"
            color={theme.text}
            placeHolderColor={theme.text}
            secureTextEntry={hidePassword}
            setHidePassword={setHidePassword}
            hidePassword={hidePassword}
            autoComplete="password"
          />
        </View>

        {/* Mensagens de feedback */}
        {error ? (
          <Text style={style.error}>{error}</Text>
        ) : null}
        
        {successMessage ? (
          <Text style={style.success}>{successMessage}</Text>
        ) : null}

        {/* Botão principal */}
        <Button
          btnText={loading ? "Entrando..." : "Entrar"}
          style={style.btnLogin}
          textStyle={style.btnLoginText}
          onPress={handleLogin}
          disabled={loading}
        />
        
        {/* Botões secundários */}
        <Button 
          btnText="Esqueci minha senha" 
          textStyle={style.btnExtra}
          onPress={handleForgotPassword}
        />
        
        <Button
          onPress={handleNavigateToSignUp}
          btnText="Criar nova conta"
          textStyle={style.btnExtra}
        />
      </View>
    </View>
  );
}