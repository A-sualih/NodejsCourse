// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { SettingsProvider } from "./contexts/SettingsContext";
import AppLayout from "./pages/AppLayout";

export default function App() {
  return (
    <SettingsProvider>
      <AnimatorGeneralProvider>
        <Router>
          <AppLayout />
        </Router>
      </AnimatorGeneralProvider>
    </SettingsProvider>
  );
}
