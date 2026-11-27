import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export default function ScrollVolleyball() {
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    const onScroll = () => {
      update();
      setIsScrolling(true);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => setIsScrolling(false), 140);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
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

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
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
      <span
        className={`scroll-volleyball__ball${isScrolling ? " is-rolling" : ""}`}
        style={{ top: `${progress * 100}%` }}
        aria-hidden="true"
      >
        🏐
      </span>
    </div>
  );
}
