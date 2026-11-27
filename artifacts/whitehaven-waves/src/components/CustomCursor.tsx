import { useEffect, useState } from "react";

type PointerPosition = { x: number; y: number };

export default function CustomCursor({ enabled }: { enabled: boolean }) {
  const [position, setPosition] = useState<PointerPosition>({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hoveringAction, setHoveringAction] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!enabled || !media.matches) return;

    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const isTextEntry = !!target?.closest("input, textarea, select, [contenteditable='true']");
      const isAction = !!target?.closest("a, button, [role='button'], summary, label, [onclick]");
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(!isTextEntry);
      setHoveringAction(!isTextEntry && isAction);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  useEffect(() => {
    const shouldEnable = enabled && imageReady && !imageFailed && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.documentElement.classList.toggle("ww-custom-cursor-enabled", shouldEnable);
    return () => document.documentElement.classList.remove("ww-custom-cursor-enabled");
  }, [enabled, imageReady, imageFailed]);

  if (!enabled || imageFailed || typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;

  return (
    <>
      <img src="/cursor.png" alt="" aria-hidden="true" className="ww-custom-cursor-preload"
        onLoad={() => setImageReady(true)} onError={() => setImageFailed(true)} />
      {imageReady && (
        <span className={`ww-custom-cursor${visible ? " is-visible" : ""}`}
          style={{ left: position.x, top: position.y }} aria-hidden="true">
          {hoveringAction
            ? <img className="ww-custom-cursor__click" src="/Click.png" alt="" />
            : <img className="ww-custom-cursor__pointer" src="/cursor.png" alt="" />}
        </span>
      )}
    </>
  );
}
