import React, { createContext, useContext, useMemo } from "react";
import { resources, sounds, theme } from "../settings";

const SettingsContext = createContext(null);

function buildPlayers(soundConfig) {
  const players = {};
  const sharedVolume = soundConfig.shared?.volume ?? 1;

  Object.keys(soundConfig.players || {}).forEach((name) => {
    const cfg = soundConfig.players[name];
    const src = cfg.sound?.src?.[0] ?? null;
    if (!src) return;

    // create Audio instance
    const audio = new Audio(src);
    audio.volume = cfg.sound?.volume ?? sharedVolume;

    players[name] = {
      play: () => {
        try {
          if (cfg.settings?.oneAtATime) {
            // reset and play — ensures only one copy running
            audio.pause();
            audio.currentTime = 0;
          }
          audio.play().catch(() => {
            // browsers can block autoplay until user interaction
          });
        } catch (e) {
          /* ignore */
        }
      },
      _audio: audio,
    };
  });

  return players;
}

export function SettingsProvider({ children }) {
  const players = useMemo(() => buildPlayers(sounds), []);

  const value = useMemo(
    () => ({ resources, sounds, theme, players }),
    [players]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export default SettingsContext;
