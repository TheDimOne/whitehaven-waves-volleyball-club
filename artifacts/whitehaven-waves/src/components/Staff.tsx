import { useScrollReveal } from "../hooks/useScrollReveal";

const staff = [
  { name: "Paul Baldueza", role: "Chair / Coach", emoji: "🏐" },
  { name: "Sim Demetriou", role: "Secretary", emoji: "📋" },
  { name: "Emma Brown", role: "Media Manager / Coach", emoji: "📣" },
  { name: "Samuel Bailey", role: "Treasurer", emoji: "💼" },
  { name: "Niamh Campbell", role: "Safeguarding", emoji: "🛡️" },
  { name: "Joe Elder", role: "Coach", emoji: "🏐" },
  { name: "Sam Kwok", role: "Coach", emoji: "🏐" },
];

export default function Staff() {
  const ref = useScrollReveal();

  return (
    <section className="section staff" id="staff" ref={ref}>
      <div className="container">
        <span className="section-label">Committee & Coaching</span>
        <h2 className="section-title section-title--center">Our Team</h2>

        <div className="staff__grid">
          {staff.map((s, i) => (
            <div key={s.name} className={`staff-card reveal${i % 3 ? ` reveal--delay-${i % 3}` : ""}`}>
              <div className="staff-card__photo" aria-hidden="true">{s.emoji}</div>
              <div className="staff-card__info">
                <h3 className="staff-card__name">{s.name}</h3>
                <span className="staff-card__role">{s.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
