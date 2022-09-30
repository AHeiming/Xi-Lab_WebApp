import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import ApiService from "../../../api/api";
import { useDevices } from "../../../contexts/DeviceContext";

export interface IDeleteDeviceDialogProps {
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

const DeleteDeviceDialog = (props: IDeleteDeviceDialogProps) => {
  const { refreshDevices } = useDevices();
  const [uuid, setUuid] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleDelete = async () => {
    let { success, error } = await ApiService.deleteDevice(uuid);
    if (!success) {
      setShowError(true);
      setErrorText(error);
    } else {
      setShowError(false);
      refreshDevices();
      props.onClose();
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
    >
      <DialogTitle>{"Delete device"}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1, width: "100%" }}
          onChange={(e) => setUuid(e.target.value)}
          required
          placeholder="eg. 316c5c8a-ba53-4911-9f61-171d49ec27ac"
          label="Device UUID"
        />
        <Typography display={showError ? "block" : "none"} color="error">
          {errorText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDeviceDialog;
