import { useEffect, useState } from "react";
import "./index.css";
import { celebrateAnniversary, isAnniversary } from "./lib/anniversary";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Lineup from "./components/Lineup";
import Timetable from "./components/Timetable";
import Highlights from "./components/Highlights";
import Team from "./components/Team";
import Staff from "./components/Staff";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("ww-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ww-theme", theme);
  }, [theme]);

  useEffect(() => {
    const demoRequested =
      new URLSearchParams(window.location.search).get("anniversary-demo") === "1";
    if (!demoRequested && !isAnniversary()) return;

    const cleanup = celebrateAnniversary({ force: demoRequested });
    return cleanup;
  }, []);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Lineup />
        <Timetable />
        <Highlights />
        <Team />
        <Staff />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
