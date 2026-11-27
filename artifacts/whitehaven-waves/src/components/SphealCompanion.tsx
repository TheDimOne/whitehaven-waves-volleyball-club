import { useEffect, useRef, useState } from "react";

type Mood = "wander" | "curious" | "sit" | "eat" | "move";
type Point = { x: number; y: number };

export default function SphealCompanion() {
  const [point, setPoint] = useState<Point>({ x: 72, y: 76 });
  const [mood, setMood] = useState<Mood>("wander");
  const [facing, setFacing] = useState(1);
  const [visible, setVisible] = useState(false);
  const target = useRef<Point>({ x: 72, y: 76 });
  const position = useRef<Point>({ x: 72, y: 76 });
  const pointer = useRef<Point | null>(null);
  const lastInput = useRef(0);
  const moodRef = useRef<Mood>("wander");
  const timers = useRef<number[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = reduce.matches;
    const margin = 58;
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const setMoodSafe = (next: Mood, duration = 0) => {
      moodRef.current = next;
      setMood(next);
      if (duration) {
        const id = window.setTimeout(() => {
          if (moodRef.current === next) {
            moodRef.current = "wander";
            setMood("wander");
            chooseDestination();
          }
        }, duration);
        timers.current.push(id);
      }
    };
    const chooseDestination = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.current = {
        x: clamp(45 + Math.random() * Math.max(20, w - 90), margin, Math.max(margin, w - margin)),
        y: clamp(100 + Math.random() * Math.max(20, h - 160), margin + 30, Math.max(margin + 30, h - margin - 20))
      };
    };
    const onPointerMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      lastInput.current = performance.now();
      if (moodRef.current === "sit" || moodRef.current === "eat") return;
      const dx = position.current.x - event.clientX;
      const dy = position.current.y - event.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance < 145) {
        target.current = {
          x: clamp(event.clientX + (dx / (distance || 1)) * 112, margin, window.innerWidth - margin),
          y: clamp(event.clientY + (dy / (distance || 1)) * 112, margin + 35, window.innerHeight - margin)
        };
        if (moodRef.current !== "move") setMoodSafe("curious", 1100);
      }
    };
    const onUserInput = () => {
      lastInput.current = performance.now();
      if (moodRef.current === "sit" || moodRef.current === "eat") return;
      chooseDestination();
    };
    const onResize = () => {
      target.current = {
        x: clamp(target.current.x, margin, window.innerWidth - margin),
        y: clamp(target.current.y, margin + 30, window.innerHeight - margin)
      };
    };
    const onVisibility = () => { if (document.hidden) pointer.current = null; };

    if (finePointer.matches) window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("click", onUserInput, { passive: true });
    window.addEventListener("scroll", onUserInput, { passive: true });
    window.addEventListener("keydown", onUserInput);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    const startTimer = window.setTimeout(() => setVisible(true), 1800);
    const wanderTimer = window.setInterval(() => {
      if (document.hidden || moodRef.current === "move") return;
      const roll = Math.random();
      if (roll < 0.19) setMoodSafe("sit", 3800 + Math.random() * 2600);
      else if (roll < 0.34) setMoodSafe("eat", 3200);
      else chooseDestination();
    }, 12500);
    // A rare Aurora Beam: deliberately infrequent, brief, and purely decorative.
    const moveTimer = window.setInterval(() => {
      if (!document.hidden && moodRef.current !== "move" && Math.random() < 0.42) {
        setMoodSafe("move", 2100);
      }
    }, 95000);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      if (!document.hidden && !reducedMotion.current) {
        const p = position.current;
        const t = target.current;
        const dx = t.x - p.x;
        const dy = t.y - p.y;
        const distance = Math.hypot(dx, dy);
        const speed = moodRef.current === "curious" ? 0.055 : 0.025;
        if (distance > 2 && moodRef.current !== "sit" && moodRef.current !== "eat" && moodRef.current !== "move") {
          p.x += dx * speed;
          p.y += dy * speed;
          if (Math.abs(dx) > 0.6) setFacing(dx > 0 ? 1 : -1);
        }
        frame++;
        if (frame % 2 === 0) setPoint({ x: p.x, y: p.y });
      }
      raf = window.requestAnimationFrame(animate);
    };
    if (reducedMotion.current) {
      setPoint({ x: 72, y: 76 });
    } else {
      chooseDestination();
      raf = window.requestAnimationFrame(animate);
    }
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      window.clearInterval(wanderTimer);
      window.clearInterval(moveTimer);
      timers.current.forEach(window.clearTimeout);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("click", onUserInput);
      window.removeEventListener("scroll", onUserInput);
      window.removeEventListener("keydown", onUserInput);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const interact = () => {
    if (moodRef.current === "move") return;
    moodRef.current = "curious";
    setMood("curious");
    const id = window.setTimeout(() => {
      moodRef.current = "wander";
      setMood("wander");
    }, 1500);
    timers.current.push(id);
  };

  return (
    <div
      className={`spheal-companion ${visible ? "is-visible" : ""} spheal-companion--${mood}`}
      style={{ left: point.x, top: point.y, ["--spheal-facing" as string]: facing }}
      aria-hidden="true"
    >
      {mood === "move" && <span className="spheal-aurora" />}
      <button className="spheal-companion__button" type="button" tabIndex={-1} onClick={interact} aria-label="Spheal, the sea-rolling Pokémon">
        <svg className="spheal-art" viewBox="0 0 120 104" role="presentation">
          <defs>
            <radialGradient id="sphealBody" cx="38%" cy="28%" r="72%">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".48" stopColor="#e9f8ff" />
              <stop offset="1" stopColor="#91cfe8" />
            </radialGradient>
            <linearGradient id="sphealBlue" x2="0" y2="1">
              <stop stopColor="#4da9d4" />
              <stop offset="1" stopColor="#176c9e" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="91" rx="38" ry="7" fill="#062c4b" opacity=".22" />
          <g className="spheal-flippers">
            <path d="M25 67 Q7 65 7 82 Q18 91 35 78Z" fill="url(#sphealBlue)" stroke="#155c89" strokeWidth="1.5" />
            <path d="M95 67 Q113 65 113 82 Q102 91 85 78Z" fill="url(#sphealBlue)" stroke="#155c89" strokeWidth="1.5" />
          </g>
          <ellipse cx="60" cy="58" rx="49" ry="38" fill="url(#sphealBody)" stroke="#75b9d9" strokeWidth="2" />
          <path d="M18 45 Q24 17 60 17 Q96 17 102 45 Q86 33 60 34 Q34 33 18 45Z" fill="#f8fdff" opacity=".75" />
          <path d="M35 32 Q27 22 22 32 Q20 42 32 43 Q39 40 35 32Z" fill="#f5fbff" />
          <path d="M85 32 Q93 22 98 32 Q100 42 88 43 Q81 40 85 32Z" fill="#f5fbff" />
          <ellipse cx="43" cy="55" rx="4.3" ry="5.6" fill="#173e59" />
          <ellipse cx="77" cy="55" rx="4.3" ry="5.6" fill="#173e59" />
          <circle cx="44.5" cy="53" r="1.5" fill="#fff" />
          <circle cx="78.5" cy="53" r="1.5" fill="#fff" />
          <ellipse cx="60" cy="66" rx="5.8" ry="4.3" fill="#e9a1aa" />
          <path d="M54 74 Q60 78 66 74" fill="none" stroke="#477f9b" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M23 60 Q29 55 35 60 M85 60 Q91 55 97 60" fill="none" stroke="#fff" strokeWidth="2" opacity=".75" strokeLinecap="round" />
          <path d="M47 86 Q60 90 73 86" fill="none" stroke="#75b9d9" strokeWidth="1.5" opacity=".6" />
        </svg>
      </button>
      {mood === "eat" && <span className="spheal-snack">🐟</span>}
      {mood === "move" && <span className="spheal-move-label">AURORA BEAM!</span>}
      {mood === "curious" && <span className="spheal-thought">♥</span>}
    </div>
  );
}
