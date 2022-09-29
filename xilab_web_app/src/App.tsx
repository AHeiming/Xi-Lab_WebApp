import "./App.css";
import Map from "./Map/Map";
import { ColorModeProvider } from "./contexts/ThemeContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import Header from "./Header/Header";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <ColorModeProvider>
      <UserProvider>
        <DeviceProvider>
          <Header />
          <Map />
        </DeviceProvider>
      </UserProvider>
    </ColorModeProvider>
  );
}

export default App;
