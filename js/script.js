document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animations
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
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runTypewriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex -= 1;
        } else {
            charIndex += 1;
        }

        typewriter.textContent = currentWord.slice(0, charIndex);

        let delay = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = 1700;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        window.setTimeout(runTypewriter, delay);
    }

    window.setTimeout(runTypewriter, 900);

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
