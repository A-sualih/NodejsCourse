import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();

    // The API should return an array of planets, but some situations (wrong URL,
    // proxy HTML responses, or wrapped payloads) can return something else.
    // Normalize to an array so components using usePlanets can always safely map.
    if (Array.isArray(fetchedPlanets)) {
      savePlanets(fetchedPlanets);
      return;
    }

    // Support wrapped payloads like { planets: [...] }
    if (fetchedPlanets && Array.isArray(fetchedPlanets.planets)) {
      savePlanets(fetchedPlanets.planets);
      return;
    }

    // As a last resort, if it's an object with keys, convert values into a list
    if (fetchedPlanets && typeof fetchedPlanets === 'object') {
      const maybeArray = Object.values(fetchedPlanets).flat().filter(Boolean);
      if (Array.isArray(maybeArray) && maybeArray.length) {
        savePlanets(maybeArray);
        return;
      }
    }

    // If nothing looks right, fallback to an empty array and warn in console.
    console.warn('usePlanets: unexpected payload from API -', fetchedPlanets);
    savePlanets([]);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
