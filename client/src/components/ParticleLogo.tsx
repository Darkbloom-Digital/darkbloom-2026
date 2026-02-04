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

    // Define the logo shape as points (DB monogram outline)
    const logoPoints: [number, number][] = [];
    
    // Left diamond/arrow shape (D part)
    const diamondPoints = [
      [0, -0.8],
      [-0.7, 0],
      [0, 0.8],
      [0.15, 0.6],
      [-0.4, 0],
      [0.15, -0.6],
    ];
    
    // Right B curves
    const bPoints: [number, number][] = [];
    // Top curve of B
    for (let t = 0; t <= 1; t += 0.05) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bPoints.push([0.3 + Math.cos(angle) * 0.35, -0.4 + Math.sin(angle) * 0.35]);
    }
    // Bottom curve of B
    for (let t = 0; t <= 1; t += 0.05) {
      const angle = -Math.PI / 2 + t * Math.PI;
      bPoints.push([0.35 + Math.cos(angle) * 0.4, 0.4 + Math.sin(angle) * 0.4]);
    }
    // Connecting lines
    bPoints.push([0, 0.8]);
    bPoints.push([0, -0.8]);
    bPoints.push([0.3, -0.8]);
    bPoints.push([0, 0]);
    bPoints.push([0.35, 0]);

    // Combine all points
    diamondPoints.forEach(p => logoPoints.push([p[0], p[1]]));
    bPoints.forEach(p => logoPoints.push(p));

    // Interpolate between points to create more particles along edges
    const allPoints: [number, number][] = [];
    for (let i = 0; i < logoPoints.length; i++) {
      const current = logoPoints[i];
      const next = logoPoints[(i + 1) % logoPoints.length];
      const steps = 8;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        allPoints.push([
          current[0] + (next[0] - current[0]) * t,
          current[1] + (next[1] - current[1]) * t,
        ]);
      }
    }

    // Create particles
    const particles: Particle[] = allPoints.map(([px, py]) => ({
      baseX: centerX + px * scale,
      baseY: centerY + py * scale,
      x: centerX + px * scale,
      y: centerY + py * scale,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    // Add some extra floating particles around the logo
    for (let i = 0; i < 50; i++) {
      const randomPoint = logoPoints[Math.floor(Math.random() * logoPoints.length)];
      const offsetX = (Math.random() - 0.5) * 0.3;
      const offsetY = (Math.random() - 0.5) * 0.3;
      particles.push({
        baseX: centerX + (randomPoint[0] + offsetX) * scale,
        baseY: centerY + (randomPoint[1] + offsetY) * scale,
        x: centerX + (randomPoint[0] + offsetX) * scale,
        y: centerY + (randomPoint[1] + offsetY) * scale,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.03 + 0.01,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Floating motion
        p.angle += p.speed;
        p.x = p.baseX + Math.sin(p.angle) * 8;
        p.y = p.baseY + Math.cos(p.angle * 0.7) * 8;

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
