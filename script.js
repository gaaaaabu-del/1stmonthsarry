// Generic function to navigate with an exit animation
function navigateTo(url) {
  document.body.classList.add('page-exit');
  setTimeout(() => {
    window.location.href = url;
  }, 250);
}

// Fixed quiz question handler
function checkQuestion(correctValue, nextPageUrl) {
  const selected = document.querySelector('input[name="answer"]:checked');
  const errorMsg = document.getElementById('error-msg');

  if (!selected) {
    if (errorMsg) errorMsg.textContent = "choose one first ✦";
    return;
  }

  if (selected.value === correctValue) {
    navigateTo(nextPageUrl);
  } else {
    if (errorMsg) errorMsg.textContent = "not quite — try again ♡";
  }
}

// 1. COLLAGE PAGE: Classic Vibrant Party Blast (Circles & Stars)
function triggerCollageCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff52b4', '#9d4edf', '#e0aaff', '#ffffff'],
      shapes: ['star', 'circle'],
      scalar: 1.2
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff52b4', '#9d4edf', '#ffffff']
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff52b4', '#e0aaff', '#ffffff']
      });
    }, 400);
  }
}

// 2. LOVE LETTER PAGE: Floating Heart Emoji Rain
function triggerLetterHeartRain() {
  const heartEmojis = ['💖', '💗', '💕', '💜', '🖤', '✨'];
  
  // Generate 25 floating heart elements
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Random styling & position
    heart.style.position = 'fixed';
    heart.style.top = '-50px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 18) + 'px';
    heart.style.zIndex = '9999';
    heart.style.pointerEvents = 'none';
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Falling animation
    const duration = Math.random() * 3 + 3; // 3 to 6 seconds
    const delay = Math.random() * 2; // Stagger start time
    
    heart.style.transition = `transform ${duration}s linear ${delay}s, opacity ${duration}s ease-out ${delay}s`;
    
    document.body.appendChild(heart);

    // Trigger movement
    setTimeout(() => {
      const horizontalDrift = (Math.random() - 0.5) * 100;
      heart.style.transform = `translate(${horizontalDrift}px, 105vh) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = '0';
    }, 50);

    // Clean up DOM after animation completes
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }
}

// Page detection listener
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.toLowerCase();

  if (currentPath.endsWith('collage.html')) {
    triggerCollageCelebration();
  } else if (currentPath.endsWith('letter.html')) {
    triggerLetterHeartRain();
  }

  // Intercept <a> links for smooth exit transitions
  const links = document.querySelectorAll('.primary-button, .secondary-button');
  links.forEach(link => {
    if (link.tagName === 'A') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        if (targetUrl) navigateTo(targetUrl);
      });
    }
  });
});