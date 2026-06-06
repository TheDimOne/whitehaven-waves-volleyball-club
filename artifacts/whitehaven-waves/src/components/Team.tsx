import { useScrollReveal } from "../hooks/useScrollReveal";

const players = [
  { num: "#1", name: "Alex Rivera", pos: "Setter", bio: "Dynamic setter with elite court vision and over 5 years with the Waves.", emoji: "🏐" },
  { num: "#2", name: "Morgan Chen", pos: "Right Side Hitter", bio: "Powerful hitter whose attacks are as relentless as the tide.", emoji: "💪", delay: 1 },
  { num: "#3", name: "Casey Walsh", pos: "Middle Blocker", bio: "A wall at the net — Casey's blocks have turned the tide of many games.", emoji: "🧱", delay: 2 },
  { num: "#4", name: "Riley Storm", pos: "Outside Hitter", bio: "Electric attacker with a serve that rivals a rip-tide.", emoji: "⚡" },
  { num: "#5", name: "Sam Okafor", pos: "Outside Hitter", bio: "Hard-working, consistent, and always the first to hit the sand in defence.", emoji: "🌊", delay: 1 },
  { num: "#6", name: "Jordan Lee", pos: "Libero", bio: "The ultimate defensive anchor — no ball hits the floor on Jordan's watch.", emoji: "🛡️", delay: 2 },
];

export default function Team() {
  const ref = useScrollReveal();

  return (
    <section className="section team" id="team" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <span className="section-label">The Squad</span>
        <h2 className="section-title section-title--center">Meet the Waves</h2>

        <div className="team__grid">
          {players.map((p, i) => (
            <div key={i} className={`player-card reveal${p.delay ? ` reveal--delay-${p.delay}` : ""}`}>
              <div className="player-card__photo">
                <div className="player-card__photo-inner">{p.emoji}</div>
                <span className="player-card__number">{p.num}</span>
              </div>
              <div className="player-card__info">
                <h3 className="player-card__name">{p.name}</h3>
                <span className="player-card__pos">{p.pos}</span>
                <p className="player-card__bio">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
