/**
 * cv.js — Professional CV Page Scripts
 * Handles: scroll-aware header, PDF download
 */

// ── Scroll-aware header shadow ───────────────────────────────────────────────
(function initHeaderScroll() {
    const header = document.getElementById('cv-header');
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 8) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();


// ── PDF Download via window.print() ──────────────────────────────────────────
function downloadPDF() {
    const btn = document.getElementById('btn-download');

    // Visual feedback
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bx bx-loader-circle bx-spin"></i><span>Preparing…</span>';
        btn.disabled = true;

        setTimeout(() => {
            window.print();
            // Restore button after print dialog closes
            btn.innerHTML = original;
            btn.disabled = false;
        }, 200);
    } else {
        window.print();
    }
}


// ── Keyboard shortcut: Ctrl/Cmd + P → already native, but Ctrl+D → download ─
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadPDF();
    }
});


// ── Smooth active section highlight (optional enhancement) ───────────────────
(function initSectionObserver() {
    const sections = document.querySelectorAll('.cv-section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Could be used to highlight a sidebar nav in future
                    entry.target.dataset.active = 'true';
                } else {
                    delete entry.target.dataset.active;
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(section => observer.observe(section));
})();
