import { DefaultTheme, css } from "styled-components";

// variables
const variable = {};

// mixins
const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

// light theme colors
const lightColors = {
  background_color: "#ffffff",
  main_text_color: "#333333",
  sub_text_color: "#797979",
  primary_color: "#2F9F93",
  secondary_color: "#dadada",
  error_color: "#EB5757",
};

// dark theme colors
const darkColors = {
  background_color: "#1D2328",
  main_text_color: "#ffffff",
  sub_text_color: "#c2c2c2",
  primary_color: "#2F9F93",
  secondary_color: "#373C43",
  error_color: "#EB5757",
};

// export types for styled.d.ts
export type TypeVariable = typeof variable;
export type TypeMixin = typeof mixin;
export type TypeLightColor = typeof lightColors;
export type TypeDarkColor = typeof darkColors;

// create and export theme
const lightTheme: DefaultTheme = {
  colors: lightColors,
  variable,
  mixin,
};

const darkTheme: DefaultTheme = {
  colors: darkColors,
  variable,
  mixin,
};

export { lightTheme, darkTheme };
