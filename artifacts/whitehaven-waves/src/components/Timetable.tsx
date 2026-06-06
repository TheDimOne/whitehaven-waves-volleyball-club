import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const training = [
  { day: "Mon", title: "Senior Training", meta: "18:00 – 20:00 · Whitehaven Sports Hall", tag: "senior", tagLabel: "Senior" },
  { day: "Wed", title: "Youth Training", meta: "17:00 – 18:30 · Whitehaven Leisure Centre", tag: "youth", tagLabel: "Youth" },
  { day: "Thu", title: "Open Session", meta: "19:00 – 20:30 · Whitehaven Sports Hall", tag: "open", tagLabel: "Open" },
  { day: "Sat", title: "Beach Volleyball", meta: "10:00 – 12:00 · South Beach Courts", tag: "beach", tagLabel: "Beach" },
];

const fixtures = [
  { day: "14", month: "Jun", home: "Whitehaven Waves", away: "Coastal United", venue: "Whitehaven Sports Hall", time: "15:00 KO", type: "home" },
  { day: "21", month: "Jun", home: "Bay FC", away: "Whitehaven Waves", venue: "Bay Sports Arena", time: "14:00 KO", type: "away" },
  { day: "28", month: "Jun", home: "Whitehaven Waves", away: "North Spikers", venue: "Whitehaven Sports Hall", time: "16:00 KO", type: "home" },
];

const results = [
  { date: "07 Jun", home: "Whitehaven Waves", score: "3 – 1", away: "Redshore FC", result: "win" },
  { date: "31 May", home: "Harbour Hawks", score: "0 – 3", away: "Whitehaven Waves", result: "win" },
  { date: "24 May", home: "Whitehaven Waves", score: "1 – 3", away: "Summit Volley Club", result: "loss" },
  { date: "17 May", home: "Whitehaven Waves", score: "3 – 0", away: "Driftwood VBC", result: "win" },
];

type Tab = "training" | "fixtures" | "results";

export default function Timetable() {
  const [tab, setTab] = useState<Tab>("training");
  const ref = useScrollReveal();

  return (
    <section className="section timetable" id="timetable" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <span className="section-label">Schedule</span>
        <h2 className="section-title section-title--center">Training & Fixtures</h2>

        <div className="timetable__tabs">
          {(["training", "fixtures", "results"] as Tab[]).map(t => (
            <button
              key={t}
              className={`tab-btn${tab === t ? " tab-btn--active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "training" && (
          <div>
            <div className="schedule-grid reveal">
              {training.map((session, i) => (
                <div key={i} className="schedule-card">
                  <div className="schedule-card__day">{session.day}</div>
                  <div className="schedule-card__details">
                    <span className="schedule-card__title">{session.title}</span>
                    <span className="schedule-card__meta">{session.meta}</span>
                  </div>
                  <div className={`schedule-card__tag schedule-card__tag--${session.tag}`}>{session.tagLabel}</div>
                </div>
              ))}
            </div>
            <div className="doc-link reveal">
              <a href="#" className="doc-link__btn">
                📄 Download Full Training Schedule (PDF)
              </a>
              <p className="doc-link__note">Last updated: June 2026</p>
            </div>
          </div>
        )}

        {tab === "fixtures" && (
          <div>
            <div className="fixtures-list reveal">
              {fixtures.map((f, i) => (
                <div key={i} className="fixture fixture--upcoming">
                  <div className="fixture__date">
                    <span className="fixture__day">{f.day}</span>
                    <span className="fixture__month">{f.month}</span>
                  </div>
                  <div className="fixture__teams">
                    <span className="fixture__home">{f.home}</span>
                    <span className="fixture__vs">vs</span>
                    <span className="fixture__away">{f.away}</span>
                  </div>
                  <div className="fixture__meta">
                    <span>{f.venue}</span>
                    <span>{f.time}</span>
                  </div>
                  <span className={`fixture__badge fixture__badge--${f.type}`}>
                    {f.type === "home" ? "Home" : "Away"}
                  </span>
                </div>
              ))}
            </div>
            <div className="doc-link reveal">
              <a href="#" className="doc-link__btn">📄 Full Season Fixture List</a>
            </div>
          </div>
        )}

        {tab === "results" && (
          <div>
            <div className="results-list reveal">
              {results.map((r, i) => (
                <div key={i} className={`result result--${r.result}`}>
                  <div className="result__date">{r.date}</div>
                  <div className="result__teams">
                    <span>{r.home}</span>
                    <span className="result__score">{r.score}</span>
                    <span>{r.away}</span>
                  </div>
                  <div className={`result__badge result__badge--${r.result}`}>
                    {r.result === "win" ? "W" : "L"}
                  </div>
                </div>
              ))}
            </div>
            <div className="doc-link reveal">
              <a href="#" className="doc-link__btn">📊 View Full Season Statistics</a>
            </div>
          </div>
        )}
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
