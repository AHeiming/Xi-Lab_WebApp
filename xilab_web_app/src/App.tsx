import "./App.css";
import Map from "./Map/Map";
import { ColorModeProvider } from "./contexts/ThemeContext";
import Header from "./Header/Header";

function App() {
  return (
    <ColorModeProvider>
      <Header />
      <Map />
    </ColorModeProvider>
  );
}

export default App;
