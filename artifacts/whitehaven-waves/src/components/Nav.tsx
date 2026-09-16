import { useState, useEffect } from "react";

interface NavProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const links = [
  { href: "#about", label: "About" },
  { href: "#lineup", label: "Line-Up" },
  { href: "#timetable", label: "Timetable" },
  { href: "#highlights", label: "Highlights" },
  { href: "#staff", label: "Staff" },
];

export default function Nav({ theme, toggleTheme }: NavProps) {
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
        <a href="#home" className="nav__logo" onClick={e => handleLinkClick(e, "#home")}>
          <svg className="nav__logo-icon" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 38 Q20 28 30 38 Q40 48 50 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M10 30 Q20 20 30 30 Q40 40 50 30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <text x="50%" y="22" dominantBaseline="middle" textAnchor="middle" fontFamily="Bebas Neue" fontSize="11" fill="currentColor">WAVES</text>
          </svg>
          <span className="nav__team-name">Whitehaven<em>Waves</em></span>
        </a>
      </div>

      <button
        className={`nav__hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
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
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode">
            {theme === "dark" ? "🌊" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
