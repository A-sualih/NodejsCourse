import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Animator } from "@arwes/animation";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";
import { useSettings } from "../contexts/SettingsContext";

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

  // use settings players for sounds
  const { players } = useSettings();
  const onSuccessSound = () => players?.success?.play?.();
  const onAbortSound = () => players?.abort?.play?.();
  const onFailureSound = () => players?.warning?.play?.();

  const { launches, isPendingLaunch, submitLaunch, abortLaunch } =
    useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const planets = usePlanets();

  const { resources, theme } = useSettings();

  // choose the most appropriate background image based on responsive breakpoints
  const [bgSrc, setBgSrc] = useState(
    resources?.background?.medium || resources?.background?.large || resources?.background?.small || resources?.pattern || '/favicon.png'
  );

  useEffect(() => {
    const choose = () => {
      const width = window.innerWidth || 1024;
      const breakpoints = theme?.responsive || { small: 600, medium: 800, large: 1200 };

      if (width >= breakpoints.large && resources?.background?.large) {
        return resources.background.large;
      }
      if (width >= breakpoints.medium && resources?.background?.medium) {
        return resources.background.medium;
      }
      if (resources?.background?.small) {
        return resources.background.small;
      }
      if (resources?.background?.medium) return resources.background.medium;
      if (resources?.background?.large) return resources.background.large;
      return resources?.pattern || '/favicon.png';
    };

    setBgSrc(choose());
    const handler = () => setBgSrc(choose());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [resources, theme]);

  const outerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${bgSrc})`,
    /* ensure the image width fills the container and keeps aspect ratio */
  
    backgroundPosition: 'center',
    backgroundSize:"cover"
  };

  return (
    <div style={outerStyle}>
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
