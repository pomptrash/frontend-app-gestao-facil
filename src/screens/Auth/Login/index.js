import { View, Text } from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { getStyle } from "../style";
import { useNavigation } from "@react-navigation/native";
import { login } from "../../../service/authService";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const style = getStyle(theme);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      console.log('Login bem-sucedido:', user);
      navigation.replace('Home'); // Usar replace para evitar voltar para login
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Gestão Fácil</Text>
      <View style={style.form}>
        <Text style={style.label}>Entrar</Text>
        
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder={"E-mail"}
          color={theme.text}
          placeHolderColor={theme.text}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <View style={style.passwordInput}>
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder={"Senha"}
            color={theme.text}
            placeHolderColor={theme.text}
            secureTextEntry={hidePassword}
            setHidePassword={setHidePassword}
            hidePassword={hidePassword}
          />
        </View>

        {error ? <Text style={style.error}>{error}</Text> : null}

        <Button
          btnText={loading ? "Entrando..." : "Entrar"}
          style={style.btnLogin}
          textStyle={style.btnLoginText}
          onPress={handleLogin}
          disabled={loading}
        />
        
        <Button 
          btnText={"Esqueci minha senha"} 
          textStyle={style.btnExtra} 
        />
        
        <Button
          onPress={() => navigation.navigate("SignUp")}
          btnText={"Criar nova conta"}
          textStyle={style.btnExtra}
        />
      </View>
    </View>
  );
}