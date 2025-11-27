// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatorGeneralProvider } from "@arwes/animation";
import AppLayout from "./pages/AppLayout";

export default function App() {
  return (
    <AnimatorGeneralProvider>
      <Router>
        <AppLayout />
      </Router>
    </AnimatorGeneralProvider>
  );
}
