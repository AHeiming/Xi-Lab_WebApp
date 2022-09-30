import "./App.css";
import Map from "./components/Map/Map";
import { ColorModeProvider } from "./contexts/ThemeContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header/Header";

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
