import { useEffect, useRef } from "react";

const tickerItems = [
  "📱 Follow our socials",
  "✉️ Contact to Register",
  "🌊 Stay Wavy",
  "🏐 All ability levels welcome",
  "📅 Wednesday 19:30 - 21:30",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "absolute", inset: "0",
      overflow: "hidden", pointerEvents: "none", zIndex: "1",
    });
    hero.appendChild(container);

    const style = document.createElement("style");
    style.id = "bubble-kf";
    style.textContent = `
      @keyframes bubbleRise {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        10%  { opacity: 0.6; }
        90%  { opacity: 0.3; }
        100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
      }
    `;
    if (!document.getElementById("bubble-kf")) document.head.appendChild(style);

    for (let i = 0; i < 22; i++) {
      const b = document.createElement("div");
      const size = Math.random() * 6 + 2;
      Object.assign(b.style, {
        position: "absolute", bottom: "-20px",
        left: `${Math.random() * 100}%`,
        width: `${size}px`, height: `${size}px`,
        borderRadius: "50%",
        background: "rgba(23,141,212,0.3)",
        border: "1px solid rgba(23,141,212,0.5)",
        animation: `bubbleRise ${Math.random() * 6 + 6}s ease-in ${Math.random() * 8}s infinite`,
        pointerEvents: "none",
      });
      container.appendChild(b);
    }

    return () => { container.remove(); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__waves">
        <div className="wave wave--1" />
        <div className="wave wave--2" />
        <div className="wave wave--3" />
      </div>

      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">EST. 2023</p>
        <h1 className="hero__title">
          <span className="hero__title-line">Whitehaven</span>
          <span className="hero__title-wave">Waves</span>
        </h1>
        <p className="hero__tagline">Ride the wave. Spike the game.</p>
        <div className="hero__cta-group">
          <button className="btn btn--primary" onClick={() => scrollTo("staff")}>Meet the Staff</button>
          <button className="btn btn--ghost" onClick={() => scrollTo("highlights")}>Watch Highlights</button>
        </div>
      </div>

      <div className="hero__ticker">
        <div className="ticker__track">
          {[0, 1].map((group) => (
            <div className="ticker__group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
              {tickerItems.map((item, i) => (
                <span key={i} className="ticker__item">{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
