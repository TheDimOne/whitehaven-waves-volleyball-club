import { useScrollReveal } from "../hooks/useScrollReveal";

const SPIKE_INVITE_URL =
  "https://www.volleyspike.app/clubs/e98c1107-6d64-49a7-97cc-292a264786d6/join?token=hJPwAPnOw-U_LelC_I2fSnWIc9M-QSySMinp7XHPlRE";

export default function Timetable() {
  const ref = useScrollReveal();

  return (
    <section className="section timetable" id="timetable" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <span className="section-label">Schedule</span>
        <h2 className="section-title section-title--center">Weekly Training</h2>

        <div className="schedule-grid reveal">
          <div className="schedule-card">
            <div className="schedule-card__day">Wed</div>
            <div className="schedule-card__details">
              <span className="schedule-card__title">Club Training</span>
              <span className="schedule-card__meta">19:30 – 21:30</span>
            </div>
          </div>
        </div>

        <div className="doc-link reveal">
          <a
            href={SPIKE_INVITE_URL}
            className="spike-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Whitehaven Waves on Spike"
          >
            <span className="spike-link__mark" aria-hidden="true">S</span>
            <span>SPIKE</span>
          </a>
        </div>
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
