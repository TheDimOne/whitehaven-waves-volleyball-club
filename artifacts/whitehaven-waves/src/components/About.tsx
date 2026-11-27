import { useScrollReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";
import { getYearsActive } from "../lib/anniversary";

function StatCounter({
  target,
  label,
  displayValue,
}: {
  target: number;
  label: string;
  displayValue?: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="stat">
      <span className="stat__number" ref={ref}>{displayValue ?? value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}

const galleryItems = [
  { emoji: "🏐", caption: "Match Day" },
  { emoji: "💪", caption: "Training Session" },
  { emoji: "🏆", caption: "Championship Run" },
  { emoji: "🤝", caption: "Team Spirit" },
  { emoji: "🎉", caption: "Victory Celebration" },
  { emoji: "🏐", caption: "Match Day" },
  { emoji: "💪", caption: "Training Session" },
  { emoji: "🏆", caption: "Championship Run" },
  { emoji: "🤝", caption: "Team Spirit" },
  { emoji: "🎉", caption: "Victory Celebration" },
];

const galleryColors = [
  "linear-gradient(135deg,#0f3876,#0d407e)",
  "linear-gradient(135deg,#0e6fb5,#0f3876)",
  "linear-gradient(135deg,#0d407e,#0f3876)",
  "linear-gradient(135deg,#0e7cc3,#0e6fb5)",
  "linear-gradient(135deg,#0f3876,#0e6fb5)",
];

export default function About() {
  const ref = useScrollReveal();
  const yearsActive = getYearsActive();

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <div className="about__grid">
          <div className="about__text reveal">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Volleyball is our<br />heartbeat</h2>
            <p className="about__body">Founded in the coastal town of Whitehaven, the Waves are more than a volleyball team — we're a family forged by the tides. From early days to aged waves, our players bring the relentless energy of the ocean to every set, spike, and serve.</p>
            <p className="about__body">We believe in building athletes who are fearless on the court and grounded off it. Training hard, playing harder, and always showing up for each other — that's the Waves way.</p>
            <div className="about__stats">
              <StatCounter key={yearsActive} target={yearsActive} label="Years Active" />
              <StatCounter target={0} displayValue="∞" label="Memories Made" />
            </div>
          </div>

          <div className="about__gallery reveal reveal--right">
            <div className="gallery-scroll">
              <div className="gallery-scroll__track">
                {galleryItems.map((item, i) => (
                  <div
                    key={i}
                    className="gallery-card"
                    style={{ background: galleryColors[i % galleryColors.length] }}
                  >
                    <div className="gallery-card__inner">{item.emoji}</div>
                    <span className="gallery-card__caption">{item.caption}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
