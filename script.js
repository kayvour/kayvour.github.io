// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference, default to dark
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
        
        // Simple button animation
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 100);
    });
});

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

// Simple fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
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

// Add simple CSS for fade-in animations
const style = document.createElement('style');
style.textContent = `
    .project-card,
    .tech-category,
    .contact-item,
    .coming-soon {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .project-card.fade-in,
    .tech-category.fade-in,
    .contact-item.fade-in,
    .coming-soon.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Simple hover effects */
    .project-card:hover {
        transform: translateY(-5px);
    }
    
    .contact-item:hover {
        transform: translateY(-3px);
    }
    
    .tech-category:hover {
        transform: translateY(-3px);
    }
    
    /* Cat animations */
    .cat-companion {
        animation: gentle-sway 3s ease-in-out infinite;
    }
    
    @keyframes gentle-sway {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(2deg); }
    }
    
    .floating-cat {
        animation: cat-float 4s ease-in-out infinite;
    }
    
    @keyframes cat-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .cat-helper {
        animation: cat-wiggle 2s ease-in-out infinite;
    }
    
    @keyframes cat-wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }
});

// Simple typing effect for hero description
document.addEventListener('DOMContentLoaded', function() {
    const heroDescription = document.querySelector('.hero-description p');
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        heroDescription.style.borderRight = '2px solid var(--accent-blue)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroDescription.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1500);
    }
});

// Simple hover effects for tech badges
document.addEventListener('DOMContentLoaded', function() {
    const techBadges = document.querySelectorAll('.tech-badge-img');
    
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add a floating cat in the corner
document.addEventListener('DOMContentLoaded', function() {
    const floatingCat = document.createElement('div');
    floatingCat.innerHTML = '🐱';
    floatingCat.className = 'floating-cat';
    floatingCat.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 2rem;
        z-index: 1000;
        cursor: pointer;
        transition: transform 0.3s ease;
        user-select: none;
    `;
    
    // Add click interaction
    floatingCat.addEventListener('click', function() {
        this.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        
        // Show a little message
        showCatMessage();
    });
    
    document.body.appendChild(floatingCat);
});

// Cat message function
function showCatMessage() {
    const messages = [
        "Meow! 🐾",
        "Purr... coding is fun! 💻",
        "Time for a cat break? ☕",
        "Paws-itively amazing work! ✨",
        "Meow-gical coding happening! 🎭",
        "*stretches and yawns* 😴"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: var(--secondary-bg);
        color: var(--text-primary);
        padding: 10px 15px;
        border-radius: 20px;
        border: 1px solid var(--accent-blue);
        font-size: 0.9rem;
        z-index: 1001;
        animation: fadeInOut 3s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Add fadeInOut animation
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        20%, 80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(messageStyle);

// Console message (simplified)
console.log(`
🐱 Welcome to Kaivalya's Portfolio! 🐱
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for checking out the console!
The cat is supervising the code quality! 

Connect with me:
📧 vaidyakaivalya77@gmail.com
🔗 LinkedIn: kaivalya-vaidya
📷 Instagram: @zephyrsofpoetry
🐙 GitHub: kayvour

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Simple loading screen (optional)
document.addEventListener('DOMContentLoaded', function() {
    // Only show loader if page takes time to load
    let hasLoaded = false;
    
    setTimeout(() => {
        if (!hasLoaded) {
            const loader = document.createElement('div');
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
                flex-direction: column;
                gap: 1rem;
            `;
            
            loader.innerHTML = `
                <div style="font-size: 3rem; animation: gentle-sway 1s ease-in-out infinite;">🐱</div>
                <div style="color: var(--text-secondary); font-family: 'Fira Code', monospace;">Loading...</div>
            `;
            
            document.body.appendChild(loader);
            
            // Remove after page loads
            window.addEventListener('load', function() {
                hasLoaded = true;
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.style.opacity = '0';
                        loader.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            loader.parentNode.removeChild(loader);
                        }, 500);
                    }
                }, 500);
            });
        }
    }, 100);
    
    // Set loaded flag if page loads quickly
    window.addEventListener('load', function() {
        hasLoaded = true;
    });
});

// Add simple social link hover effects
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
