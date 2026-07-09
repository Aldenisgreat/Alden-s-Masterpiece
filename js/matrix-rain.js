// Binary Rain Effect - Green matrix-style 0s and 1s
(function() {
  'use strict';

  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Pure binary characters
  const chars = '01';
  const charArray = chars.split('');

  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  // Re-init on resize
  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  function draw() {
    // Semi-transparent black for fade trail
    ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      // Random binary character
      const char = charArray[Math.floor(Math.random() * 2)];

      // Head of the rain is brighter green, trail fades
      const isHead = Math.random() > 0.95;
      const brightness = isHead ? 1 : 0.5 + Math.random() * 0.5;

      // Bright green matrix color
      const g = Math.floor(200 + Math.random() * 55); // 200-255
      ctx.fillStyle = `rgba(0, ${g}, 50, ${brightness})`;

      // Draw character
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      // Reset drop randomly when it reaches bottom
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // Frame rate - subtle but visible
  setInterval(draw, 80);
})();
