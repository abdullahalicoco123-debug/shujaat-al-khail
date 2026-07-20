import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

ReactGA.initialize(MEASUREMENT_ID);

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  return null;
}

export default Analytics;