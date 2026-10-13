"use client";

import { useEffect, useRef, useCallback } from "react";

interface SkillNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  radius: number;
  label: string;
  category: number;
  color: string;
  glowColor: string;
  opacity: number;
}

const CATEGORIES = [
  {
    title: "Languages",
    color: "#e85d3a",
    glow: "rgba(232, 93, 58, 0.3)",
    skills: [
      "Python", "GoLang", "C", "C++", "CUDA", "Scala", "JavaScript",
      "TypeScript", "SQL", "SystemVerilog", "x86 Asm", "Java", "Solidity", "HTML/CSS",
    ],
  },
  {
    title: "Frameworks",
    color: "#3a7ee8",
    glow: "rgba(58, 126, 232, 0.3)",
    skills: [
      "React", "Next.js", "PyTorch", "TensorFlow", "OpenCV", "ROS",
      "Spark", "Kafka", "Django", "Pandas", "Hugging Face",
    ],
  },
  {
    title: "Tools",
    color: "#3ae8d4",
    glow: "rgba(58, 232, 212, 0.3)",
    skills: [
      "AWS SageMaker", "Supabase", "Redis", "PostgreSQL", "Vercel",
      "Git", "Docker", "Vivado", "FPGA", "Qiskit", "GDB", "Linux",
    ],
  },
];

const SPRING = 0.008;
const DAMPING = 0.92;
const REPULSION_RADIUS = 180;
const REPULSION_STRENGTH = 8;
const JITTER = 0.04;
const CONNECTION_DIST = 200;
const NODE_RADIUS = 4;
const HOVER_RADIUS = 60;

function initNodes(width: number, height: number): SkillNode[] {
  const nodes: SkillNode[] = [];
  const padding = 80;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  CATEGORIES.forEach((cat, ci) => {
    const colX = padding + (usableW / 3) * ci + usableW / 6;
    const colH = usableH;
    const perCol = cat.skills.length;

    cat.skills.forEach((skill, si) => {
      const angle = (si / perCol) * Math.PI * 2 + ci * 0.5;
      const spread = Math.min(usableW / 6, usableH / 3) * 0.75;
      const r = spread * (0.3 + Math.random() * 0.7);
      const x = colX + Math.cos(angle) * r + (Math.random() - 0.5) * 40;
      const y = padding + usableH / 2 + Math.sin(angle) * r * 0.6 + (Math.random() - 0.5) * 40;

      nodes.push({
        x, y, vx: 0, vy: 0,
        homeX: x, homeY: y,
        radius: NODE_RADIUS,
        label: skill,
        category: ci,
        color: cat.color,
        glowColor: cat.glow,
        opacity: 0.7,
      });
    });
  });

  return nodes;
}

export default function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    nodesRef.current = initNodes(rect.width, rect.height);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const mouse = mouseRef.current;
    const nodes = nodesRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Subtle dot grid background
    ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
    const gridSpacing = 40;
    for (let gx = gridSpacing; gx < w; gx += gridSpacing) {
      for (let gy = gridSpacing; gy < h; gy += gridSpacing) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Find hovered node
    let hoveredIdx = -1;
    if (mouse.active) {
      let minDist = HOVER_RADIUS;
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          hoveredIdx = i;
        }
      }
    }

    // Physics
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      let ax = 0, ay = 0;

      // Spring to home
      ax += (n.homeX - n.x) * SPRING;
      ay += (n.homeY - n.y) * SPRING;

      // Mouse repulsion
      if (mouse.active) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_STRENGTH;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
      }

      // Jitter
      n.vx += (Math.random() - 0.5) * JITTER;
      n.vy += (Math.random() - 0.5) * JITTER;

      // Integrate
      n.vx = (n.vx + ax) * DAMPING;
      n.vy = (n.vy + ay) * DAMPING;
      n.x += n.vx;
      n.y += n.vy;

      // Bounds
      n.x = Math.max(20, Math.min(w - 20, n.x));
      n.y = Math.max(20, Math.min(h - 20, n.y));
    }

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].category !== nodes[j].category) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CONNECTION_DIST) continue;

        const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
        const isHighlighted =
          hoveredIdx === i || hoveredIdx === j ||
          (hoveredIdx >= 0 && nodes[hoveredIdx].category === nodes[i].category);
        const finalAlpha = isHighlighted ? alpha * 3 : alpha;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = nodes[i].color;
        ctx.globalAlpha = finalAlpha;
        ctx.lineWidth = isHighlighted ? 1 : 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Draw nodes + labels
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const isHovered = i === hoveredIdx;
      const isCategoryHighlighted = hoveredIdx >= 0 && nodes[hoveredIdx].category === n.category;
      const r = isHovered ? NODE_RADIUS * 2.5 : isCategoryHighlighted ? NODE_RADIUS * 1.5 : NODE_RADIUS;

      // Glow
      ctx.shadowBlur = isHovered ? 25 : isCategoryHighlighted ? 15 : 8;
      ctx.shadowColor = n.color;

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = isHovered ? 1 : isCategoryHighlighted ? 0.9 : 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Label
      const labelOpacity = isHovered ? 1 : isCategoryHighlighted ? 0.7 : 0.35;
      ctx.font = `${isHovered ? "500" : "400"} ${isHovered ? 13 : 11}px var(--font-mono), monospace`;
      ctx.fillStyle = n.color;
      ctx.globalAlpha = labelOpacity;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(n.label, n.x + r + 8, n.y);
      ctx.globalAlpha = 1;
    }

    // Category labels at top
    const catLabelY = 30;
    CATEGORIES.forEach((cat, ci) => {
      const colX = 80 + ((w - 160) / 3) * ci + (w - 160) / 6;
      const isActive = hoveredIdx >= 0 && nodes[hoveredIdx].category === ci;

      ctx.font = `${isActive ? "700" : "600"} 13px var(--font-display), sans-serif`;
      ctx.fillStyle = cat.color;
      ctx.globalAlpha = isActive ? 1 : 0.5;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cat.title, colX, catLabelY);
      ctx.globalAlpha = 1;

      // Underline
      const textW = ctx.measureText(cat.title).width;
      ctx.beginPath();
      ctx.moveTo(colX - textW / 2, catLabelY + 12);
      ctx.lineTo(colX + textW / 2, catLabelY + 12);
      ctx.strokeStyle = cat.color;
      ctx.globalAlpha = isActive ? 0.6 : 0.15;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    resize();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize, animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden"
      style={{ height: "clamp(450px, 50vw, 650px)" }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="block w-full h-full cursor-crosshair"
      />
    </div>
  );
}
