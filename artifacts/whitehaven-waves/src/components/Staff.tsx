import { useScrollReveal } from "../hooks/useScrollReveal";

const staff = [
  { name: "Paul Baldueza", role: "Chair / Coach", emoji: "🏐", bio: "Helps guide the club and supports players through coaching and training." },
  { name: "Sim Demetriou", role: "Secretary", emoji: "📋", bio: "Helps keep club communications, records and organisation running smoothly." },
  { name: "Emma Brown", role: "Media Manager / Coach", emoji: "📣", bio: "Looks after the club's media and helps players develop through coaching." },
  { name: "Samuel Bailey", role: "Treasurer", emoji: "💼", bio: "Looks after the club's finances and helps keep its activities on a sound footing." },
  { name: "Niamh Campbell", role: "Safeguarding", emoji: "🛡️", bio: "Supports a safe, respectful and welcoming environment for everyone at the club." },
  { name: "Joe Elder", role: "Coach", emoji: "🏐", bio: "Helps players build their skills, confidence and understanding of the game." },
  { name: "Sam Kwok", role: "Coach", emoji: "🏐", bio: "Helps players build their skills, confidence and understanding of the game." },
];

export default function Staff() {
  const ref = useScrollReveal();

  return (
    <section className="section staff" id="staff" ref={ref}>
      <div className="container">
        <span className="section-label">Committee & Coaching</span>
        <h2 className="section-title section-title--center">Our Team</h2>
        <p className="staff__intro">The people behind the Waves work hard to make every session safe, welcoming and fun, while helping everyone enjoy and improve at the sport we love.</p>

        <div className="staff__carousel" aria-label="Club staff carousel">
          <div className="staff__track">
            {[0, 1].map((group) => (
              <div className="staff__group" key={group} aria-hidden={group === 1 ? "true" : undefined}>
                {staff.map((s) => (
                  <article key={`${group}-${s.name}`} className="staff-card" tabIndex={group === 1 ? -1 : 0}>
                    <div className="staff-card__photo" aria-hidden="true">{s.emoji}</div>
                    <div className="staff-card__info">
                      <h3 className="staff-card__name">{s.name}</h3>
                      <span className="staff-card__role">{s.role}</span>
                    </div>
                    <div className="staff-card__overlay">
                      <span className="staff-card__overlay-role">{s.role}</span>
                      <h3>{s.name}</h3>
                      <p>{s.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
