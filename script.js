// ===== Smooth Scrolling Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Modern Animations Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".navbar", { y: -100, opacity: 0, duration: 1.2 })
        .from(".profile-image-container", { scale: 0, opacity: 0, duration: 1 }, "-=0.8")
        .from(".availability-badge", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".home-title", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(".home-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".home-description", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".social-links-hero", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

    // Typing Effect Replacement
    initTypingEffect();

    // Initialize tsParticles (confetti floating effect)
    if (typeof confetti !== 'undefined') {
        initParticles();
    }
});

function initTypingEffect() {
    const typingTitle = document.querySelector('.typing-title');
    if (!typingTitle) return;

    const roles = ["Python Developer", "Data Analyst", "ML Engineer", "Freelance Designer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingTitle.textContent = "I'm a " + currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTitle.textContent = "I'm a " + currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target === 100 ? '%' : '+');
        }
    }

    updateCounter();
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [10, 5, 100]; // Adjust these values as needed
                setTimeout(() => {
                    animateCounter(stat, targets[index], 2000);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===== Particles Logic =====
function initParticles() {
    const duration = 3 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 1500); // Slower interval for subtle effect
}

// ===== Add Gradient Animation to Profile Image =====
// Gradient Animation Removed

// ===== Freelance File Toggle =====
const viewFilesBtn = document.getElementById('view-files-btn');
const fileListContainer = document.querySelector('.file-list-container');

if (viewFilesBtn && fileListContainer) {
    viewFilesBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent jump if it's an anchor, though it's a button
        fileListContainer.classList.toggle('active');
        const isActive = fileListContainer.classList.contains('active');

        // Update button text/icon
        if (isActive) {
            viewFilesBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Documents';
        } else {
            viewFilesBtn.innerHTML = '<i class="fas fa-eye"></i> View Documents';
        }
    });
}

console.log('Portfolio initialized successfully! 🚀');
