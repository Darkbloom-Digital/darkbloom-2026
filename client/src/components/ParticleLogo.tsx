import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
}

export default function ParticleLogo({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.35;

    // Define the logo shape with many more points for better definition
    const logoPoints: [number, number][] = [];
    
    // Left diamond/arrow outline (D part) - more detail
    const diamondOutline: [number, number][] = [];
    // Top left edge
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([-0.7 * t, -0.8 + 0.8 * t]);
    }
    // Bottom left edge
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([-0.7 + 0.7 * t, 0 + 0.8 * t]);
    }
    // Inner diamond edges
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([0 + 0.15 * t, 0.8 - 0.2 * t]);
    }
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([0.15 - 0.55 * t, 0.6 - 0.6 * t]);
    }
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([-0.4 + 0.55 * t, 0 - 0.6 * t]);
    }
    for (let t = 0; t <= 1; t += 0.02) {
      diamondOutline.push([0.15 - 0.15 * t, -0.6 - 0.2 * t]);
    }
    
    // Right B curves - more detail
    const bOutline: [number, number][] = [];
    // Top curve of B (outer)
    for (let t = 0; t <= 1; t += 0.015) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bOutline.push([0.25 + Math.cos(angle) * 0.4, -0.4 + Math.sin(angle) * 0.38]);
    }
    // Bottom curve of B (outer)
    for (let t = 0; t <= 1; t += 0.015) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bOutline.push([0.3 + Math.cos(angle) * 0.48, 0.42 + Math.sin(angle) * 0.42]);
    }
    // Inner curves
    for (let t = 0; t <= 1; t += 0.02) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bOutline.push([0.2 + Math.cos(angle) * 0.22, -0.4 + Math.sin(angle) * 0.22]);
    }
    for (let t = 0; t <= 1; t += 0.02) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bOutline.push([0.22 + Math.cos(angle) * 0.28, 0.4 + Math.sin(angle) * 0.26]);
    }
    // Vertical lines
    for (let t = 0; t <= 1; t += 0.015) {
      bOutline.push([0, -0.78 + 1.56 * t]);
    }
    // Middle connection
    for (let t = 0; t <= 1; t += 0.03) {
      bOutline.push([0 + 0.2 * t, -0.02]);
    }

    // Combine all outline points
    diamondOutline.forEach(p => logoPoints.push(p));
    bOutline.forEach(p => logoPoints.push(p));

    // Create particles from all points with small size
    const particles: Particle[] = logoPoints.map(([px, py]) => ({
      baseX: centerX + px * scale,
      baseY: centerY + py * scale,
      x: centerX + px * scale,
      y: centerY + py * scale,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.4 + 0.5,
      speed: Math.random() * 0.015 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    // Add extra particles along outlines for density
    for (let i = 0; i < 200; i++) {
      const randomPoint = logoPoints[Math.floor(Math.random() * logoPoints.length)];
      const offsetX = (Math.random() - 0.5) * 0.08;
      const offsetY = (Math.random() - 0.5) * 0.08;
      particles.push({
        baseX: centerX + (randomPoint[0] + offsetX) * scale,
        baseY: centerY + (randomPoint[1] + offsetY) * scale,
        x: centerX + (randomPoint[0] + offsetX) * scale,
        y: centerY + (randomPoint[1] + offsetY) * scale,
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.3 + 0.4,
        speed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Floating motion - subtle
        p.angle += p.speed;
        p.x = p.baseX + Math.sin(p.angle) * 3;
        p.y = p.baseY + Math.cos(p.angle * 0.7) * 3;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 30, 80, ${p.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 30, 80, ${p.opacity * 0.2})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
