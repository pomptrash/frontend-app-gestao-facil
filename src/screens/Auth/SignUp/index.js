import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { getStyle } from "../style";
import { useNavigation } from "@react-navigation/native";
import { useState, useCallback } from "react";
import authService from "../../../service/authService";

export function SignUp() {
  // Estados
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: ''
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hooks
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = getStyle(theme);

  // Handlers
  const handleInputChange = useCallback((field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar erro ao digitar
    if (error) setError('');
  }, [error]);

  const validateForm = useCallback(() => {
    const { nome, email, password, confirmPassword } = form;

    if (!nome || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos obrigatórios (*)');
      return false;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido');
      return false;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  }, [form]);

  const handleSignUp = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Enviando dados para cadastro:', form);
      
      const result = await authService.register(form);
      console.log('Cadastro bem-sucedido:', result);
      
      // Redirecionar para login com mensagem de sucesso
      navigation.navigate('Login', { 
        message: 'Cadastro realizado com sucesso! Faça login para continuar.' 
      });
    } catch (err) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  // Campos do formulário para renderização dinâmica
  const formFields = [
    {
      field: 'nome',
      placeholder: 'Nome *',
      props: {
        autoCapitalize: 'words',
        autoComplete: 'name'
      }
    },
    {
      field: 'cargo',
      placeholder: 'Cargo',
      props: {
        autoCapitalize: 'words',
        autoComplete: 'organization-title'
      }
    },
    {
      field: 'email',
      placeholder: 'E-mail *',
      props: {
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        autoComplete: 'email'
      }
    },
    {
      field: 'telefone',
      placeholder: 'Telefone',
      props: {
        keyboardType: 'phone-pad',
        autoComplete: 'tel'
      }
    }
  ];

  const passwordFields = [
    {
      field: 'password',
      placeholder: 'Senha *',
      hideState: hidePassword,
      setHideState: setHidePassword
    },
    {
      field: 'confirmPassword',
      placeholder: 'Confirmar Senha *',
      hideState: hideConfirmPassword,
      setHideState: setHideConfirmPassword
    }
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={style.container}>
          <Text style={style.title}>Gestão Fácil</Text>
          
          <View style={style.form}>
            <Text style={style.label}>Criar nova conta</Text>
            
            {/* Campos principais */}
            {formFields.map(({ field, placeholder, props }) => (
              <Input
                key={field}
                onChangeText={(value) => handleInputChange(field, value)}
                value={form[field]}
                placeholder={placeholder}
                color={theme.text}
                placeHolderColor={theme.text}
                {...props}
              />
            ))}

            {/* Campos de senha */}
            {passwordFields.map(({ field, placeholder, hideState, setHideState }) => (
              <View key={field} style={style.passwordInput}>
                <Input
                  onChangeText={(value) => handleInputChange(field, value)}
                  value={form[field]}
                  placeholder={placeholder}
                  color={theme.text}
                  placeHolderColor={theme.text}
                  secureTextEntry={hideState}
                  setHidePassword={setHideState}
                  hidePassword={hideState}
                  autoComplete={field === 'password' ? 'password-new' : 'password'}
                />
              </View>
            ))}

            {/* Mensagem de erro */}
            {error ? (
              <Text style={style.error}>{error}</Text>
            ) : null}

            {/* Botão de cadastro */}
            <Button
              btnText={loading ? "Cadastrando..." : "Cadastrar"}
              style={style.btnLogin}
              textStyle={style.btnLoginText}
              onPress={handleSignUp}
              disabled={loading}
            />

            {/* Link para login */}
            <Button
              onPress={handleNavigateToLogin}
              btnText="Já possui conta? Faça login"
              textStyle={style.btnExtra}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}