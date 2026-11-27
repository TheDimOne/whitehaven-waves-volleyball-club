import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export default function ScrollVolleyball() {
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToPointer = (clientY: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const bounds = rail.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * maxScroll, behavior: "auto" });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToPointer(event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) scrollToPointer(event.clientY);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? window.innerHeight : window.innerHeight * 0.15;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      window.scrollBy({ top: step, behavior: "smooth" });
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      window.scrollBy({ top: -step, behavior: "smooth" });
    } else if (event.key === "PageDown") {
      event.preventDefault();
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    } else if (event.key === "PageUp") {
      event.preventDefault();
      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
    } else if (event.key === "Home") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (event.key === "End") {
      event.preventDefault();
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={railRef}
      className="scroll-volleyball"
      role="scrollbar"
      aria-label="Page scroll position"
      aria-controls="root"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
      onKeyDown={handleKeyDown}
    >
      <span className="scroll-volleyball__track" />
      <span className="scroll-volleyball__progress" style={{ height: `${progress * 100}%` }} />
      <span className="scroll-volleyball__ball" style={{ top: `${progress * 100}%` }}>
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="17.5" fill="#fff" stroke="#0e6fb5" strokeWidth="1.5" />
          <path d="M8 8 C16 12 22 21 23 37 M31 7 C23 14 18 24 17 37 M3 20 C12 17 27 17 37 22" fill="none" stroke="#0e6fb5" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
