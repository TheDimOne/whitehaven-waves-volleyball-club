import { useEffect, useState } from "react";
import clubLogo from "../assets/whitehaven-waves-logo.jpg";

const SEEN_KEY = "ww-hideout-welcome-seen";

export default function HideoutWelcome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(SEEN_KEY) === "yes") return;
    window.localStorage.setItem(SEEN_KEY, "yes");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="hideout-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <section className="hideout-card" role="dialog" aria-modal="true" aria-labelledby="hideout-title">
        <button className="hideout-close" type="button" onClick={() => setOpen(false)} aria-label="Close welcome pop-up">×</button>
        <div className="hideout-logo-frame">
          <span className="hideout-wave hideout-wave--one" aria-hidden="true" />
          <span className="hideout-wave hideout-wave--two" aria-hidden="true" />
          <img src={clubLogo} alt="Whitehaven Waves Volleyball Club" />
        </div>
        <div className="hideout-copy">
          <span className="hideout-eyebrow">A little corner of the coast</span>
          <h2 id="hideout-title">You've found the Waves Hideout!</h2>
          <p>Welcome to Whitehaven Waves. Feel free to stay as long as you like, explore the site and find out more about the club. Don't forget to check out our socials and come and join us!</p>
          <div className="hideout-actions">
            <a href="https://www.instagram.com/whitehavenwaves/" target="_blank" rel="noreferrer">Find us on Instagram</a>
            <a href="#contact" onClick={() => setOpen(false)}>Get involved</a>
          </div>
        </div>
        <img className="hideout-gif" src="/hideout.gif" alt="Whitehaven Waves Hideout animation" />
      </section>
    </div>
  );
}
