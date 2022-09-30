import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IFilterDialogProps {
  open: boolean;
  onClose(): void;
  onSave(
    filterSelection: "battery" | "water" | "all",
    batteryLevel?: number
  ): void;
}

const FilterDialog = (props: IFilterDialogProps) => {
  const [textBoxVisible, setTextBoxVisible] = React.useState(false);
  const [filterType, setFilterType] = React.useState<
    "battery" | "water" | "all"
  >("all");
  const [batteryLevelFilter, setBatteryLevelFilter] = React.useState(0);
  const [inputHasError, setInputHasError] = React.useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleSave = () => {
    props.onSave(filterType, batteryLevelFilter);
  };

  const handleBatteryLevelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBatteryLevelFilter(event.target.value as unknown as number);
    let valAsNumber = +event.target.value;
    if (valAsNumber > 100 || valAsNumber < 0) {
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "battery") {
      setFilterType("battery");
      setTextBoxVisible(true);
    } else if (event.target.value === "water") {
      setFilterType("water");
      setTextBoxVisible(false);
    } else {
      setFilterType("all");
      setTextBoxVisible(false);
    }
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Filter devices"}</DialogTitle>
      <DialogContent>
        <RadioGroup
          color="secondary"
          value={filterType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio color="secondary" />}
            label="All devices"
          />
          <FormControlLabel
            value="water"
            control={<Radio color="secondary" />}
            label="Devices with critical water capacity"
          />
          <FormControlLabel
            value="battery"
            control={<Radio color="secondary" />}
            label="Devices below battery level"
          />
        </RadioGroup>
        {textBoxVisible ? (
          <TextField
            color="secondary"
            sx={{ width: "100%" }}
            error={inputHasError}
            helperText={inputHasError ? "Invalid number" : ""}
            value={batteryLevelFilter}
            onChange={handleBatteryLevelFilterChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: {
                min: 0,
                max: 100,
              },
            }}
            type="number"
            label="Battery level"
          ></TextField>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={inputHasError}
          variant="contained"
          color="secondary"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
