// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Default to dark theme (no localStorage)
    let currentTheme = 'dark';
    
    // Apply the default theme
    body.removeAttribute('data-theme');
    themeIcon.className = 'fas fa-moon';
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const isLight = body.getAttribute('data-theme') === 'light';
        
        if (isLight) {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            currentTheme = 'dark';
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            currentTheme = 'light';
        }
        
        // Add a little animation to the button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
});

// Sakura Animation
function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const sakura = document.createElement('div');
    sakura.className = 'sakura';
    
    // Random horizontal position
    sakura.style.left = Math.random() * 100 + '%';
    
    // Random animation duration between 8-15 seconds
    const duration = Math.random() * 7 + 8;
    sakura.style.animationDuration = duration + 's';
    
    // Random delay before starting
    const delay = Math.random() * 5;
    sakura.style.animationDelay = delay + 's';
    
    // Add some horizontal drift
    const drift = (Math.random() - 0.5) * 100;
    sakura.style.setProperty('--drift', drift + 'px');
    
    sakuraContainer.appendChild(sakura);
    
    // Remove sakura after animation completes
    setTimeout(() => {
        if (sakura.parentNode) {
            sakura.parentNode.removeChild(sakura);
        }
    }, (duration + delay) * 1000);
}

// Create sakura petals at intervals
function startSakuraAnimation() {
    setInterval(createSakura, 2000); // Create new sakura every 2 seconds
    
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createSakura, i * 400);
    }
}

// Start sakura animation when page loads
document.addEventListener('DOMContentLoaded', startSakuraAnimation);

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .tech-category, .contact-item, .coming-soon');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .project-card,
    .tech-category,
    .contact-item,
    .coming-soon {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .project-card.animate-in,
    .tech-category.animate-in,
    .contact-item.animate-in,
    .coming-soon.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .sakura {
        animation: sakura-fall var(--duration, 10s) linear infinite;
    }
    
    @keyframes sakura-fall {
        0% {
            transform: translateY(-100vh) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Add hover effects for tech items
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
});

// Project card tilt effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
});

// Social links animation
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroDescription = document.querySelector('.hero-description p');
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after hero animations
        setTimeout(typeWriter, 2000);
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const sakuraLoader = document.createElement('div');
    sakuraLoader.innerHTML = '🌸';
    sakuraLoader.style.cssText = `
        font-size: 4rem;
        animation: spin 2s linear infinite;
    `;
    
    loader.appendChild(sakuraLoader);
    document.body.appendChild(loader);
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
});

// Console Easter Egg
console.log(`
🌸 Welcome to Kaivalya's Portfolio! 🌸
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for checking out the console!
Feel free to explore the code and reach out if you have any questions.

Connect with me:
📧 vaidyakaivalya77@gmail.com
🔗 https://linkedin.com/in/kaivalya-vaidya/
📷 https://instagram.com/zephyrsofpoetry
🐙 https://github.com/kayvour

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Performance optimization: Lazy load images if any are added later
const observerLazy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observerLazy.unobserve(img);
        }
    });
});

// Apply to any future lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
    observerLazy.observe(img);
});

// Tech badge hover effects
document.addEventListener('DOMContentLoaded', function() {
    const techBadges = document.querySelectorAll('.tech-badge-img');
    
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
            this.style.filter = 'brightness(1.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.filter = 'brightness(1)';
        });
    });
});

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Add floating animation to social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.2}s`;
        link.classList.add('floating');
    });
});

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatingStyle);
