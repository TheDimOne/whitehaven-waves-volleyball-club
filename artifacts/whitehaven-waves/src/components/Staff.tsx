import { useScrollReveal } from "../hooks/useScrollReveal";

const staff = [
  {
    name: "Chris Hartley",
    role: "Head Coach",
    bio: "12 years coaching experience at regional and national level. Former professional player turned passionate mentor.",
    email: "coach@whitehavenwaves.com",
    emoji: "👨‍🏫",
  },
  {
    name: "Dana Murphy",
    role: "Assistant Coach",
    bio: "Specialises in serving and defensive systems. Dana brings energy and tactical depth to every training session.",
    email: "asst@whitehavenwaves.com",
    emoji: "🎯",
    delay: 1,
  },
  {
    name: "Priya Kapoor",
    role: "Club Physiotherapist",
    bio: "Keeping the Waves injury-free. Priya handles player welfare, recovery programmes, and match-day support.",
    email: "physio@whitehavenwaves.com",
    emoji: "🩺",
    delay: 2,
  },
  {
    name: "Tom Brennan",
    role: "Club Manager",
    bio: "The organisational backbone of the Waves. Tom handles fixtures, registrations, and everything in between.",
    email: "manager@whitehavenwaves.com",
    emoji: "📋",
  },
];

export default function Staff() {
  const ref = useScrollReveal();

  return (
    <section className="section staff" id="staff" ref={ref}>
      <div className="container">
        <span className="section-label">Behind the Team</span>
        <h2 className="section-title section-title--center">Our Staff</h2>

        <div className="staff__grid">
          {staff.map((s, i) => (
            <div key={i} className={`staff-card reveal${s.delay ? ` reveal--delay-${s.delay}` : ""}`}>
              <div className="staff-card__photo">{s.emoji}</div>
              <div className="staff-card__info">
                <h3 className="staff-card__name">{s.name}</h3>
                <span className="staff-card__role">{s.role}</span>
                <p className="staff-card__bio">{s.bio}</p>
                <a href={`mailto:${s.email}`} className="staff-card__contact">
                  📧 Get in Touch
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
