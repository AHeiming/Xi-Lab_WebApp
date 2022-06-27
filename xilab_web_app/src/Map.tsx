import {
  Box,
  CssBaseline,
  FormControlLabel,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import CustomMarker from "./CustomMarker";
import { ColorModeContext } from "./contexts/ThemeContext";
import { styled } from "@mui/system";
import "./Map.css";

const Map = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const DarkMap = styled(MapContainer)(({ theme }) => ({
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

  const Test = styled(Box)(({ theme }) => ({
    height: 500,
    width: 500,
    backgroundColor: theme.palette.background.default,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10000,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    toggleColorMode();
  };

  const geolocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setLoaded(true);
          });
        } else if (result.state === "denied") {
          setLat(51.533143);
          setLng(6.932462);
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
              setLat(51.533143);
              setLng(6.932462);
              setLoaded(true);
            }
          );
        }
      });
    } else {
      setLat(51.533143);
      setLng(6.932462);
      setLoaded(true);
    }
  };

  useEffect(() => {
    geolocation();
  }, []);

  return loaded ? (
    <>
      <Box className="overlay">
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label={
            <Typography color={theme.palette.text.primary}>
              Change color mode
            </Typography>
          }
        />
      </Box>
      {mode === "light" ? (
        <MapContainer
          className=".leaflet-tile .leaflet-container"
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <ColorModePopup>
              <CustomMarker />
            </ColorModePopup>
          </Marker>
        </MapContainer>
      ) : (
        <DarkMap
          className=".leaflet-tile .leaflet-container"
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <ColorModePopup>
              <CustomMarker />
            </ColorModePopup>
          </Marker>
        </DarkMap>
      )}
      <DarkMap
        className=".leaflet-tile .leaflet-container"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <ColorModePopup>
            <CustomMarker />
          </ColorModePopup>
        </Marker>
      </DarkMap>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
