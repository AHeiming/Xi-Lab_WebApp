import {
  Box,
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { Marker } from "./types/types";
import { liquidUnitConverter } from "./unitConverter";

const CustomMarker = () => {
  const theme = useTheme();

  const BatteryLevelBar = styled(LinearProgress)(({ theme }) => ({
    margin: 0,
    padding: 0,
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#5BC236",
    },
  }));

  const WaterLevelBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#5abcd8",
    },
  }));

  const ThemeTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  const example: Marker = {
    device: {
      battery: 75,
      id: "5aa067b0-c21e-4f62-a7fc-aa501380b404",
      name: "HRW FabLab",
    },
    location: {
      latitude: 51.533143,
      longitude: 6.932462,
    },
    water: {
      min: 250,
      max: 5000,
      current: 2500,
    },
  };

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
        <Box mb={3}>
          <ThemeTypography variant="h5">{example.device.name}</ThemeTypography>
        </Box>
        <Box mb={3}>
          <ThemeTypography fontWeight="bold">Battery</ThemeTypography>
          <BatteryLevelBar
            variant="determinate"
            value={example.device.battery}
          ></BatteryLevelBar>
          <ThemeTypography fontStyle="italic">
            Current: {example.device.battery} %
          </ThemeTypography>
        </Box>
        <Box mb={3}>
          <ThemeTypography fontWeight="bold">Location</ThemeTypography>
          <Grid container direction="row">
            <Grid item xs={4}>
              <ThemeTypography>Latitude:</ThemeTypography>
            </Grid>
            <Grid item xs={8}>
              <ThemeTypography>{example.location.latitude}°</ThemeTypography>
            </Grid>
            <Grid item xs={4}>
              <ThemeTypography>Longitude:</ThemeTypography>
            </Grid>
            <Grid item xs={8}>
              <ThemeTypography> {example.location.longitude}°</ThemeTypography>
            </Grid>
          </Grid>
        </Box>
        <ThemeTypography fontWeight="bold">Water</ThemeTypography>
        <WaterLevelBar
          variant="determinate"
          value={currentWaterLevelInPercentage(
            example.water.min,
            example.water.max,
            example.water.current
          )}
        ></WaterLevelBar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <ThemeTypography>
              Min: {liquidUnitConverter(example.water.min)}
            </ThemeTypography>
          </Grid>
          <Grid item>
            <ThemeTypography>
              Max: {liquidUnitConverter(example.water.max)}
            </ThemeTypography>
          </Grid>
        </Grid>
        <ThemeTypography>
          Current: {liquidUnitConverter(example.water.current)}
        </ThemeTypography>
      </Box>
    </ThemeProvider>
  );
};

export default CustomMarker;
