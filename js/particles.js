(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0;
  let height = 0;
  let mouse = { x: null, y: null };
  const colors = ['#6366F1', '#8B5CF6', '#06B6D4'];
  let linkColor = '#6366F1';
  let linkOpacity = 0.12;

  function readTheme() {
    const styles = getComputedStyle(document.documentElement);
    linkColor = styles.getPropertyValue('--color-particle-link').trim() || '#6366F1';
    const theme = document.documentElement.getAttribute('data-theme');
    linkOpacity = theme === 'light' ? 0.08 : 0.12;
    particles.forEach((p) => {
      p.opacity = theme === 'light' ? Math.random() * 0.25 + 0.1 : Math.random() * 0.35 + 0.15;
    });
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(80, Math.floor((width * height) / 18000));
    const theme = document.documentElement.getAttribute('data-theme');
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: theme === 'light' ? Math.random() * 0.25 + 0.1 : Math.random() * 0.35 + 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = linkColor;
          ctx.globalAlpha = linkOpacity * (1 - dist / 140);
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = linkColor;
          ctx.globalAlpha = linkOpacity * 1.6 * (1 - dist / 120);
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  readTheme();
  resize();
  createParticles();
  draw();

  document.addEventListener('themechange', readTheme);

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
})();
