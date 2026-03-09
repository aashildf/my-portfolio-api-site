import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroller til toppen av siden ved hvert rutebytte.
// Må ligge inne i <BrowserRouter> for å ha tilgang til useLocation.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
