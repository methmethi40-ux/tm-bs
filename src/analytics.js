import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

function App() {
  const location = useLocation();

  // Initialize GA only once
  useEffect(() => {
    ReactGA.initialize("G-TQPWB9SK39");
  }, []);

  // Track page views on route change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div>
      <h1>Welcome to TM-BS!</h1>
      {/* Your other JSX code goes here */}
    </div>
  );
}

export default App;
