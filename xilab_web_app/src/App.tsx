import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import CustomMarker from "./CustomMarker";

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLoaded(true);
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
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        <Popup>
          <CustomMarker />
        </Popup>
      </Marker>
    </MapContainer>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
