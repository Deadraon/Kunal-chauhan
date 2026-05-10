document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks   = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const menuIcon   = menuToggle.querySelector('i');

    function openMenu() {
        navLinks.classList.add('active');
        document.body.classList.add('no-scroll');
        if (navOverlay) navOverlay.classList.add('active');
        menuIcon.classList.replace('bx-menu', 'bx-x');
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
        if (navOverlay) navOverlay.classList.remove('active');
        menuIcon.classList.replace('bx-x', 'bx-menu');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close on overlay tap
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close when a link is tapped
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Typewriter Effect
    const words = ["scalable web applications.", "beautiful UI/UX.", "robust RESTful APIs.", "innovative tech solutions."];
    const typewriter = document.getElementById('typewriter');
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typewriter.textContent += word.shift();
            } else {
                deletingEffect();
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typewriter.textContent = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                typingEffect();
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        setTimeout(loopDeleting, 2000);
    }
    
    // Start typewriter
    if (reduceMotion) {
        typewriter.textContent = words[0];
        setInterval(() => {
            i = (i + 1) % words.length;
            typewriter.textContent = words[i];
        }, 2400);
    } else {
        setTimeout(typingEffect, 1000);
    }

    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Static-form fallback that opens the user's mail app with a prefilled draft.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const status = document.getElementById('form-status');
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();
            const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

            if (status) {
                status.textContent = 'Opening your email app with a pre-filled draft.';
            }

            window.location.href = `mailto:chauhankunal695@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
