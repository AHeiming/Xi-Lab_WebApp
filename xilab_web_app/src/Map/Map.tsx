import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import CustomMarker from "../Popup/CustomMarker";
import { ColorModeContext } from "../contexts/ThemeContext";
import { styled } from "@mui/system";
import "./Map.css";

const Map = () => {
  const { mode } = useContext(ColorModeContext);
  const [lat, setLat] = useState(51.53313851666875);
  const [lng, setLng] = useState(6.932514987553791);
  const [loaded, setLoaded] = useState(false);
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
              setLoaded(true);
            }
          );
        }
      });
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    geolocation();
  }, []);

  return loaded ? (
    <>
      {mode === "light" ? (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <ColorModePopup>
              <CustomMarker />
            </ColorModePopup>
          </Marker>
        </MapContainer>
      ) : (
        <DarkMapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <ColorModePopup>
              <CustomMarker />
            </ColorModePopup>
          </Marker>
        </DarkMapContainer>
      )}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
