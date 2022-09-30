import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  styled,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditDeviceDialog from "./EditDeviceDialog";
import { useState } from "react";
import { useColorModeContext } from "../../contexts/ThemeContext";
import { Device } from "../../types/types";
import { liquidUnitConverter } from "../../utils/unitConverter";
import { useUser } from "../../contexts/UserContext";

export interface ICustomMarker {
  device: Device;
}

const DeviceMarker = (props: ICustomMarker) => {
  const theme = useTheme();
  const { signedIn } = useUser();
  const { mode } = useColorModeContext();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEditDialogOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const BatteryLevelBar = styled(LinearProgress)(({ theme }) => ({
    margin: 0,
    padding: 0,
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: mode === "light" ? "#5BC236" : "#5BC236",
    },
  }));

  const WaterLevelBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: mode === "light" ? "#5abcd8" : "#308fe8",
    },
  }));

  const ThemeTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  const currentWaterLevelInPercentage = (
    min: number,
    max: number,
    current: number
  ) => {
    return ((current - min) * 100) / (max - min);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 300 }}>
        <Box
          mb={2}
          columnGap="1em"
          display="flex"
          alignItems="center"
          justifyContent="start"
        >
          <ThemeTypography display="inline" variant="h5">
            {props.device.deviceData.name}
          </ThemeTypography>
          {signedIn ? (
            <IconButton onClick={handleEditDialogOpen}>
              <EditIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
        {localStorage.getItem("token") ? (
          <Box mb={3}>
            <ThemeTypography fontWeight="bold">UUID</ThemeTypography>
            <ThemeTypography fontSize={"1.2em"}>
              {props.device.deviceData.uuid}
            </ThemeTypography>
          </Box>
        ) : (
          <></>
        )}
        <Box mb={3}>
          <ThemeTypography fontWeight="bold">Battery</ThemeTypography>
          <BatteryLevelBar
            variant="determinate"
            value={props.device.deviceData.battery}
          ></BatteryLevelBar>
          <ThemeTypography fontStyle="italic">
            Current: {props.device.deviceData.battery} %
          </ThemeTypography>
        </Box>
        <Box mb={3}>
          <ThemeTypography fontWeight="bold">Location</ThemeTypography>
          <Grid container direction="row">
            <Grid item xs={4}>
              <ThemeTypography>Latitude:</ThemeTypography>
            </Grid>
            <Grid item xs={8}>
              <ThemeTypography>
                {props.device.locationData.latitude}°
              </ThemeTypography>
            </Grid>
            <Grid item xs={4}>
              <ThemeTypography>Longitude:</ThemeTypography>
            </Grid>
            <Grid item xs={8}>
              <ThemeTypography>
                {props.device.locationData.longitude}°
              </ThemeTypography>
            </Grid>
          </Grid>
        </Box>
        <ThemeTypography fontWeight="bold">Water</ThemeTypography>
        <WaterLevelBar
          variant="determinate"
          value={currentWaterLevelInPercentage(
            props.device.waterSensorData.min,
            props.device.waterSensorData.max,
            props.device.waterSensorData.current
          )}
        ></WaterLevelBar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <ThemeTypography>
              Min: {liquidUnitConverter(props.device.waterSensorData.min)}
            </ThemeTypography>
          </Grid>
          <Grid item>
            <ThemeTypography>
              Max: {liquidUnitConverter(props.device.waterSensorData.max)}
            </ThemeTypography>
          </Grid>
        </Grid>
        <ThemeTypography>
          Current: {liquidUnitConverter(props.device.waterSensorData.current)}
        </ThemeTypography>
      </Box>
      <EditDeviceDialog
        device={props.device}
        open={openEditDialog}
        onClose={handleEditDialogClose}
      />
    </ThemeProvider>
  );
};

export default DeviceMarker;
