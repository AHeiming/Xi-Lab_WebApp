import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

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

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setMode(e.matches ? "dark" : "light"));
    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#C43606",
          },
          secondary: {
            main: "#22A3AB",
          },
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
