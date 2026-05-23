document.addEventListener('DOMContentLoaded', function () {

  // ---- Scroll fade-in ----
  document.querySelectorAll('.fade-up').forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('fade-up'));
    el.style.transitionDelay = (siblings.indexOf(el) * 60) + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // ---- Resume ----
  document.querySelectorAll('.resume-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const inner = window.location.pathname.includes('/pages/');
      window.open((inner ? '../' : '') + 'assets/Kaivalya_Vaidya_Resume.pdf', '_blank');
    });
  });

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ---- Keyboard shortcuts ----
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea')) return;
    if (e.key === 'r' || e.key === 'R') { const b = document.querySelector('.resume-link'); if (b) b.click(); }
  });

  // ---- Cat ----
  const catEl = document.getElementById('floatingCat');
  const msgs = [
    'sudo feed-me 🐟','git commit -m "meow"','404: catnip not found',
    'npm install cat-nap',"console.log('purr')",'deploy purrduction complete',
    'Alt+Tab? i prefer Alt+Nap.','i debug by sitting on keyboard.',
    '*sits directly on your laptop*','segfault in treat dispenser','napping in O(1)'
  ];
  let clicks = 0;
  if (catEl) {
    catEl.addEventListener('click', () => {
      clicks++;
      if (clicks % 7 === 0) {
        catEl.style.transform = 'scale(2) rotate(720deg)';
        catEl.textContent = '😸';
        setTimeout(() => { catEl.style.transform = ''; catEl.textContent = '🐱'; }, 900);
      } else {
        catEl.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => { catEl.style.transform = ''; }, 250);
      }
      document.querySelectorAll('.cat-bubble').forEach(b => b.remove());
      const div = document.createElement('div');
      div.className = 'cat-bubble';
      div.textContent = msgs[Math.floor(Math.random() * msgs.length)];
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 4000);
    });
  }

  // ---- Star canvas (any page) ----
  // Looks for either #hero-canvas (home) or #page-canvas (other pages)
  const canvas = document.getElementById('page-canvas');
  if (canvas) { runStars(canvas); }

});

function runStars(canvas) {
  const ctx  = canvas.getContext('2d');
  const N    = 130;
  const PUSH = 115, RING = 230;
  const COLS = ['232,213,163','168,196,184','196,168,184'];
  let W, H, pts = [], mx = -999, my = -999;

  function Pt() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.hx = this.x; this.hy = this.y;
    this.vx = (Math.random()-0.5)*0.28; this.vy = (Math.random()-0.5)*0.28;
    const big = Math.random() < 0.11;
    this.r   = big ? Math.random()*2.2+1.4 : Math.random()*1.0+0.22;
    this.big = big;
    const c  = COLS[Math.floor(Math.random()*COLS.length)];
    this.col = c;
    this.fill = 'rgba('+c+','+(big ? Math.random()*0.65+0.3 : Math.random()*0.45+0.12)+')';
    this.sc  = 'rgba('+c+',';
  }

  function size() {
    // Always use viewport dimensions — canvas covers exactly the viewport
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    if (mx > -900) {
      const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      cg.addColorStop(0, 'rgba(232,213,163,0.08)');
      cg.addColorStop(0.5, 'rgba(168,196,184,0.03)');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(mx, my, 200, 0, 6.28);
      ctx.fillStyle = cg; ctx.fill();
    }

    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const dx = a.x - mx, dy = a.y - my, d = Math.hypot(dx, dy);
      if (d < PUSH && d > 0.5) {
        const f = (1-d/PUSH)*1.4; a.vx += (dx/d)*f; a.vy += (dy/d)*f;
      } else if (d < RING && d > PUSH) {
        const f = ((d-PUSH)/(RING-PUSH))*0.022; a.vx -= (dx/d)*f; a.vy -= (dy/d)*f;
      }
      a.vx += (a.hx-a.x)*0.0012; a.vy += (a.hy-a.y)*0.0012;
      a.vx *= 0.92; a.vy *= 0.92;
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0) { a.x = 0; a.vx *= -1; }
      if (a.x > W) { a.x = W; a.vx *= -1; }
      if (a.y < 0) { a.y = 0; a.vy *= -1; }
      if (a.y > H) { a.y = H; a.vy *= -1; }

      for (let j = i+1; j < pts.length; j++) {
        const b = pts[j], dd = Math.hypot(a.x-b.x, a.y-b.y);
        if (dd < 130) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = a.sc + ((1-dd/130)*0.12) + ')';
          ctx.lineWidth = a.big||b.big ? 0.8 : 0.5;
          ctx.stroke();
        }
      }
      if (a.big) {
        const g = ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,a.r*4);
        g.addColorStop(0,'rgba('+a.col+',0.14)');
        g.addColorStop(1,'rgba('+a.col+',0)');
        ctx.beginPath(); ctx.arc(a.x,a.y,a.r*4,0,6.28);
        ctx.fillStyle = g; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,6.28);
      ctx.fillStyle = a.fill; ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  // canvas is position:fixed covering viewport — mouse coords = raw clientX/Y
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  window.addEventListener('mouseleave', () => { mx=-999; my=-999; });
  window.addEventListener('resize', () => { size(); });

  function start() { size(); pts = Array.from({length:N}, () => new Pt()); tick(); }
  if (document.readyState === 'complete') { start(); }
  else { window.addEventListener('load', start); }
}

console.log('%c🐱 kayvour.github.io\n%c\ngithub   → github.com/kayvour\nlinkedin → linkedin.com/in/kaivalya-vaidya\nemail    → kaivalyavaidya.work@gmail.com',
  'color:#e8d5a3;font-size:1.2em;font-weight:500;',
  'color:#9a9a90;font-size:0.85em;');
  