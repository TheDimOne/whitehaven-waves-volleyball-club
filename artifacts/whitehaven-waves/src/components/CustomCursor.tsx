import { useEffect, useState } from "react";

type PointerPosition = { x: number; y: number };

export default function CustomCursor() {
  const [position, setPosition] = useState<PointerPosition>({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;
    let clickTimer: ReturnType<typeof setTimeout> | undefined;
    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const isTextEntry = !!target?.closest("input, textarea, select, [contenteditable='true']");
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(!isTextEntry);
    };
    const onDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      setClicking(true);
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => setClicking(false), 360);
    };
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, []);

  useEffect(() => {
    const enabled = imageReady && !imageFailed;
    document.documentElement.classList.toggle("ww-custom-cursor-enabled", enabled);
    return () => document.documentElement.classList.remove("ww-custom-cursor-enabled");
  }, [imageReady, imageFailed]);

  if (imageFailed || typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;

  return (
    <>
      <img src="/cursor.png" alt="" aria-hidden="true" className="ww-custom-cursor-preload"
        onLoad={() => setImageReady(true)} onError={() => setImageFailed(true)} />
      {imageReady && (
        <span className={`ww-custom-cursor${visible ? " is-visible" : ""}`}
          style={{ left: position.x, top: position.y }} aria-hidden="true">
          {clicking ? <img className="ww-custom-cursor__click" src="/Click.png" alt="" />
            : <img className="ww-custom-cursor__pointer" src="/cursor.png" alt="" />}
        </span>
      )}
    </>
  );
}
