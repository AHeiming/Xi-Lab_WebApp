import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  Slide,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export interface IEditDeviceDialogProps {
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

const EditDeviceDialog = (props: IEditDeviceDialogProps) => {
  const handleSave = () => {};

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
    >
      <DialogTitle>{"Edit device"}</DialogTitle>
      <DialogContent>
        <Box
          mt={1}
          rowGap="1em"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <TextField label="Name" required />
          <TextField label="Min Water" required />
          <TextField label="Max Water" required />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDeviceDialog;
