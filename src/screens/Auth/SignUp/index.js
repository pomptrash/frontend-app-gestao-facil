import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { use, useState } from "react";
import { useTheme } from "../../../theme/ThemeContext";
import { getStyle } from "../style";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

export function SignUp() {
  const [name, setName] = useState()
  const [email, setEmail] = useState();
  const [position, setPosition] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false)

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
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity>
              <Feather name={showPassword? "eye-off": "eye"} color={theme.text} size={16} onPress={()=> {setShowPassword(!showPassword)}}/>
            </TouchableOpacity>
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
