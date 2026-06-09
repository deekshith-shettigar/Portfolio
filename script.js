const SECTIONS = ['about', 'education', 'experience', 'projects', 'certifications', 'contact'];
let activeSection = null;

function isMobile() {
    return window.innerWidth <= 900;
}

function initMobile() {
    if (!isMobile()) {
        SECTIONS.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = '';
        });
        const homeEl = document.getElementById('home');
        if (homeEl) homeEl.style.display = '';
        return;
    }
    SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const homeEl = document.getElementById('home');
    if (homeEl) homeEl.style.display = '';
    activeSection = null;
}

function showSection(id) {
    if (!isMobile()) return;

    SECTIONS.forEach(sid => {
        const el = document.getElementById(sid);
        if (el) el.style.display = 'none';
    });
    const homeEl = document.getElementById('home');
    if (homeEl) homeEl.style.display = 'none';

    const target = document.getElementById(id);
    if (target) {
        target.style.display = '';
        activeSection = id;

        // Remove all animation classes so elements are immediately visible
        target.querySelectorAll('.animate-hidden, .animate-visible').forEach(el => {
            el.classList.remove('animate-hidden', 'animate-left', 'animate-right', 'animate-scale', 'animate-visible');
            el.classList.remove('stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5');
        });

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 80);
    }
}

function goBackHome() {
    SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const homeEl = document.getElementById('home');
    if (homeEl) homeEl.style.display = '';
    activeSection = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Nav menu toggle ──
function myMenuFunction() {
    const menuBtn = document.getElementById("myNavMenu");
    const navOpenIcon = document.getElementById("navOpenIcon");
    const navCloseIcon = document.getElementById("navCloseIcon");
    if (menuBtn.classList.contains("responsive")) {
        closeMenu();
    } else {
        menuBtn.classList.add("responsive");
        navOpenIcon.style.display = "none";
        navCloseIcon.style.display = "inline";
    }
}

function closeMenu() {
    const menuBtn = document.getElementById("myNavMenu");
    const navOpenIcon = document.getElementById("navOpenIcon");
    const navCloseIcon = document.getElementById("navCloseIcon");
    menuBtn.classList.remove("responsive");
    navOpenIcon.style.display = "inline";
    navCloseIcon.style.display = "none";
}

// ── Nav link clicks ──
document.querySelectorAll(".nav-link").forEach(function(link) {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (!href || !href.startsWith('#')) { closeMenu(); return; }
        const sectionId = href.replace('#', '');
        if (isMobile()) {
            e.preventDefault();
            closeMenu();
            if (sectionId === 'home') {
                goBackHome();
            } else if (SECTIONS.includes(sectionId)) {
                showSection(sectionId);
            }
        } else {
            closeMenu();
        }
    });
});

// ── Scroll Down button fix for mobile ──
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function(e) {
        if (isMobile()) {
            e.preventDefault();
            showSection('about');
        }
    });
}

// ── Header shadow on scroll ──
window.addEventListener('scroll', function() {
    const navHeader = document.getElementById("header");
    if (window.scrollY > 50) {
        navHeader.style.boxShadow = "0 2px 16px rgba(0,0,0,0.15)";
        navHeader.style.height = "64px";
    } else {
        navHeader.style.boxShadow = "0 2px 16px rgba(0,0,0,0.10)";
        navHeader.style.height = "72px";
    }
});

// ── Resize handler (fixed) ──
let wasMobile = isMobile();

window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (wasMobile !== nowMobile) {
        wasMobile = nowMobile;
        activeSection = null;
        initMobile();
    }
});

// ── Init ──
initMobile();

// ── Scroll Animations (desktop only) ──
function initAnimations() {
    if (isMobile()) return; // Skip on mobile — sections shown instantly

    const animTargets = [
        { selector: '.top-header', cls: 'animate-hidden' },
        { selector: '.about-profile-card', cls: 'animate-hidden animate-left' },
        { selector: '.about-skills-grid', cls: 'animate-hidden animate-right' },
        { selector: '.edu-card', cls: 'animate-hidden', stagger: true },
        { selector: '.project-card', cls: 'animate-hidden animate-scale', stagger: true },
        { selector: '.more-projects-wrap', cls: 'animate-hidden' },
        { selector: '.cert-img-card', cls: 'animate-hidden animate-scale', stagger: true },
        { selector: '.contact-chips', cls: 'animate-hidden' },
        { selector: '.contact-form-box', cls: 'animate-hidden animate-scale' },
        { selector: '.top-footer', cls: 'animate-hidden' },
        { selector: '.middle-footer', cls: 'animate-hidden' },
        { selector: '.footer-social-icons', cls: 'animate-hidden' },
    ];

    animTargets.forEach(({ selector, cls, stagger }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.remove('animate-visible');
            cls.split(' ').forEach(c => { if (c) el.classList.add(c); });
            if (stagger) el.classList.add(`stagger-${Math.min(i + 1, 5)}`);
        });
    });

    setupObserver();
}

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.animate-hidden:not(.animate-visible)').forEach(el => {
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// ── Typing Effect ──
const typingEffect = new Typed(".typedText", {
    strings: ["Deekshith...", "Developer...", "Designer..."],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
});