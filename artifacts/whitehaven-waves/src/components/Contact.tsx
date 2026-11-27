import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import registrationQr from "../assets/whitehaven-waves-registration-qr.png";

const REGISTRATION_URL = "https://forms.cloud.microsoft/r/cdx9fqwetk";

export default function Contact() {
  const ref = useScrollReveal();
  const [note, setNote] = useState("");
  const [noteColor, setNoteColor] = useState("#94a3b8");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setNote("Message received! We'll get back to you soon.");
      setNoteColor("#34d399");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 800);
  };

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="wave-divider wave-divider--top" />
      <div className="container">
        <span className="section-label">Get Involved</span>
        <h2 className="section-title section-title--center">Contact Us</h2>

        <div className="contact__grid">
          <div className="contact__info reveal">
            <div className="contact-block">
              <span className="contact-block__icon">📍</span>
              <div>
                <h4>Where to Find Us</h4>
                <p>St Bees Sports Hall<br />Wood Lane<br />Cumbria, CA27 0DS</p>
              </div>
            </div>
            <div className="contact-block">
              <span className="contact-block__icon">📧</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@whitehavenwaves.com">info@whitehavenwaves.com</a>
              </div>
            </div>
            <div className="contact-block">
              <span className="contact-block__icon">📞</span>
              <div>
                <h4>Phone</h4>
                <a href="tel:+441900000000">+44 1900 000 000</a>
              </div>
            </div>
            <div className="contact__social">
              <h4>Follow the Waves</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/whitehavenwaves/" className="social-link social-link--ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@whitehavenwaves" className="social-link social-link--tt" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://www.youtube.com/@WhitehavenWaves" className="social-link social-link--yt" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </a>
              </div>
            </div>
            <div className="contact__qr">
              <a
                className="contact__qr-image-link"
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Whitehaven Waves registration form"
              >
                <img
                  className="contact__qr-image"
                  src={registrationQr}
                  alt="QR code for the Whitehaven Waves registration form"
                  width={144}
                  height={144}
                  loading="lazy"
                />
              </a>
              <div className="contact__qr-copy">
                <h4>Join the Waves</h4>
                <p>Scan to open the club registration form.</p>
                <a
                  className="contact__qr-action"
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open registration form <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact__form reveal reveal--right">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form__group">
                <label className="form__label" htmlFor="name">Your Name</label>
                <input
                  className="form__input" type="text" id="name" placeholder="Jane Smith" required
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="email">Email Address</label>
                <input
                  className="form__input" type="email" id="email" placeholder="jane@example.com" required
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="subject">Subject</label>
                <select
                  className="form__input" id="subject"
                  value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                >
                  <option value="">Select a topic…</option>
                  <option value="join">Joining the Club</option>
                  <option value="training">Training Enquiry</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="press">Press / Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="message">Message</label>
                <textarea
                  className="form__input form__textarea" id="message" rows={5}
                  placeholder="Tell us what's on your mind…" required
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
                {submitting ? "Sending…" : "Send Message 🌊"}
              </button>
              {note && <p className="form__note" style={{ color: noteColor }}>{note}</p>}
            </form>
          </div>
        </div>
      </div>
      <div className="wave-divider wave-divider--bottom" />
    </section>
  );
}
