import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// OBJETO DE CORES PARA A APLICAÇÃO
export const baseLightColors = {
  primary: "#007AFF",
  background: "#F5F5F5",
  text: "#1C1C1C",
  card: "#FFFFFF",
  border: "#D1D1D6",
};

export const baseDarkColors = {
  primary: "#0A84FF",
  background: "#121212",
  text: "#E5E5E5",
  card: "#1E1E1E",
  border: "#38383A",
};

// OBJETO DE CORES PARA OS COMPONENTES DO REACT NATIVE PAPER
export const lightColors = {
  ...MD3LightTheme, // Inclui todas as propriedades default (fonts, roundness, etc.) do react native paper
  colors: {
    ...MD3LightTheme.colors, // Mantém as cores MD3 default, exceto as sobrescritas
    // cores para o datePicker da tela de criação de novo serviço
    primary: baseLightColors.primary,
    surface: baseLightColors.card,
    background: baseLightColors.background,
    onSurface: baseLightColors.text,

    // Mantenha suas propriedades customizadas para o hook useTheme()
    ...baseLightColors,
  },
};

export const darkColors = {
  ...MD3DarkTheme, // Inclui todas as propriedades default
  colors: {
    ...MD3DarkTheme.colors,
    // cores para o datePicker da tela de criação de novo serviço
    primary: baseDarkColors.primary,
    surface: baseDarkColors.card,
    background: baseDarkColors.background,
    onSurface: baseDarkColors.text,

    // Mantenha suas propriedades customizadas
    ...baseDarkColors,
  },
};
