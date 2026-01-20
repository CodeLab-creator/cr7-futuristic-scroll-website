/* =====================================================
   CR7 FUTURISTIC 3D WEBSITE - JAVASCRIPT
   Scroll animations, 3D effects, parallax, and interactions
   ===================================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initParticles();
    initScrollProgress();
    initScrollAnimations();
    initHero3DTilt();
    initPowerSection();
    initLegacySection();
    initFinalSection();
    initNavigation();
    initCountUp();
    initAudioToggle();
    initSmoothScroll();
});

/* =====================================================
   PRELOADER
   ===================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverables = document.querySelectorAll('a, button, .nav-link, .social-icon');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* =====================================================
   PARTICLES
   ===================================================== */
function initParticles() {
    // Hero particles
    const heroParticles = document.getElementById('particles-hero');
    if (heroParticles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            heroParticles.appendChild(particle);
        }
    }

    // Energy lines for power section
    const energyLines = document.getElementById('energy-lines');
    if (energyLines) {
        for (let i = 0; i < 8; i++) {
            const line = document.createElement('div');
            line.className = 'energy-line';
            line.style.top = (Math.random() * 100) + '%';
            line.style.animationDelay = (Math.random() * 2) + 's';
            line.style.width = (Math.random() * 200 + 100) + 'px';
            energyLines.appendChild(line);
        }
    }

    // Dust particles for legacy section
    const dustParticles = document.getElementById('dust-particles');
    if (dustParticles) {
        for (let i = 0; i < 30; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust';
            dust.style.left = Math.random() * 100 + '%';
            dust.style.top = Math.random() * 100 + '%';
            dust.style.animationDelay = Math.random() * 10 + 's';
            dust.style.animationDuration = (Math.random() * 5 + 8) + 's';
            dustParticles.appendChild(dust);
        }
    }
}

/* =====================================================
   SCROLL PROGRESS
   ===================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

/* =====================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ===================================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger specific animations
                if (entry.target.id === 'power-image-wrapper') {
                    animatePowerMeter();
                    animateAttributes();
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.power-image-wrapper, .power-word, .legacy-image-wrapper, ' +
        '.timeline-item, .final-image, .final-reveal, .golden-glow'
    );

    animatedElements.forEach(el => observer.observe(el));
}

/* =====================================================
   HERO 3D TILT EFFECT
   ===================================================== */
function initHero3DTilt() {
    const container = document.getElementById('hero-image-container');
    const image = document.getElementById('hero-image');

    if (!container || !image) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        targetRotateY = (mouseX / (rect.width / 2)) * 15;
        targetRotateX = -(mouseY / (rect.height / 2)) * 15;
    });

    container.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
    });

    function animateTilt() {
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;

        image.style.transform = `
            perspective(1000px)
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY}deg)
            translateZ(30px)
        `;

        requestAnimationFrame(animateTilt);
    }
    animateTilt();
}

/* =====================================================
   POWER SECTION PARALLAX
   ===================================================== */
function initPowerSection() {
    const powerSection = document.getElementById('power');
    const powerImage = document.getElementById('power-image');
    const powerImageWrapper = document.getElementById('power-image-wrapper');

    if (!powerSection || !powerImage) return;

    window.addEventListener('scroll', () => {
        const rect = powerSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
            const scrollProgress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
            const parallaxY = (scrollProgress - 0.5) * 50;
            const parallaxX = (scrollProgress - 0.5) * 20;

            powerImage.style.transform = `translate(${parallaxX}px, ${parallaxY}px) scale(1.05)`;

            // Add visible class
            if (scrollProgress > 0.2) {
                powerImageWrapper.classList.add('visible');
            }
        }
    });

    // Animate power words on scroll
    const powerWords = document.querySelectorAll('.power-word');
    const powerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.5 });

    powerWords.forEach(word => powerObserver.observe(word));
}

function animatePowerMeter() {
    const meterFill = document.getElementById('power-meter-fill');
    if (meterFill && !meterFill.classList.contains('animate')) {
        setTimeout(() => {
            meterFill.classList.add('animate');
        }, 500);
    }
}

function animateAttributes() {
    const attrFills = document.querySelectorAll('.attr-fill');
    attrFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.classList.add('animate');
        }, 800 + (index * 200));
    });
}

/* =====================================================
   LEGACY SECTION CINEMATIC ZOOM
   ===================================================== */
function initLegacySection() {
    const legacySection = document.getElementById('legacy');
    const legacyImage = document.getElementById('legacy-image');
    const legacyWrapper = document.getElementById('legacy-image-wrapper');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!legacySection || !legacyImage) return;

    window.addEventListener('scroll', () => {
        const rect = legacySection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
            const scrollProgress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);

            // Slow cinematic zoom
            const scale = 1 + (scrollProgress * 0.15);
            legacyImage.style.transform = `scale(${scale})`;

            // Add visible class
            if (scrollProgress > 0.2) {
                legacyWrapper.classList.add('visible');
            }
        }
    });

    // Timeline items animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const itemIndex = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, itemIndex * 200);
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

/* =====================================================
   FINAL SECTION REVEAL
   ===================================================== */
function initFinalSection() {
    const finalSection = document.getElementById('final');
    const finalImage = document.getElementById('final-image');
    const finalReveal = document.querySelector('.final-reveal');
    const goldenGlow = document.querySelector('.golden-glow');

    if (!finalSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    if (finalImage) finalImage.classList.add('visible');
                }, 300);

                setTimeout(() => {
                    if (goldenGlow) goldenGlow.classList.add('visible');
                }, 600);

                setTimeout(() => {
                    if (finalReveal) finalReveal.classList.add('visible');
                }, 900);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(finalSection);

    // Parallax on scroll
    window.addEventListener('scroll', () => {
        const rect = finalSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollProgress = 1 - (rect.top / window.innerHeight);
            if (finalImage) {
                finalImage.style.transform = `scale(${1 + scrollProgress * 0.1})`;
            }
        }
    });
}

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Hide/show nav on scroll
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    nav.classList.add('hidden');
                } else {
                    nav.classList.remove('hidden');
                }
                lastScrollY = window.scrollY;

                // Update active nav link
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === current) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* =====================================================
   COUNT UP ANIMATION
   ===================================================== */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-value'));
                animateValue(target, 0, endValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

function animateValue(element, start, end, duration) {
    const startTimestamp = performance.now();

    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current + (end > 100 ? '+' : '');

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

/* =====================================================
   AUDIO TOGGLE
   ===================================================== */
function initAudioToggle() {
    const audioToggle = document.getElementById('audio-toggle');

    if (!audioToggle) return;

    let isMuted = true;

    audioToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        audioToggle.classList.toggle('muted', isMuted);

        // Here you could add actual audio functionality
        // For example: backgroundAudio.muted = isMuted;
    });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =====================================================
   PERFORMANCE OPTIMIZATIONS
   ===================================================== */
// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent values here
}, 250));

/* =====================================================
   TOUCH SUPPORT FOR MOBILE
   ===================================================== */
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Disable custom cursor on touch devices
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
}

/* =====================================================
   GSAP-LIKE EASING FUNCTIONS
   ===================================================== */
const Easing = {
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
};

console.log('⚽ CR7 - GOAT MODE ACTIVATED ⚽');
console.log('🏆 Built with passion for the greatest of all time 🏆');
