import "./App.css";
import Map from "./Map";
import { ColorModeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ColorModeProvider>
      <Map />
    </ColorModeProvider>
  );
}

export default App;
