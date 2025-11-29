import { useMemo } from "react";
import { useSettings } from "../contexts/SettingsContext";
import Clickable from "../components/Clickable";

const Launch = props => {
  const selectorBody = useMemo(() => {
    const list = Array.isArray(props.planets) ? props.planets : [];
    if (list.length === 0) {
      return <option disabled>No planets available</option>;
    }

    return list.map(planet => (
      <option value={planet.kepler_name} key={planet.kepler_name}>{planet.kepler_name}</option>
    ));
  }, [props.planets]);

  const today = new Date().toISOString().split("T")[0];

  const { players } = useSettings();

  const handleSubmit = (e) => {
    // trigger deploy sound first (if available) then let submit handler run
    players?.deploy?.play?.();
    props.submitLaunch(e);
  };

  const onTyping = () => {
    players?.typing?.play?.();
  };

  return (
    <section id="launch">
      <p>Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.</p>
      <p>Only confirmed planets matching the following criteria are available for the earliest scheduled missions:</p>
    <ul>
      <li>Planetary radius &lt; 1.6 times Earth's radius</li>
      <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
    </ul>

    <form onSubmit={handleSubmit} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>
      <label htmlFor="launch-day">Launch Date</label>
      <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} />
      <label htmlFor="mission-name">Mission Name</label>
      <input type="text" id="mission-name" name="mission-name" onKeyDown={onTyping} />
      <label htmlFor="rocket-name">Rocket Type</label>
      <input type="text" id="rocket-name" name="rocket-name" defaultValue="Explorer IS1" onKeyDown={onTyping} />
      <label htmlFor="planets-selector">Destination Exoplanet</label>
      <select id="planets-selector" name="planets-selector">
        {selectorBody}
      </select>
      <Clickable>
        <button type="submit" disabled={props.isPendingLaunch} style={{ padding: '8px 10px' }}>
          Launch Mission ✔
        </button>
      </Clickable>
      {props.isPendingLaunch && <span>Loading…</span>}
    </form>
  </section>
  );
};

export default Launch;