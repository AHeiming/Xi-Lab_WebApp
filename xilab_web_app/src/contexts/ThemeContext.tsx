import { createTheme, Theme, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export interface ColorModeContextType {
  mode: "light" | "dark";
  toggleColorMode(): void;
}

interface ColorModeProps {
  children: React.ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  function toggleColorMode() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        toggleColorMode,
      }}
    >
      <ThemeProvider theme={muiTheme}> {children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => useContext(ColorModeContext);