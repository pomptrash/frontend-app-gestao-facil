import { View, Text, TouchableOpacity} from "react-native";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { useTheme } from "../../../theme/ThemeContext";
import { getStyle } from "../style";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword ] = useState(false)

  const { theme } = useTheme(); // uso do themeContext (darkMode)
  const style = getStyle(theme); // estilo global do themeContext (darkMode)

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
          placeHolderColor={theme.text}
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
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              color={theme.text}
              size={16}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          </TouchableOpacity>
        </View>
        <Button
          btnText={"Entrar"}
          style={style.btnLogin}
          textStyle={style.btnLoginText}
          onPress={() => navigation.navigate("Home")}
        />
        <Button btnText={"Esqueci minha senha"} textStyle={style.btnExtra} />
        <Button
          onPress={() => navigation.navigate("SignUp")}
          btnText={"Criar nova conta"}
          textStyle={style.btnExtra}
        />
      </View>
      <Text></Text>
    </View>
  );
}
