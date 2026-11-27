import { useEffect, useState } from "react";
import "./index.css";
import { celebrateAnniversary, isAnniversary } from "./lib/anniversary";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Timetable from "./components/Timetable";
import Highlights from "./components/Highlights";
import Staff from "./components/Staff";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ScrollVolleyball from "./components/ScrollVolleyball";
import CustomCursor from "./components/CustomCursor";
import HideoutWelcome from "./components/HideoutWelcome";

export default function App() {
  const [customCursorEnabled, setCustomCursorEnabled] = useState(() => localStorage.getItem("ww-custom-cursor") !== "off");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("ww-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  useEffect(() => {
    localStorage.setItem("ww-custom-cursor", customCursorEnabled ? "on" : "off");
  }, [customCursorEnabled]);
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", `/home${window.location.search}${window.location.hash}`);
    }
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ww-theme", theme);
  }, [theme]);
  useEffect(() => {
    const demoRequested = new URLSearchParams(window.location.search).get("anniversary-demo") === "1";
    if (!demoRequested && !isAnniversary()) return;
    return celebrateAnniversary({ force: demoRequested });
  }, []);
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  return <><HideoutWelcome /><Nav theme={theme} toggleTheme={toggleTheme} customCursorEnabled={customCursorEnabled} toggleCustomCursor={() => setCustomCursorEnabled(enabled => !enabled)} /><main><Hero /><About /><Timetable /><Highlights /><Staff /><Contact /></main><Footer /><BackToTop /><ScrollVolleyball /><CustomCursor enabled={customCursorEnabled} /></>;
}
