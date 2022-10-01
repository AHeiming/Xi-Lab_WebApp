import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
  Box,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import ApiService from "../../api/api";
import { useDevices } from "../../contexts/DeviceContext";
import { Device } from "../../types/types";

export interface IEditDeviceDialogProps {
  device: Device;
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
  const { refreshDevices } = useDevices();
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [name, setName] = useState(props.device.deviceData.name);
  const [minWaterCapacity, setMinWaterCapacity] = useState(
    props.device.waterSensorData.min
  );
  const [maxWaterCapacity, setMaxWaterCapacity] = useState(
    props.device.waterSensorData.max
  );
  const handleSave = async () => {
    setShowError(false);
    if (inputValid()) {
      const editDevice = {
        ...props.device,
        deviceData: {
          ...props.device.deviceData,
          name: name,
        },
        waterSensorData: {
          ...props.device.waterSensorData,
          min: minWaterCapacity,
          max: maxWaterCapacity,
        },
      };
      let response = await ApiService.editDevice(editDevice);
      if (response.success) {
        setName("");
        setMinWaterCapacity(0);
        setMaxWaterCapacity(0);
        props.onClose();
        refreshDevices();
      } else {
        setShowError(true);
        setErrorText(response.error);
      }
    } else {
      setShowError(true);
      setErrorText("Some input fields contain invalid data");
    }
  };

  const inputValid = () => {
    if (
      !name ||
      minWaterCapacity < 0 ||
      maxWaterCapacity < 0 ||
      minWaterCapacity > maxWaterCapacity
    ) {
      return false;
    }
    return true;
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
      <DialogTitle>{"Edit device"}</DialogTitle>
      <DialogContent>
        <Box
          mt={1}
          rowGap="1em"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            required
          />
          <TextField
            value={minWaterCapacity.toString()}
            onChange={(e) => setMinWaterCapacity(parseInt(e.target.value))}
            type="number"
            label="Min water capacity"
            required
          />
          <TextField
            value={maxWaterCapacity.toString()}
            onChange={(e) => setMaxWaterCapacity(parseInt(e.target.value))}
            type="number"
            label="Max water capacity"
            required
          />
          <Typography display={showError ? "block" : "none"} color="error">
            {errorText}
          </Typography>
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
