// src/components/sections/Services.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Cpu, Wifi, Smartphone, ArrowRight, Sparkles, Film, Palette, Video, Mic, Camera, Zap } from 'lucide-react';

// Chrome Dino Animation Component - EXACT REPLICA
const ChromeDinoAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Spider-Man Configuration
  const CONFIG = {
    SPIDERMAN: {
      WIDTH: 24,      // Sedikit lebih besar untuk detail
      HEIGHT: 32,     // Sedikit lebih tinggi
      START_X: 80,
      GRAVITY: 0.6,
      JUMP_VELOCITY: 8,
      MAX_JUMP_HEIGHT: 7,
      RUN_SPEED: 1,   // Animasi lari lebih cepat
    },
    BUILDING: {
      MIN_WIDTH: 25,
      MAX_WIDTH: 40,
      MIN_HEIGHT: 30,
      MAX_HEIGHT: 80,  // Tinggi maks dikurangi
      MIN_GAP: 150,
      MAX_GAP: 220,
    },
    CLOUD: {
      WIDTH: 30,
      HEIGHT: 15,
      SPEED: 1,
    },
    SPEED: 4,
    GROUND_HEIGHT: 20,
    SKYLINE_HEIGHT: 100,
  };

  // Spider-Man state
  const spidermanRef = useRef({
    x: CONFIG.SPIDERMAN.START_X,
    y: 0,
    yVelocity: 0,
    jumping: false,
    animationFrame: 0, // Frame animasi lari (0-3)
    armFrame: 0,       // Frame animasi tangan (0-1)
    legFrame: 0,       // Frame animasi kaki (0-1)
    animationTimer: 0,
    isWebShooting: false,
    webTarget: null,
  });

  // Buildings
  const buildingsRef = useRef([
    { x: 300, width: 35, height: 65, windows: [] },
    { x: 550, width: 45, height: 55, windows: [] },
    { x: 800, width: 30, height: 75, windows: [] },
    { x: 1100, width: 40, height: 60, windows: [] },
  ]);

  // Clouds
  const cloudsRef = useRef([
    { x: 200, y: 40, size: 1 },
    { x: 450, y: 60, size: 0.8 },
    { x: 700, y: 30, size: 1.2 },
  ]);

  // Ground and street
  const groundRef = useRef({ x: 0 });

  const gameRef = useRef({
    speed: CONFIG.SPEED,
    frameCount: 0,
    score: 0,
    lastJumpTime: 0,
    difficulty: 1,
  });

  // === DRAW SPIDER-MAN (RUNNING ANIMATION IMPROVED) ===
  const drawSpiderman = (ctx, groundY) => {
    const spidey = spidermanRef.current;
    const x = spidey.x;
    const y = groundY - CONFIG.SPIDERMAN.HEIGHT - spidey.y;

    // Color palette
    const RED = "#ef4444";
    const BLUE = "#3b82f6";
    const BLACK = "#000000";
    const WHITE = "#ffffff";
    const WEB_COLOR = "#d1d5db";
    const SILVER = "#cbd5e1";

    // === SMOOTH RUNNING ANIMATION ===
    const runCycle = spidey.animationFrame % 4;

    // Body (always visible)
    ctx.fillStyle = RED;
    ctx.fillRect(x + 4, y + 10, 16, 14);

    // Head
    ctx.fillRect(x + 6, y + 2, 12, 10);

    // Eyes - animated (squint when running fast)
    ctx.fillStyle = WHITE;
    if (runCycle === 0 || runCycle === 2) {
      // Normal eyes
      ctx.fillRect(x + 8, y + 4, 3, 4);
      ctx.fillRect(x + 13, y + 4, 3, 4);
      ctx.fillStyle = BLUE;
      ctx.fillRect(x + 8, y + 6, 3, 2);
      ctx.fillRect(x + 13, y + 6, 3, 2);
    } else {
      // Squinted eyes (running fast)
      ctx.fillRect(x + 8, y + 5, 3, 2);
      ctx.fillRect(x + 13, y + 5, 3, 2);
      ctx.fillStyle = BLUE;
      ctx.fillRect(x + 8, y + 6, 3, 1);
      ctx.fillRect(x + 13, y + 6, 3, 1);
    }

    // Web pattern on head
    ctx.fillStyle = BLACK;
    ctx.fillRect(x + 8, y + 3, 1, 1);
    ctx.fillRect(x + 13, y + 3, 1, 1);
    ctx.fillRect(x + 9, y + 8, 6, 1); // Web line under eyes

    // === DYNAMIC ARMS ANIMATION ===
    ctx.fillStyle = RED;
    if (runCycle === 0) {
      // Frame 0: Arms back
      ctx.fillRect(x, y + 12, 4, 10);   // Left arm
      ctx.fillRect(x + 20, y + 14, 4, 8); // Right arm
    } else if (runCycle === 1) {
      // Frame 1: Arms mid
      ctx.fillRect(x + 2, y + 10, 4, 12);  // Left arm
      ctx.fillRect(x + 18, y + 12, 4, 10); // Right arm
    } else if (runCycle === 2) {
      // Frame 2: Arms forward
      ctx.fillRect(x + 4, y + 14, 4, 8);   // Left arm
      ctx.fillRect(x + 16, y + 10, 4, 12); // Right arm
    } else {
      // Frame 3: Arms mid (opposite)
      ctx.fillRect(x + 2, y + 12, 4, 10);  // Left arm
      ctx.fillRect(x + 18, y + 10, 4, 12); // Right arm
    }

    // Blue parts on arms (follow arm position)
    ctx.fillStyle = BLUE;
    if (runCycle === 0) {
      ctx.fillRect(x, y + 15, 4, 3);
      ctx.fillRect(x + 20, y + 17, 4, 3);
    } else if (runCycle === 1) {
      ctx.fillRect(x + 2, y + 13, 4, 3);
      ctx.fillRect(x + 18, y + 15, 4, 3);
    } else if (runCycle === 2) {
      ctx.fillRect(x + 4, y + 17, 4, 3);
      ctx.fillRect(x + 16, y + 13, 4, 3);
    } else {
      ctx.fillRect(x + 2, y + 15, 4, 3);
      ctx.fillRect(x + 18, y + 13, 4, 3);
    }

    // === DYNAMIC LEGS ANIMATION ===
    ctx.fillStyle = RED;
    if (runCycle === 0) {
      // Frame 0: Left leg back, right leg forward
      ctx.fillRect(x + 6, y + 24, 5, 8);   // Left leg
      ctx.fillRect(x + 13, y + 22, 5, 10); // Right leg
    } else if (runCycle === 1) {
      // Frame 1: Both legs mid
      ctx.fillRect(x + 7, y + 23, 5, 9);   // Left leg
      ctx.fillRect(x + 12, y + 23, 5, 9);  // Right leg
    } else if (runCycle === 2) {
      // Frame 2: Left leg forward, right leg back
      ctx.fillRect(x + 6, y + 22, 5, 10);  // Left leg
      ctx.fillRect(x + 13, y + 24, 5, 8);  // Right leg
    } else {
      // Frame 3: Both legs mid (opposite)
      ctx.fillRect(x + 7, y + 23, 5, 9);   // Left leg
      ctx.fillRect(x + 12, y + 23, 5, 9);  // Right leg
    }

    // Feet
    ctx.fillStyle = BLUE;
    if (runCycle === 0) {
      ctx.fillRect(x + 6, y + 32, 5, 2);   // Left foot
      ctx.fillRect(x + 13, y + 32, 5, 2);  // Right foot
    } else if (runCycle === 1) {
      ctx.fillRect(x + 7, y + 32, 5, 2);   // Left foot
      ctx.fillRect(x + 12, y + 32, 5, 2);  // Right foot
    } else if (runCycle === 2) {
      ctx.fillRect(x + 6, y + 32, 5, 2);   // Left foot
      ctx.fillRect(x + 13, y + 32, 5, 2);  // Right foot
    } else {
      ctx.fillRect(x + 7, y + 32, 5, 2);   // Left foot
      ctx.fillRect(x + 12, y + 32, 5, 2);  // Right foot
    }

    // === JUMPING ANIMATION ===
    if (spidey.jumping) {
      // Modify pose for jumping while maintaining running motion
      ctx.fillStyle = RED;

      // Jumping arms (up and out)
      ctx.fillRect(x + 2, y + 8, 4, 12);   // Left arm
      ctx.fillRect(x + 18, y + 8, 4, 12);  // Right arm

      // Jumping legs (together)
      ctx.fillRect(x + 8, y + 24, 8, 8);

      // Web shooters visible during jump
      ctx.fillStyle = SILVER;
      ctx.fillRect(x, y + 10, 2, 3);
      ctx.fillRect(x + 22, y + 10, 2, 3);

      // Web line when shooting web
      if (spidey.isWebShooting && spidey.webTarget) {
        ctx.strokeStyle = WEB_COLOR;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(x + 11, y + 6); // From chest
        ctx.lineTo(spidey.webTarget.x, spidey.webTarget.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Web impact effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(spidey.webTarget.x, spidey.webTarget.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Spider symbol on chest (always visible)
    ctx.fillStyle = BLACK;
    // Vertical line
    ctx.fillRect(x + 11, y + 14, 2, 6);
    // Horizontal line
    ctx.fillRect(x + 9, y + 17, 6, 1);
    // Top left leg
    ctx.fillRect(x + 8, y + 15, 1, 1);
    // Top right leg
    ctx.fillRect(x + 15, y + 15, 1, 1);
    // Bottom left leg
    ctx.fillRect(x + 8, y + 19, 1, 1);
    // Bottom right leg
    ctx.fillRect(x + 15, y + 19, 1, 1);
  };

  // === DRAW BUILDINGS ===
  const drawBuilding = (ctx, building, groundY) => {
    const x = building.x;
    const baseY = groundY - building.height;

    // Building color (different shades)
    const buildingColor = building.height > 70 ? "#4b5563" :
      building.height > 60 ? "#6b7280" : "#9ca3af";

    // Main building
    ctx.fillStyle = buildingColor;
    ctx.fillRect(x, baseY, building.width, building.height);

    // Building outline
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, baseY, building.width, building.height);

    // Roof details
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(x - 1, baseY - 2, building.width + 2, 2);

    // Windows
    building.windows.forEach(window => {
      ctx.fillStyle = window.lit ? "#fbbf24" : "#374151";
      ctx.fillRect(x + window.x, baseY + window.y, 4, 6);

      // Window reflection
      if (window.lit && Math.random() > 0.7) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(x + window.x + 1, baseY + window.y + 1, 2, 1);
      }
    });

    // Door at bottom
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(x + building.width / 2 - 4, groundY - 10, 8, 10);

    // Door handle
    ctx.fillStyle = "#d1d5db";
    ctx.fillRect(x + building.width / 2 + 1, groundY - 6, 1, 1);

    // Fire escape (for some buildings)
    if (building.height > 60 && building.width > 30) {
      ctx.fillStyle = "#6b7280";
      // Vertical ladder
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(x + building.width + 2, baseY + 15 + i * 12, 2, 8);
      }
      // Platforms
      ctx.fillRect(x + building.width, baseY + 20, 4, 2);
      ctx.fillRect(x + building.width, baseY + 32, 4, 2);
      ctx.fillRect(x + building.width, baseY + 44, 4, 2);
    }
  };

  // === DRAW CLOUDS ===
  const drawCloud = (ctx, cloud) => {
    const x = cloud.x;
    const y = cloud.y;
    const size = cloud.size;

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";

    // Simple cloud shape (3 circles)
    ctx.beginPath();
    ctx.arc(x, y, 5 * size, 0, Math.PI * 2);
    ctx.arc(x - 7 * size, y, 4 * size, 0, Math.PI * 2);
    ctx.arc(x + 7 * size, y, 4 * size, 0, Math.PI * 2);
    ctx.fill();
  };

  // === DRAW CITY STREET ===
  const drawStreet = (ctx, canvas, groundY) => {
    const ground = groundRef.current;

    // Street surface (asphalt)
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, groundY, canvas.width, CONFIG.GROUND_HEIGHT);

    // Street texture
    ctx.fillStyle = "#374151";
    for (let i = 0; i < canvas.width; i += 8) {
      ctx.fillRect(i, groundY, 1, 1);
      ctx.fillRect(i + 4, groundY + 3, 1, 1);
    }

    // Street lines (animated)
    ctx.fillStyle = "#fbbf24";
    const lineWidth = 25;
    ground.x -= gameRef.current.speed * 1.8;

    for (let i = Math.floor(ground.x); i < canvas.width; i += lineWidth * 3) {
      // Main line
      ctx.fillRect(i, groundY + 8, lineWidth, 4);
      // Reflection effect
      ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
      ctx.fillRect(i, groundY + 9, lineWidth, 1);
      ctx.fillStyle = "#fbbf24";
    }

    if (ground.x <= -lineWidth * 3) {
      ground.x = 0;
    }

    // Sidewalk
    ctx.fillStyle = "#6b7280";
    ctx.fillRect(0, groundY - 4, canvas.width, 4);

    // Sidewalk lines
    ctx.fillStyle = "#9ca3af";
    for (let i = 10; i < canvas.width; i += 40) {
      ctx.fillRect(i, groundY - 4, 20, 1);
    }

    // Street details (manholes, etc.)
    ctx.fillStyle = "#4b5563";
    for (let i = 30; i < canvas.width; i += 80) {
      // Manhole cover
      ctx.beginPath();
      ctx.arc(i, groundY + 10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Grate pattern
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(i - 4, groundY + 8, 8, 1);
      ctx.fillRect(i - 1, groundY + 6, 2, 5);
      ctx.fillStyle = "#4b5563";
    }
  };

  // === DRAW MOON ===
  const drawMoon = (ctx, canvas) => {
    const x = canvas.width - 50;
    const y = 35;

    // Moon glow
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Moon
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Craters
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.beginPath();
    ctx.arc(x - 4, y - 3, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 5, y + 3, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + 1, y - 5, 1.5, 0, Math.PI * 2);
    ctx.fill();
  };

  // Check if Spider-Man needs to jump
  const checkForJump = (spidey, buildings) => {
    for (const building of buildings) {
      const distance = building.x - spidey.x;
      // If building is close and Spider-Man is on ground
      if (distance > 0 && distance < 180 && !spidey.jumping && spidey.y === 0) {
        return {
          shouldJump: true,
          buildingHeight: building.height,
          buildingX: building.x,
        };
      }
    }
    return { shouldJump: false };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let groundY = 0;

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      groundY = canvas.height - CONFIG.GROUND_HEIGHT;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const animate = () => {
      const spidey = spidermanRef.current;
      const buildings = buildingsRef.current;
      const clouds = cloudsRef.current;
      const game = gameRef.current;

      // Clear with night sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(0.8, '#334155');
      gradient.addColorStop(1, '#475569');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw moon
      drawMoon(ctx, canvas);

      // Draw clouds
      clouds.forEach(cloud => {
        cloud.x -= CONFIG.CLOUD.SPEED * cloud.size * 0.7;
        if (cloud.x < -50) {
          cloud.x = canvas.width + 50;
          cloud.y = 20 + Math.random() * 40;
          cloud.size = 0.6 + Math.random() * 0.8;
        }
        drawCloud(ctx, cloud);
      });

      // Draw street
      drawStreet(ctx, canvas, groundY);

      // Update Spider-Man animation
      spidey.animationTimer++;

      // Smooth running animation (4 frames cycle)
      if (spidey.animationTimer > 3) {
        spidey.animationTimer = 0;
        spidey.animationFrame = (spidey.animationFrame + 1) % 4;
      }

      // Update Spider-Man physics
      if (spidey.jumping) {
        spidey.y += spidey.yVelocity;
        spidey.yVelocity -= CONFIG.SPIDERMAN.GRAVITY;

        // Shoot web at peak of jump for tall buildings
        if (spidey.yVelocity < 0 && spidey.y > 20 && !spidey.isWebShooting) {
          buildings.forEach(building => {
            const distance = building.x - spidey.x;
            if (distance > -20 && distance < 100 && building.height > 65) {
              spidey.isWebShooting = true;
              spidey.webTarget = {
                x: building.x + building.width / 2,
                y: groundY - building.height + 15
              };
            }
          });
        }

        // Stop web shooting when landing
        if (spidey.y <= 0) {
          spidey.y = 0;
          spidey.jumping = false;
          spidey.isWebShooting = false;
          spidey.webTarget = null;
          spidey.yVelocity = 0;
        }
      }

      // Update buildings
      buildings.forEach((building, idx) => {
        building.x -= game.speed;

        // Random window light changes
        if (game.frameCount % 30 === 0 && Math.random() > 0.8) {
          building.windows.forEach(window => {
            if (Math.random() > 0.6) {
              window.lit = !window.lit;
            }
          });
        }

        // Reset building when off screen
        if (building.x < -100) {
          building.x = canvas.width + 150 + Math.random() * 200;
          building.width = CONFIG.BUILDING.MIN_WIDTH +
            Math.random() * (CONFIG.BUILDING.MAX_WIDTH - CONFIG.BUILDING.MIN_WIDTH);
          building.height = CONFIG.BUILDING.MIN_HEIGHT +
            Math.random() * (CONFIG.BUILDING.MAX_HEIGHT - CONFIG.BUILDING.MIN_HEIGHT);

          // Initialize windows
          building.windows = [];
          const windowRows = Math.floor(building.height / 12);
          const windowCols = Math.floor(building.width / 8);

          for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowCols; col++) {
              if (Math.random() > 0.4) {
                building.windows.push({
                  x: col * 8 + 4,
                  y: row * 12 + 6,
                  lit: Math.random() > 0.4,
                });
              }
            }
          }
        }

        drawBuilding(ctx, building, groundY);
      });

      // Auto jump over buildings
      const jumpCheck = checkForJump(spidey, buildings);
      if (jumpCheck.shouldJump && !spidey.jumping && spidey.y === 0) {
        spidey.jumping = true;
        spidey.isWebShooting = false;

        // Adjust jump height based on building height
        if (jumpCheck.buildingHeight > 70) {
          spidey.yVelocity = CONFIG.SPIDERMAN.JUMP_VELOCITY * 1.4;
        } else if (jumpCheck.buildingHeight > 60) {
          spidey.yVelocity = CONFIG.SPIDERMAN.JUMP_VELOCITY * 1.2;
        } else {
          spidey.yVelocity = CONFIG.SPIDERMAN.JUMP_VELOCITY;
        }

        game.lastJumpTime = game.frameCount;
      }

      // Draw Spider-Man
      drawSpiderman(ctx, groundY);

      game.frameCount++;

      // Gradually increase speed
      if (game.frameCount % 400 === 0) {
        game.difficulty += 0.1;
        game.speed = CONFIG.SPEED * game.difficulty;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Decorative overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* City night glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-500/10 via-blue-500/10 to-transparent" />

        {/* Animated spider web lines in background */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px bg-gradient-to-b from-transparent via-gray-400/10 to-transparent"
            style={{ left: `${20 + i * 40}%` }}
            animate={{
              height: [20, 40, 20],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}

        {/* Glowing effects */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-red-500/5 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        {/* Street light glows */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 h-6 bg-gradient-to-t from-yellow-400/30 to-transparent rounded-t-full"
            style={{ left: `${15 + i * 25}%` }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Side building shadows */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900/60 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900/60 to-transparent" />

      {/* Bottom street overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent" />
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 h-full overflow-hidden">

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-900/5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                              linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10">
          <motion.div
          // className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg"
          // whileHover={{ rotate: 360, scale: 1.2 }}
          // transition={{ duration: 0.6 }}
          >
            {/* <span className="text-sm font-bold text-gray-400">0{index + 1}</span> */}
          </motion.div>

          <motion.div
            className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group-hover:shadow-xl mx-auto`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute -inset-2 rounded-2xl border border-current"
              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              style={{ borderColor: service.iconBorderColor || `var(--gradient-color-${index})` }}
            />

            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <service.icon className="w-10 h-10 text-white relative z-10" />

            {service.hasSparkle && (
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ scale: [0, 1, 0], rotate: [0, 360, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>

          <motion.h3
            className="text-2xl font-bold text-white mb-4 text-left"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundSize: '200% 200%',
              backgroundImage: `linear-gradient(to right, ${service.gradientColors?.join(', ') || '#60a5fa, #22d3ee'})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {service.title}
            <motion.div
              className="h-0.5 w-16 bg-gradient-to-r from-transparent via-current to-transparent mt-2 mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </motion.h3>

          <p className="text-gray-300 leading-relaxed mb-6 text-left">
            {service.description}
          </p>

          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center text-gray-300 group-hover:text-white transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                  animate={{
                    backgroundColor: service.gradientColors || ['#60a5fa', '#22d3ee', '#60a5fa'],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  style={{ background: `linear-gradient(to right, ${service.gradient})` }}
                />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            whileHover={{ scale: 1.2 }}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <ArrowRight className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              style={{ left: `${10 + i * 25}%`, top: '20%' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications with exceptional user experience and performance optimization.",
      features: ["iOS & Android", "Flutter Based", "Free Customize UI/UX Design", "Free Unlimited Revision", "Goals to appstore & playstore"],
      gradient: "from-blue-500 to-cyan-500",
      gradientColors: ["#3b82f6", "#06b6d4"],
      iconBorderColor: "#3b82f6"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern web applications with cutting-edge technologies, scalability, and security built-in for enterprise-level performance, static or even dynamic.",
      features: ["Javascript Framework-based", "Free Request Responsive UI/UX", "Free 6 Month Maintenance", "Real-time Features"],
      gradient: "from-purple-500 to-pink-500",
      gradientColors: ["#8b5cf6", "#ec4899"],
      iconBorderColor: "#8b5cf6"
    },
    {
      icon: Cpu,
      title: "AI Development",
      description: "Intelligent solutions powered by machine learning and artificial intelligence for business automation and data insights.",
      features: ["Handling ML, NLP, and Computer Vision", "Free Customize Your AI Needed", "Free 6 Months Maintenance", "Integrate AI Anywhere"],
      gradient: "from-emerald-500 to-teal-500",
      gradientColors: ["#10b981", "#14b8a6"],
      iconBorderColor: "#10b981"
    },
    {
      icon: Wifi,
      title: "IoT Development",
      description: "Connected device solutions with hardware integration and real-time data processing capabilities for smart environments.",
      features: ["Smart Sensors-Actuators", "Real-time Monitoring", "Cloud Integration", "Mobile and Web Control"],
      gradient: "from-orange-500 to-pink-500",
      gradientColors: ["#f97316", "#ef4444"],
      iconBorderColor: "#f97316"
    },
    {
      icon: Film,
      title: "Multimedia Production",
      description: "Complete multimedia solutions including video production, branding, and creative content for digital platforms.",
      features: ["Brand Video Production", "Branding Guideline", "Logo and Feed Post"],
      gradient: "from-violet-500 to-fuchsia-500",
      gradientColors: ["#8b5cf6", "#d946ef"],
      iconBorderColor: "#8b5cf6",
      hasSparkle: true
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden">
      <ChromeDinoAnimation />

      <div className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/10 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code className="w-5 h-5 text-cyan-400/50" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 flex items-center justify-center"
          animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles className="w-4 h-4 text-purple-400/50" />
        </motion.div>

        <motion.div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border border-purple-700/30 shadow-lg mb-8 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              />

              <Code className="w-5 h-5 text-purple-400 relative z-10" />
              <span className="text-sm font-semibold text-purple-200 relative z-10">Our Expertise</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>

              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  style={{ left: `${i * 25}%`, top: '50%' }}
                />
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

              Our <motion.span
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent relative inline-block"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Services
                <motion.span
                  className="absolute -top-4 -right-4 text-2xl"
                  animate={{ scale: [0, 1, 0], rotate: [0, 360, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative"
            >
              <motion.span
                className="relative inline-block"
                animate={{ color: ['#22d3ee', '#3b82f6', '#22d3ee'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Comprehensive
              </motion.span>{' '}
              technology solutions{' '}
              <span className="font-semibold text-cyan-400">tailored</span> to drive your business forward
              in the <span className="font-semibold text-purple-400">digital era</span>.
            </motion.p>

            <motion.div
              className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mt-6 relative overflow-hidden"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;