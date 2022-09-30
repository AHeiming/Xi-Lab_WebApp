import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Button,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";

export interface ILoginDialogProps {
  open: boolean;
  onClose(): void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginDialog = (props: ILoginDialogProps) => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    let response = await login(username, password);
    setError(!response.success);
    if (response.success) {
      props.onClose();
    }
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
    >
      <DialogTitle>{"Log In"}</DialogTitle>
      <DialogContent>
        <Box
          mt={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          rowGap="1em"
        >
          <TextField
            sx={{ width: "100%" }}
            onChange={(e) => setUsername(e.target.value)}
            required
            label="Username"
          />
          <TextField
            sx={{ width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            label="Password"
          />
          <Typography display={error ? "block" : "none"} color="error">
            Username or password wrong!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
