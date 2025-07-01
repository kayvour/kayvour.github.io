// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference, default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
    
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
        
        // Save theme preference
        localStorage.setItem('theme', currentTheme);
        
        // Enhanced button animation
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
});

// Resume Download Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Create a temporary link to download the resume
            const link = document.createElement('a');
            link.href = 'assets/Kaivalya_Vaidya_Resume.pdf'; // Update this path to your resume
            link.download = 'Kaivalya_Vaidya_Resume.pdf';
            link.target = '_blank';
            
            // Fallback for browsers that don't support download attribute
            link.onclick = function() {
                setTimeout(() => {
                    window.open(link.href, '_blank');
                }, 100);
            };
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show download message
            showNotification('Resume download started! 📄', 'success');
        });
    }
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
                
                // Add active state to navigation
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for grid items
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .tech-category, .contact-item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    .project-card,
    .tech-category,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card.fade-in,
    .tech-category.fade-in,
    .contact-item.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Enhanced hover effects */
    .project-card {
        position: relative;
        overflow: hidden;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
        transition: left 0.8s ease;
    }
    
    .project-card:hover::before {
        left: 100%;
    }
    
    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .contact-item:hover {
        transform: translateY(-5px) scale(1.02);
    }
    
    .tech-category:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    /* Tech item hover effects */
    .tech-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .tech-item:hover {
        transform: translateY(-5px) scale(1.1);
        filter: brightness(1.2);
    }
    
    /* Floating animations */
    .floating-cat {
        animation: cat-float 6s ease-in-out infinite;
    }
    
    @keyframes cat-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(-2deg); }
        50% { transform: translateY(-10px) rotate(0deg); }
        75% { transform: translateY(-20px) rotate(2deg); }
    }
    
    .cat-helper {
        animation: cat-wiggle 3s ease-in-out infinite;
    }
    
    @keyframes cat-wiggle {
        0%, 100% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-8deg) scale(1.1); }
        50% { transform: rotate(0deg) scale(1.05); }
        75% { transform: rotate(8deg) scale(1.1); }
    }
    
    /* Navigation active state */
    .nav-links a.active {
        color: var(--accent-blue);
        position: relative;
    }
    
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-blue);
        border-radius: 2px;
    }
    
    /* Loading animation for tech badges */
    .tech-item img {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .tech-item img:hover {
        transform: scale(1.15) rotate(5deg);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    /* Notification styles */
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        z-index: 1002;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 300px;
    }
    
    .notification.success {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border-color: rgba(34, 197, 94, 0.3);
    }
    
    .notification.info {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border-color: rgba(59, 130, 246, 0.3);
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Enhanced navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.8)';
        navbar.style.boxShadow = 'none';
        if (document.body.getAttribute('data-theme') === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
    
    // Update active navigation based on scroll position
    updateActiveNavigation();
});

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Enhanced typing effect for hero description
document.addEventListener('DOMContentLoaded', function() {
    const heroDescription = document.querySelector('.hero-description p');
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        heroDescription.style.borderRight = '2px solid var(--accent-blue)';
        heroDescription.style.minHeight = '1.5em';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroDescription.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                // Blinking cursor effect
                let blinks = 0;
                const blinkCursor = () => {
                    if (blinks < 6) {
                        heroDescription.style.borderRight = 
                            heroDescription.style.borderRight === 'none' ? 
                            '2px solid var(--accent-blue)' : 'none';
                        blinks++;
                        setTimeout(blinkCursor, 500);
                    } else {
                        heroDescription.style.borderRight = 'none';
                    }
                };
                setTimeout(blinkCursor, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1500);
    }
});

// Enhanced floating cat with more interactions
document.addEventListener('DOMContentLoaded', function() {
    const floatingCat = document.createElement('div');
    floatingCat.innerHTML = '🐱';
    floatingCat.className = 'floating-cat';
    floatingCat.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 2.5rem;
        z-index: 1000;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    `;
    
    let clickCount = 0;
    
    // Enhanced click interaction
    floatingCat.addEventListener('click', function() {
        clickCount++;
        
        // Different animations based on click count
        if (clickCount % 5 === 0) {
            this.style.transform = 'scale(2) rotate(720deg)';
            this.innerHTML = '😸';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.innerHTML = '🐱';
            }, 1000);
        } else {
            this.style.transform = 'scale(1.3) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 400);
        }
        
        showCatMessage();
    });
    
    // Mouse enter/leave effects
    floatingCat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.filter = 'drop-shadow(0 6px 12px rgba(102, 126, 234, 0.4))';
    });
    
    floatingCat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
    });
    
    document.body.appendChild(floatingCat);
});

// Enhanced cat messages with more variety
function showCatMessage() {
    const messages = [
        "sudo feed-me 🐟",
        "I debug by walking on the keyboard.",
        "Time for a cat break? ☕",
        "Alt+Tab? I prefer Alt-Nap.",
        "Meow-gical coding happening! ✨",
        "*stretches and yawns* 😴",
        "Deploy purr-duction complete! 🚀",
        "Git commit -m \"meow\"",
        "404: Catnip not found 🌿",
        "Compiling... *sits on keyboard* 💻",
        "Stack overflow? More like snack overflow! 🍕",
        "Debugging in progress... 🐛",
        "React.createElement('cat', {mood: 'sleepy'})",
        "Console.log('purr'); 💭",
        "npm install cat-nap 😴"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = 'cat-message';
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: var(--text-primary);
        padding: 12px 18px;
        border-radius: 20px;
        border: 1px solid var(--glass-border);
        font-size: 0.9rem;
        z-index: 1001;
        animation: catMessageAnimation 4s ease-in-out;
        pointer-events: none;
        max-width: 250px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        font-family: 'Fira Code', monospace;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 4000);
}

// Enhanced CSS for cat message animation
const catMessageStyle = document.createElement('style');
catMessageStyle.textContent = `
    @keyframes catMessageAnimation {
        0% { opacity: 0; transform: translateY(30px) scale(0.8); }
        15%, 85% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
    }
`;
document.head.appendChild(catMessageStyle);

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Enhanced console message
console.log(`
🐱 Welcome to Kaivalya's Enhanced Portfolio! 🐱
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for checking out the console! The cat supervisor approves of your curiosity! 

🚀 Portfolio Features:
   • Smooth animations and transitions
   • Interactive floating cat companion
   • Dark/Light theme toggle
   • Responsive design
   • Resume download functionality

💻 Tech Stack Highlights:
   • Frontend: HTML5, CSS3, JavaScript, React
   • Backend: Python, Flask
   • Data Science: NumPy, Pandas, NLTK
   • Design: Figma, Canva

📫 Connect with me:
   📧 kaivalyavaidya.work@gmail.com
   🔗 LinkedIn: linkedin.com/in/kaivalya-vaidya
   📷 Instagram: @zephyrsofpoetry
   🐙 GitHub: github.com/kayvour
   🌐 Portfolio: kayvour.github.io

🎯 Pro tip: Click the floating cat in the corner for some coding wisdom! 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Social link enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.15)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Click animation
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.15)';
            }, 100);
        });
    });
});

// Project card enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2), 0 0 0 1px rgba(102, 126, 234, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('themeToggle').click();
        }
    }
    
    // Press 'R' to download resume
    if (e.key === 'r' || e.key === 'R') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('resumeBtn').click();
        }
    }
});

// Add keyboard shortcuts info to console
setTimeout(() => {
    console.log(`
🎹 Keyboard Shortcuts:
   • Press 'T' to toggle theme
   • Press 'R' to download resume
   • Use Tab to navigate through interactive elements
    `);
}, 2000);
