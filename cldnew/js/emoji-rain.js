// ============================================
// Emoji Rain / Confetti Effect - Fixed Version
// ============================================

(function() {
    let lastStartTime = 0;

    function sanitizeSrc(src) {
        if (!src) return '';
        // Trim spaces and remove backticks often present in copied HTML
        let clean = src.trim().replace(/`/g, '');
        // Encode spaces
        clean = clean.replace(/\s/g, '%20');
        return clean;
    }

    function createEmojiRain(emojiSrc, startX, startY) {
        const now = Date.now();
        // Minimal throttle to avoid overwhelming DOM
        if (now - lastStartTime < 120) return;
        lastStartTime = now;

        const container = document.getElementById('rain-emoji-container');
        if (!container) {
            console.error('Rain emoji container not found!');
            return;
        }

        const emojiCount = 40;
        const baseSize = window.innerWidth <= 480 ? 42 : window.innerWidth <= 768 ? 52 : 60;

        for (let i = 0; i < emojiCount; i++) {
            const particle = document.createElement('div');
            const size = baseSize * (0.65 + Math.random() * 0.6);

            particle.style.cssText = `
                position: fixed;
                left: ${startX - size / 2}px;
                top: ${startY - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                background-image: url("${emojiSrc}");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                pointer-events: none;
                z-index: 10000;
                opacity: 1;
            `;
            container.appendChild(particle);

            // Randomized burst vector
            const angle = (Math.random() * Math.PI * 2);
            const distance = 80 + Math.random() * 160;
            const driftX = Math.cos(angle) * distance;
            const driftY = Math.sin(angle) * distance;

            const fallX = driftX * (0.25 + Math.random() * 0.5);
            const fallY = 280 + Math.random() * 280;
            const rot = (-90 + Math.random() * 180) * (Math.random() < 0.5 ? -1 : 1);

            const burstDur = 0.55 + Math.random() * 0.25;
            const fallDur = 1.1 + Math.random() * 0.6;

            if (window.gsap) {
                const tl = gsap.timeline({ onComplete: () => particle.remove() });
                tl.to(particle, {
                    x: driftX,
                    y: driftY * -0.6,
                    rotation: rot * 0.6,
                    ease: 'power3.out',
                    duration: burstDur
                }).to(particle, {
                    x: `+=${fallX}`,
                    y: `+=${fallY}`,
                    rotation: `+=${rot}`,
                    ease: 'power1.in',
                    duration: fallDur
                });
            } else {
                const anim = particle.animate([
                    { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
                    { transform: `translate(${driftX}px, ${driftY * -0.6}px) rotate(${rot * 0.6}deg)`, opacity: 1 },
                    { transform: `translate(${driftX + fallX}px, ${(driftY * -0.6) + fallY}px) rotate(${rot * 1.6}deg)`, opacity: 1 }
                ], {
                    duration: (burstDur + fallDur) * 1000,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                });
                anim.onfinish = () => particle.remove();
            }
        }
    }

    // Attach to window for global access
    window.initEmojiRain = function(element) {
        let emojiSrc = '';
        // Prefer direct <img> source
        if (element.tagName === 'IMG') {
            emojiSrc = element.src;
        } else {
            const img = element.querySelector('img');
            if (img) emojiSrc = img.src;
        }

        // Fallback: read CSS background-image url from the clicked element
        if (!emojiSrc) {
            const bg = window.getComputedStyle(element).backgroundImage || '';
            const match = bg.match(/url\(("|')?(.*?)(\1)\)/);
            if (match && match[2]) {
                emojiSrc = match[2];
            }
        }

        emojiSrc = sanitizeSrc(emojiSrc);
        if (emojiSrc) {
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            createEmojiRain(emojiSrc, startX, startY);
        } else {
            console.error('No emoji src found');
        }
    };

    // Initialize click handlers when DOM is ready
    function initializeHandlers() {
        // Use event delegation so newly created Swiper clones also work
        document.addEventListener('click', function(e) {
            const target = e.target.closest('.emoji-clickable');
            if (!target) return;

            // Only allow interaction for emojis inside the active slide
            const slide = target.closest('.swiper-slide');
            if (!slide || !slide.classList.contains('swiper-slide-active')) return;

            // Ensure the element is actually in the viewport
            const rect = target.getBoundingClientRect();
            const inViewport = rect.width > 0 && rect.height > 0 &&
                rect.bottom > 0 && rect.right > 0 &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth);
            if (!inViewport) return;

            const cs = window.getComputedStyle(target);
            const filter = (cs.filter || '').toLowerCase();
            const opacity = parseFloat(cs.opacity || '1');
            const isBlurred = /blur\(/.test(filter);
            if (isBlurred || opacity <= 0.3) return;

            e.preventDefault();
            e.stopPropagation();
            window.initEmojiRain(target);
        }, { passive: false });

        // Keyboard activation for accessibility: Enter or Space triggers rain
        document.addEventListener('keydown', function(e) {
            const target = e.target.closest('.emoji-clickable');
            if (!target) return;
            const slide = target.closest('.swiper-slide');
            if (!slide || !slide.classList.contains('swiper-slide-active')) return;
            const rect = target.getBoundingClientRect();
            const inViewport = rect.width > 0 && rect.height > 0 &&
                rect.bottom > 0 && rect.right > 0 &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth);
            if (!inViewport) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.initEmojiRain(target);
            }
        });

        // Upgrade emoji elements to act as buttons (role, tabindex, aria-label)
        function upgradeEmojiButtons(root = document) {
            const nodes = root.querySelectorAll('.emoji-clickable');
            nodes.forEach(el => {
                if (el.dataset.emojiButtonUpgraded === '1') return;
                const alt = (el.getAttribute('alt') || 'Emoji').trim();
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
                el.setAttribute('aria-label', alt);
                el.dataset.emojiButtonUpgraded = '1';
            });
        }

        upgradeEmojiButtons(document);

        // Observe the swiper for clones/new slides and upgrade newly added emojis
        const swiperEl = document.querySelector('.hero-swiper');
        if (swiperEl && window.MutationObserver) {
            const observer = new MutationObserver(() => upgradeEmojiButtons(swiperEl));
            observer.observe(swiperEl, { childList: true, subtree: true });
        }
    }

    // Initialize when document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHandlers);
    } else {
        initializeHandlers();
    }
})();
