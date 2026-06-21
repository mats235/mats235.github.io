/* ========================================
   MAIN PORTFOLIO SCRIPT
   ======================================== */

// Typing Animation
const typingTexts = [
    'Machine Learning Engineer',
    'Deep Learning Developer',
    'Computer Vision Engineer',
    'LLM Developer',
    'AI Researcher',
    'Federated Learning Expert'
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deleteDelay = 50;

function typeText() {
    const typingElement = document.getElementById('typingText');
    const currentText = typingTexts[typingIndex];

    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);
        typingDelay = deleteDelay;

        if (charIndex === 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingTexts.length;
            typingDelay = 500;
        }
    } else {
        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);
        typingDelay = 100;

        if (charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 2000;
        }
    }

    setTimeout(typeText, typingDelay);
}

// Particle Animation
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = Math.random() > 0.5 ? 
            'rgba(0, 212, 255, ' + Math.random() * 0.5 + ')' : 
            'rgba(124, 58, 237, ' + Math.random() * 0.5 + ')';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
    }

    // Add CSS animation for floating
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translate(0, 0);
                    opacity: 0.5;
                }
                25% { 
                    transform: translate(20px, -20px);
                }
                50% { 
                    transform: translate(-10px, -30px);
                    opacity: 0.8;
                }
                75% { 
                    transform: translate(-20px, -10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll Reveal Animation
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });

    const cards = document.querySelectorAll('.edu-card, .project-card, .skill-category, .achievement-card, .timeline-item');
    cards.forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scroll Offset for Fixed Navbar
function setupSmoothScroll() {
    const navHeight = 70;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = '✓ Message Received!';
            submitButton.style.opacity = '0.6';
            submitButton.disabled = true;
            
            // Reset form
            form.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
            }, 3000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navbar Background on Scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        }
    });
}

// Mouse Move Parallax Effect
function setupParallaxEffect() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (!heroVisual) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        heroVisual.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Active Nav Link on Scroll
function setupActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (navLink) {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.style.color = 'var(--text-primary)');
                    navLink.style.color = 'var(--primary-color)';
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Button Ripple Effect
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            ripple.animate([
                { width: '0px', height: '0px', opacity: 1 },
                { width: '300px', height: '300px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => ripple.remove();
        });
    });
}

// Initialize all features
function init() {
    typeText();
    createParticles();
    setupScrollReveal();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupNavbarScroll();
    setupParallaxEffect();
    setupActiveNavLink();
    setupButtonEffects();
    
    // Handle window resize for particles
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            location.reload();
        }, 500);
    });
}

// Start on DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Performance: Optimize scroll events
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
}, { passive: true });

// Add loading optimization
window.addEventListener('load', () => {
    // Preload critical images/styles if needed
    document.body.classList.add('loaded');
});
