import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { getStyle } from "../style";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [hidePassowrd, setHidePassowrd] = useState(true);

  const { theme } = useTheme(); // uso do themeContext (darkMode)
  const style = getStyle(theme); // estilo global do themeContext (darkMode)

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[style.container]}>
        <Text style={style.title}>Gestão Fácil</Text>
        <View style={style.form}>
          <Text style={style.label}>Criar nova conta</Text>
          <Input
            onChangeText={setName}
            value={name}
            placeholder={"Nome"}
            color={theme.text}
            placeHolderColor={theme.text}
          />

          <Input
            onChangeText={setEmail}
            value={email}
            placeholder={"E-mail"}
            color={theme.text}
            placeHolderColor={theme.text}
            type="email-address"
          />

          <Input
            onChangeText={setPosition}
            value={position}
            placeholder={"Cargo"}
            color={theme.text}
            placeHolderColor={theme.text}
          />

          <Input
            onChangeText={setPhone}
            value={phone}
            placeholder={"Telefone"}
            color={theme.text}
            placeHolderColor={theme.text}
            type="numeric"
          />
          <View style={style.passwordInput}>
            <Input
              onChangeText={setPassword}
              value={password}
              placeholder={"Senha"}
              color={theme.text}
              placeHolderColor={theme.text}
              type="password"
              SetSecureTextEntry={true}
              secureTextEntry={hidePassowrd}
              setHidePassowrd={setHidePassowrd}
              hidePassowrd={hidePassowrd}
            />
          </View>

          <Button
            btnText={"Cadastrar"}
            style={style.btnLogin}
            textStyle={style.btnLoginText}
          />
          <Button
            onPress={() => navigation.navigate("Login")}
            btnText={"Já possui conta? Faça login"}
            textStyle={style.btnExtra}
          />
        </View>
        <Text></Text>
      </View>
    </KeyboardAvoidingView>
  );
}
