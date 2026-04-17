document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor & Soft Glow Effect
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    // Handle mouse move
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate update for dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth update for glow using requestAnimationFrame
    function animateGlow() {
        // Linear interpolation for smooth trailing effect
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(animateGlow);
    }
    
    // Check if device supports hover before animating custom cursors
    if(window.matchMedia("(hover: hover)").matches) {
        animateGlow();
    } else {
        // Hide custom cursors on mobile
        cursorDot.style.display = 'none';
        cursorGlow.style.display = 'none';
    }

    // Add hover states to interactive elements
    const interactives = document.querySelectorAll('a, button, .works-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: avoid re-triggering entry animations
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stagger-float').forEach(el => {
        observer.observe(el);
    });

    // 3. Hero Video Fade-in Optimization
    const heroVideo = document.getElementById('hero-bg-video');
    if (heroVideo) {
        // If already playing or can play, show it
        if (heroVideo.readyState >= 3) {
            heroVideo.classList.add('video-ready');
        } else {
            heroVideo.addEventListener('playing', () => {
                heroVideo.classList.add('video-ready');
            }, { once: true });
        }
    }
});
