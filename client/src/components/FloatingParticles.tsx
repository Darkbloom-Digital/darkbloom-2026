import { useEffect, useRef } from "react";
import logoSrc from "@assets/optimized/site-logo.webp";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface FloatingParticlesProps {
  className?: string;
  count?: number;
}

export default function FloatingParticles({ className = "", count = 40 }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const logo = new Image();
    const particles: Particle[] = [];
    let animationId = 0;
    let started = false;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (started && reducedMotion) draw(false);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initParticles = () => {
      particles.length = 0;
      const cols = 5;
      const rows = Math.ceil(count / cols);
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        particles.push({
          x: col * cellWidth + Math.random() * cellWidth,
          y: row * cellHeight + Math.random() * cellHeight,
          size: Math.random() * 20 + 15,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.3 + 0.25,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
        });
      }
    };

    function draw(move: boolean) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((p) => {
        if (move) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          if (p.x < -p.size) p.x = canvas!.width + p.size;
          if (p.x > canvas!.width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = canvas!.height + p.size;
          if (p.y > canvas!.height + p.size) p.y = -p.size;
        }

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.globalAlpha = p.opacity;
        ctx!.drawImage(logo, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx!.restore();
      });
    }

    const animate = () => {
      draw(true);
      animationId = requestAnimationFrame(animate);
    };

    // Decorative only: start once the page has painted and the browser is
    // idle, so it never competes with the hero text for first paint. With
    // prefers-reduced-motion, draw a single still frame instead of animating.
    const start = () => {
      logo.onload = () => {
        started = true;
        initParticles();
        if (reducedMotion) draw(false);
        else animate();
      };
      logo.src = logoSrc;
    };
    const hasIdle = "requestIdleCallback" in window;
    const idleId = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 200);

    // Pause the loop while the tab is hidden.
    const onVisibility = () => {
      if (!started || reducedMotion) return;
      cancelAnimationFrame(animationId);
      if (!document.hidden) animate();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibility);
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cancelAnimationFrame(animationId);
      logo.onload = null;
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
