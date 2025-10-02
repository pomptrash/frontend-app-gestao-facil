import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { style } from "./style";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/theme/ThemeContext";

export function Input({
  secureTextEntry,
  value,
  type,
  setLabel = false,
  label,
  onChangeText,
  placeholder,
  placeHolderColor,
  color,
  SetSecureTextEntry,
  setHidePassowrd,
  hidePassowrd,
}) {
  const { theme } = useTheme();
  console.log(SetSecureTextEntry)
  return (
    <View style={{flexDirection:"row", alignItems:'center'}}>
      {setLabel && <Text style={{ color: color }}>{label}</Text>}
      <TextInput
        value={value}
        keyboardType={type}
        style={style.input}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColor}
        color={color}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {SetSecureTextEntry && (
        <TouchableOpacity style={{position:'absolute', right: 15}}>
          <Feather
            name={hidePassowrd ? "eye" : "eye-off"}
            color={theme.text}
            size={16}
            onPress={() => {
              setHidePassowrd(!hidePassowrd);
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
