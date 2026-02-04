import { useEffect, useRef } from "react";
import logoSrc from "@assets/SiteLogo_1770164848722.png";

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
}

export default function FloatingParticles({ className = "" }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logo = new Image();
    logo.src = logoSrc;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 12;

    const initParticles = () => {
      particles.length = 0;
      const cols = 4;
      const rows = Math.ceil(particleCount / cols);
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;
      
      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        particles.push({
          x: col * cellWidth + Math.random() * cellWidth,
          y: row * cellHeight + Math.random() * cellHeight,
          size: Math.random() * 20 + 15,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.25 + 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
        });
      }
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(logo, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    logo.onload = () => {
      initParticles();
      animate();
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
}
