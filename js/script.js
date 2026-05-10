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
        if (navOverlay) navOverlay.classList.add('active');
        menuIcon.classList.replace('bx-menu', 'bx-x');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        menuIcon.classList.replace('bx-x', 'bx-menu');
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Close on overlay tap
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close when a link is tapped
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Typewriter Effect
    const words = ["scalable web applications.", "beautiful UI/UX.", "robust RESTful APIs.", "innovative tech solutions."];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typewriter').innerHTML += word.shift();
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
                document.getElementById('typewriter').innerHTML = word.join("");
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
    setTimeout(typingEffect, 1000);

    // Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent';
                btn.style.background = '#10b981'; // Green for success
                btn.style.borderColor = '#10b981';
                btn.style.color = 'white';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});
