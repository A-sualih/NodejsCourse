import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Animator } from "@arwes/animation";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Centered from "../components/Centered";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

export default function AppLayout() {
  const [frameVisible, setFrameVisible] = useState(true);

  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => setFrameVisible(true), 600);
  };

  const onSuccessSound = () => console.log("Success sound"); // replace with v2 sounds
  const onAbortSound = () => console.log("Abort sound");
  const onFailureSound = () => console.log("Warning sound");

  const { launches, isPendingLaunch, submitLaunch, abortLaunch } =
    useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const planets = usePlanets();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header onNav={animateFrame} />

      <Centered style={{ flex: 1, paddingTop: 20, paddingBottom: 10 }}>
        {frameVisible && (
          <Animator>
            <div
              style={{
                padding: "20px",
                visibility: frameVisible ? "visible" : "hidden",
              }}
            >
              <Routes>
                  <Route
                    path="/"
                    element={
                      <Launch
                        entered={frameVisible}
                        planets={planets}
                        submitLaunch={submitLaunch}
                        isPendingLaunch={isPendingLaunch}
                      />
                    }
                  />
                  <Route
                    path="/launch"
                    element={
                      <Launch
                        entered={frameVisible}
                        planets={planets}
                        submitLaunch={submitLaunch}
                        isPendingLaunch={isPendingLaunch}
                      />
                    }
                  />
                  <Route
                    path="/upcoming"
                    element={
                      <Upcoming
                        entered={frameVisible}
                        launches={launches}
                        abortLaunch={abortLaunch}
                      />
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <History entered={frameVisible} launches={launches} />
                    }
                  />
                </Routes>
              </div>
          </Animator>
        )}
      </Centered>

      <Footer />
    </div>
  );
}
