import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import logo from "../../assets/HRW_Logo_cyan.svg";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../contexts/ThemeContext";
import CreateDeviceDialog from "./dialogs/CreateDeviceDialog";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUser } from "../../contexts/UserContext";
import DeleteDeviceDialog from "./dialogs/DeleteDeviceDialog";
import LoginDialog from "./dialogs/LogInDialog";

const Header = () => {
  const theme = useTheme();
  const { signedIn, logout } = useUser();
  const { toggleColorMode } = useContext(ColorModeContext);
  const [profileMenuAnchorEl, setprofileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const profileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setprofileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setprofileMenuAnchorEl(null);
  };

  const handleLoginClick = () => {
    setprofileMenuAnchorEl(null);
    setOpenLoginDialog(true);
  };

  const handleLogoutClick = () => {
    logout();
    setprofileMenuAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOpenCreateDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img width={200} height={75} src={logo} alt="Hrw_Logo"></img>
          <Box sx={{ flex: 1 }}>
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
          </Box>
          <Box
            mr="1em"
            ml="1em"
            columnGap="1em"
            display={localStorage.getItem("token") ? "flex" : "none"}
          >
            <Button
              onClick={handleDialogOpen}
              variant="contained"
              color="secondary"
            >
              Create device
            </Button>
            <Button
              onClick={() => setOpenDeleteDialog(true)}
              variant="contained"
              color="secondary"
            >
              Delete device
            </Button>
            <CreateDeviceDialog
              open={openCreateDialog}
              onClose={handleDialogClose}
            />
            <DeleteDeviceDialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            />
          </Box>
          <IconButton onClick={handleProfileMenuClick}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
          >
            {signedIn ? (
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
            )}
          </Menu>
          <LoginDialog
            open={openLoginDialog}
            onClose={() => setOpenLoginDialog(false)}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
