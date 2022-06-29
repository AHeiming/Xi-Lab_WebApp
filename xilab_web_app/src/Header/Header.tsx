import { AppBar, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import { useContext } from "react";
import logo from "../assets/HRW_Logo_cyan.svg";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../contexts/ThemeContext";

const Header = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img width={200} height={75} src={logo}></img>
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => toggleColorMode()}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
