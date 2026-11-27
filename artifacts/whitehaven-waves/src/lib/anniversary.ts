const GROUP_START_DATE = new Date(2023, 4, 5);
const ANNIVERSARY_MONTH = GROUP_START_DATE.getMonth();
const ANNIVERSARY_DAY = GROUP_START_DATE.getDate();
const CONFETTI_COLORS = ["#178dd4", "#0e7cc3", "#52a5d8", "#c0cadd", "#f7fbff"];

export function isAnniversary(today = new Date()) {
  return (
    today.getMonth() === ANNIVERSARY_MONTH &&
    today.getDate() === ANNIVERSARY_DAY
  );
}

export function getYearsActive(today = new Date()) {
  let years = today.getFullYear() - GROUP_START_DATE.getFullYear();
  const anniversary = new Date(
    today.getFullYear(),
    ANNIVERSARY_MONTH,
    ANNIVERSARY_DAY,
  );

  if (today < anniversary) years -= 1;
  return Math.max(0, years);
}

export function celebrateAnniversary({
  force = false,
  today = new Date(),
}: {
  force?: boolean;
  today?: Date;
} = {}) {
  if (!force && !isAnniversary(today)) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const canvas = document.createElement("canvas");
  canvas.className = "anniversary-confetti";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const message = document.createElement("div");
  message.className = "anniversary-toast";
  message.setAttribute("role", "status");
  message.textContent = `🌊 ${getYearsActive(today)} years on the waves`;
  document.body.appendChild(message);

  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    message.remove();
    return () => {};
  }

  let animationFrame = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;
  const startedAt = performance.now();
  const duration = 5600;
  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.4,
    width: Math.random() * 9 + 5,
    height: Math.random() * 5 + 4,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.18,
    velocityX: (Math.random() - 0.5) * 2.4,
    velocityY: Math.random() * 2.5 + 2.5,
    wobble: Math.random() * Math.PI * 2,
  }));

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const cleanup = () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resize);
    canvas.remove();
    message.remove();
  };

  const animate = (time: number) => {
    const elapsed = time - startedAt;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.velocityX + Math.sin(particle.wobble) * 0.45;
      particle.y += particle.velocityY;
      particle.velocityY += 0.035;
      particle.wobble += 0.04;
      particle.rotation += particle.rotationSpeed;

      const fadeStart = duration - 1400;
      const opacity = elapsed > fadeStart
        ? Math.max(0, 1 - (elapsed - fadeStart) / 1400)
        : 1;

      context.save();
      context.globalAlpha = opacity;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      context.fillRect(
        -particle.width / 2,
        -particle.height / 2,
        particle.width,
        particle.height,
      );
      context.restore();
    });

    if (elapsed < duration) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cleanup();
    }
  };

  resize();
  window.addEventListener("resize", resize);
  animationFrame = requestAnimationFrame(animate);
  return cleanup;
}