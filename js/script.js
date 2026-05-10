document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
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

    document.querySelectorAll('.stagger-reveal').forEach((el) => {
        observer.observe(el);
    });

    // 2. Typing Effect
    const words = ["scalable web apps.", "beautiful UI/UX.", "RESTful APIs.", "innovative solutions."];
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
        setTimeout(loopDeleting, 2000); // Pause before deleting
    }

    // Start typing effect
    setTimeout(typingEffect, 500);

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('bx-menu-alt-right');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu-alt-right');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
            menuToggle.querySelector('i').classList.replace('bx-x', 'bx-menu-alt-right');
        });
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 10%';
            nav.style.background = 'rgba(15, 23, 42, 0.9)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.padding = '1.5rem 10%';
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // 5. Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
