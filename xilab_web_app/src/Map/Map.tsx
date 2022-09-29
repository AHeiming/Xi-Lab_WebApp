import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import CustomMarker from "../Popup/CustomMarker";
import { ColorModeContext } from "../contexts/ThemeContext";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/system";
import "./Map.css";
import ApiService from "../api/api";
import { Device } from "../types/types";
import Fab from "@mui/material/Fab";
import FilterDialog from "./FilterDialog";
import { useDevices } from "../contexts/DeviceContext";

const Map = () => {
  const {
    devices,
    filterForEmptyDevices,
    filterForLowBatteryDevice,
    refreshDevices,
  } = useDevices();
  const { mode } = useContext(ColorModeContext);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [mapZoom, setMapZoom] = useState(13);

  const DarkMapContainer = styled(MapContainer)(() => ({
    "& .leaflet-tile": {
      filter: "var(--leaflet-tile-filter, none)",
    },
    "& .leaflet-container": {
      background: "#303030",
    },
  }));

  const ColorModePopup = styled(Popup)(({ theme }) => ({
    "& .leaflet-popup-content-wrapper": {
      backgroundColor: theme.palette.background.default,
    },
    "& .leaflet-popup.tip": {
      backgroundColor: theme.palette.background.default,
    },
  }));

  const geolocation = async () => {
    if (navigator.geolocation) {
      await navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            console.log("Granted!");
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
              setLoaded(true);
            });
          } else if (result.state === "denied") {
            setLat(51.53313851666875);
            setLng(6.932514987553791);
            setLoaded(true);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setLoaded(true);
              },
              (error) => {
                console.log(error);
                setLat(51.53313851666875);
                setLng(6.932514987553791);
                setLoaded(true);
              }
            );
          }
        });
    } else {
      setLat(51.53313851666875);
      setLng(6.932514987553791);
      setLoaded(true);
    }
  };

  const handleDialogClose = () => {
    setOpenFilterDialog(false);
  };

  const handleDialogOpen = () => {
    setOpenFilterDialog(true);
  };

  const handleDialogSave = async (
    filterSelection: "battery" | "water" | "all",
    batteryLevel?: number
  ) => {
    if (filterSelection === "battery" && batteryLevel) {
      filterForLowBatteryDevice(batteryLevel);
    } else if (filterSelection === "water") {
      filterForEmptyDevices();
    } else {
      refreshDevices();
    }
    setOpenFilterDialog(false);
  };

  useEffect(() => {
    geolocation();
  }, []);

  return loaded ? (
    <>
      <Fab
        color="secondary"
        onClick={handleDialogOpen}
        sx={{ right: 20, bottom: 20, position: "fixed" }}
      >
        <FilterListIcon />
      </Fab>
      <FilterDialog
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        open={openFilterDialog}
      />
      {mode === "light" ? (
        <MapContainer center={[lat, lng]} zoom={7} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {devices.map((device) => (
            <Marker
              key={device.deviceData.uuid}
              position={[
                device.locationData.latitude,
                device.locationData.longitude,
              ]}
            >
              <ColorModePopup>
                <CustomMarker device={device} />
              </ColorModePopup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <DarkMapContainer center={[lat, lng]} zoom={7} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {devices.map((device) => (
            <Marker
              key={device.deviceData.uuid}
              position={[
                device.locationData.latitude,
                device.locationData.longitude,
              ]}
            >
              <ColorModePopup>
                <CustomMarker device={device} />
              </ColorModePopup>
            </Marker>
          ))}
        </DarkMapContainer>
      )}
    </>
  ) : (
    <>Loading...</>
  );
};

export default Map;
