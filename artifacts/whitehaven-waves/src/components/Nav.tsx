import { useState, useEffect } from "react";
import clubLogo from "../assets/whitehaven-waves-logo.jpg";

interface NavProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  customCursorEnabled: boolean;
  toggleCustomCursor: () => void;
}

const links = [
  { href: "#about", label: "About" },
  { href: "#timetable", label: "Timetable" },
  { href: "#highlights", label: "Highlights" },
  { href: "#staff", label: "Staff" },
];

export default function Nav({ theme, toggleTheme, customCursorEnabled, toggleCustomCursor }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const scrollY = window.scrollY + 120;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        const top = (section as HTMLElement).offsetTop;
        const bottom = top + (section as HTMLElement).offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          setActiveSection(section.getAttribute("id") || "");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav">
      <div className="nav__brand">
        <a href="/home" className="nav__logo" onClick={e => {
          if (window.location.pathname === "/home" || window.location.pathname === "/home/") {
            handleLinkClick(e, "#home");
          }
        }}>
          <img
            className="nav__logo-image"
            src={clubLogo}
            alt="Whitehaven Waves Volleyball Club crest"
            width={46}
            height={46}
          />
          <span className="nav__team-name">Whitehaven<em>Waves</em></span>
        </a>
      </div>

      <button
        className={`nav__hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="navLinks"
      >
        <span /><span /><span />
      </button>

      <ul className={`nav__links${menuOpen ? " open" : ""}`} id="navLinks">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`nav__link${activeSection === link.href.slice(1) ? " nav__link--active" : ""}`}
              onClick={e => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="nav__link nav__link--cta"
            onClick={e => handleLinkClick(e, "#contact")}
          >
            Contact
          </a>
        </li>
        <li>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode" title="Toggle light/dark mode">
            {theme === "dark" ? "🌊" : "☀️"}
          </button>
        </li>
        <li>
          <button
            className="theme-toggle cursor-toggle"
            onClick={toggleCustomCursor}
            aria-label={customCursorEnabled ? "Turn off custom cursor" : "Turn on custom cursor"}
            aria-pressed={customCursorEnabled}
            title={customCursorEnabled ? "Turn off custom cursor" : "Turn on custom cursor"}
          >
            {customCursorEnabled
              ? <span className="cursor-toggle__mouse" aria-hidden="true">🖱</span>
              : <img className="cursor-toggle__image" src="/cursor.png" alt="" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
