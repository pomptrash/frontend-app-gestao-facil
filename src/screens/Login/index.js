import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { getStyle } from "./style";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { theme } = useTheme();

  const style = getStyle(theme);

  const navigation = useNavigation();

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
        />
        <Input
          onChangeText={setPassword}
          value={password}
          placeholder={"Senha"}
          color={theme.text}
        />
        <Button
          btnText={"Entrar"}
          style={style.btnLogin}
          textStyle={style.btnLoginText}
          onPress={() => navigation.navigate("Home")}
        />
        <Button btnText={"Esqueci minha senha"} textStyle={style.btnForgotPW} />
      </View>
      <Text></Text>
    </View>
  );
}
