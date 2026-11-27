import { useScrollReveal } from "../hooks/useScrollReveal";

const SPIKE_INVITE_URL =
  "https://www.volleyspike.app/clubs/e98c1107-6d64-49a7-97cc-292a264786d6/join?token=hJPwAPnOw-U_LelC_I2fSnWIc9M-QSySMinp7XHPlRE";

const SPIKE_LOGO_URL =
  "https://play-lh.googleusercontent.com/W3J8blNspdWOyq78ef-LbnOW3UmMjBy6894iW--yTTgAlirn2yhxEHrfg6FJEa4AKpwpp090zERXWZPt9misyg=w240-h480";

export default function Timetable() {
  const ref = useScrollReveal();

  return (
    <section className="section timetable" id="timetable" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <span className="section-label">Schedule</span>
        <h2 className="section-title section-title--center">Weekly Training</h2>

        <div className="schedule-grid schedule-grid--single reveal">
          <div className="schedule-card schedule-card--centered">
            <div className="schedule-card__day">Wed</div>
            <div className="schedule-card__details">
              <span className="schedule-card__title">Club Training</span>
              <span className="schedule-card__meta">19:30 – 21:30</span>
            </div>
          </div>
        </div>

        <div className="spike-invite reveal">
          <p className="spike-invite__copy">
            For additional training sessions, upcoming games and the latest schedule updates,
            join Whitehaven Waves on Spike. We manage our events there, so you can keep up
            with changes and never miss an update.
          </p>
          <a
            href={SPIKE_INVITE_URL}
            className="spike-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Whitehaven Waves on Spike"
          >
            <img className="spike-link__logo" src={SPIKE_LOGO_URL} alt="" />
            <span>SPIKE</span>
          </a>
        </div>
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
