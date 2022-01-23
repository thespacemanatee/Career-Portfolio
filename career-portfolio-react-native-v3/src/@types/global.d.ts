import type { TSSTheme } from "../theme";

declare module "@react-navigation/native" {
  export type DefaultTheme = typeof TSSTheme;
  export function useTheme(): DefaultTheme;
}
