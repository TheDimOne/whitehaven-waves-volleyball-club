import { useScrollReveal } from "../hooks/useScrollReveal";

const videos = [
  {
    tag: "Season Highlights",
    title: "Best Spikes of 2026",
    desc: "Relive the season's most electrifying moments from the Waves.",
    src: "https://www.youtube.com/embed/4okm7CYQL2I",
  },
  {
    tag: "Match Recap",
    title: "Waves vs Coastal United",
    desc: "Full match recap from our biggest win of the season.",
    src: "https://www.youtube.com/embed/5tg6nQ2-m1U",
    delay: 1,
  },
  {
    tag: "Behind the Scenes",
    title: "Inside Training Camp",
    desc: "A look inside a typical week of training with the Waves squad.",
    src: "https://www.youtube.com/embed/tr4SijEEuz0",
    delay: 2,
  },
];

export default function Highlights() {
  const ref = useScrollReveal();

  return (
    <section className="section highlights" id="highlights" ref={ref}>
      <div className="container">
        <span className="section-label">On the Court</span>
        <h2 className="section-title section-title--center">Highlight Reel</h2>

        <div className="highlights__grid">
          {videos.map((v, i) => (
            <div key={i} className={`video-card reveal${v.delay ? ` reveal--delay-${v.delay}` : ""}`}>
              <div className="video-card__embed">
                <iframe
                  src={v.src}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="video-card__meta">
                <span className="video-card__tag">{v.tag}</span>
                <h3 className="video-card__title">{v.title}</h3>
                <p className="video-card__desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="social-strip reveal">
          <p>More videos on our socials →</p>
          <a href="https://www.instagram.com/whitehavenwaves/" className="social-btn social-btn--instagram" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="#" className="social-btn social-btn--tiktok" target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a href="https://www.youtube.com/@WhitehavenWaves" className="social-btn social-btn--youtube" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
