import { useSettings } from "../contexts/SettingsContext";

const Clickable = props => {
  const {
    children,
    sounds, // optional local sounds mapping
    onClick,
    ...rest
  } = props;

  // global players from settings context (fallback)
  let players;
  try {
    const ctx = useSettings();
    players = ctx.players;
  } catch (e) {
    players = null;
  }

  const clickWithSound = (e) => {
    // prefer explicit prop, then context players
    if (sounds?.click) {
      try { sounds.click.play(); } catch {}
    } else if (players?.click) {
      players.click.play();
    }
    onClick && onClick(e);
  };

  return (
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

export default Clickable;
