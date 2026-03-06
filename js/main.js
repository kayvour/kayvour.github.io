document.addEventListener('DOMContentLoaded', function () {

        // ---- Scroll fade-in ----
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    // Group fade-up elements by parent so stagger resets per section
    const groups = new Map();
    document.querySelectorAll('.fade-up').forEach(el => {
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });
    groups.forEach((els, parent) => {
        els.forEach((el, i) => {
            el.style.transitionDelay = (i * 55) + 'ms';
        });
        // Observe the parent; when it enters view, reveal all children at once (staggered via delay)
        const parentIO = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    els.forEach(el => el.classList.add('visible'));
                    parentIO.unobserve(parent);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
        parentIO.observe(parent);
    });

    // ---- Reveal-text: observe and trigger ----
    const revealIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealIO.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-text').forEach(el => revealIO.observe(el));

    // ---- Hero name: slide-up words on load ----
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.querySelectorAll('.first, .last').forEach((el, i) => {
            el.style.display = 'block';
            el.style.overflow = 'hidden';
            const inner = document.createElement('span');
            inner.textContent = el.textContent;
            inner.style.cssText = [
                'display: block;',
                'transform: translateY(110%);',
                'opacity: 0;',
                'transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ' + (0.3 + i * 0.13) + 's, opacity 0.6s ease ' + (0.3 + i * 0.13) + 's;'
            ].join(' ');
            el.textContent = '';
            el.appendChild(inner);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                inner.style.transform = 'translateY(0)';
                inner.style.opacity = '1';
            }));
        });
    }

    // ---- Floating cat ----
    const catEl = document.getElementById('floatingCat');
    const catMessages = [
        'sudo feed-me 🐟',
        'git commit -m "meow"',
        '404: catnip not found 🌿',
        'npm install cat-nap',
        "console.log('purr') 💭",
        'deploy purrduction complete 🚀',
        'Alt+Tab? I prefer Alt+Nap.',
        'I debug by sitting on the keyboard.',
        '*sits directly on your laptop*',
        'segfault in the treat dispenser',
        'currently: napping in O(1)',
    ];

    let catClicks = 0;

    if (catEl) {
        catEl.addEventListener('click', () => {
            catClicks++;
            if (catClicks % 7 === 0) {
                catEl.style.transform = 'scale(2) rotate(720deg)';
                catEl.textContent = '😸';
                setTimeout(() => { catEl.style.transform = ''; catEl.textContent = '🐱'; }, 900);
            } else {
                catEl.style.transform = 'scale(1.3) rotate(15deg)';
                setTimeout(() => { catEl.style.transform = ''; }, 300);
            }
            showCatBubble();
        });
    }

    function showCatBubble() {
        document.querySelectorAll('.cat-bubble').forEach(b => b.remove());
        const msg = catMessages[Math.floor(Math.random() * catMessages.length)];
        const div = document.createElement('div');
        div.className = 'cat-bubble';
        div.textContent = msg;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    }

    // ---- Resume button ----
    document.querySelectorAll('#resumeBtn, .resume-link').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const isInner = window.location.pathname.includes('/pages/');
            window.open((isInner ? '../' : '') + 'assets/Kaivalya_Vaidya_Resume.pdf', '_blank');
        });
    });

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Keyboard shortcuts ----
    document.addEventListener('keydown', e => {
        if (e.target.matches('input,textarea')) return;
        if (e.key === 'r' || e.key === 'R') {
            const btn = document.querySelector('.resume-link, #resumeBtn');
            if (btn) btn.click();
        }
    });

});

// ---- Console easter egg ----
console.log('%c\uD83D\uDC31 kayvour.github.io\n%c\nMade with caffeine, poetry & way too many tabs open.\n\ngithub   \u2192 github.com/kayvour\nlinkedin \u2192 linkedin.com/in/kaivalya-vaidya\nemail    \u2192 kaivalyavaidya.work@gmail.com\npoetry   \u2192 @zephyrsofpoetry\n', 'color: #667eea; font-size: 1.4em; font-weight: bold;', 'color: #a0a0c0; font-size: 0.9em;');
