// ============================================
// OMG Browser - Visual Slider with Title Animation
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Slide titles
    const titles = [
        'Play any videos natively',
        'First mobile browser to have extension support',
        'Built-in video player for the smoothest experience',
        'Block annoying ads with just a click'
    ];

    // Get title element
    const heroTitle = document.getElementById('heroTitle');

    // Function to animate title change
    function changeTitle(index) {
        if (typeof gsap !== 'undefined' && heroTitle) {
            gsap.to(heroTitle, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    heroTitle.textContent = titles[index];
                    gsap.to(heroTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        } else if (heroTitle) {
            heroTitle.textContent = titles[index];
        }
    }

    // Function to re-trigger animations when slide changes
    function animateSlideContent(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (!activeSlide) return;

        // Get screenshot and emojis from active slide
        const screenshot = activeSlide.querySelector('.slide-screenshot');
        const emojis = activeSlide.querySelectorAll('.floating-emoji');

        // Re-trigger screenshot animation
        if (screenshot) {
            screenshot.style.animation = 'none';
            setTimeout(() => {
                screenshot.style.animation = 'fadeInScale 0.6s ease-out forwards';
            }, 10);
        }

        // Re-trigger emoji animations
        emojis.forEach((emoji) => {
            emoji.style.animation = 'none';
            setTimeout(() => {
                if (emoji.classList.contains('bg-emoji')) {
                    if (emoji.classList.contains('bg-emoji-1')) {
                        emoji.style.animation = 'fadeInBg 1s ease-out forwards 0.1s';
                    } else if (emoji.classList.contains('bg-emoji-2')) {
                        emoji.style.animation = 'fadeInBg 1s ease-out forwards 0.15s';
                    }
                } else {
                    // Regular emojis with staggered delays
                    if (emoji.classList.contains('emoji-1')) {
                        emoji.style.animation = 'fadeInEmoji 0.8s ease-out forwards 0.2s';
                    } else if (emoji.classList.contains('emoji-2')) {
                        emoji.style.animation = 'fadeInEmoji 0.8s ease-out forwards 0.3s';
                    } else if (emoji.classList.contains('emoji-3')) {
                        emoji.style.animation = 'fadeInEmoji 0.8s ease-out forwards 0.4s';
                    } else if (emoji.classList.contains('emoji-4')) {
                        emoji.style.animation = 'fadeInEmoji 0.8s ease-out forwards 0.5s';
                    } else if (emoji.classList.contains('emoji-5')) {
                        emoji.style.animation = 'fadeInEmoji 0.8s ease-out forwards 0.6s';
                    }
                }
            }, 10);
        });
    }

    // Initialize Swiper Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        // Effect - fade instead of slide
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,

        // Initial slide
        initialSlide: 0,

        // Loop
        loop: true,

        // Autoplay
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Touch
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        // Accessibility
        a11y: {
            enabled: true,
        },

        // Events
        on: {
            slideChange: function() {
                // Get real index (for loop mode)
                const realIndex = this.realIndex;
                changeTitle(realIndex);
                animateSlideContent(this);
            }
        }
    });

    console.log('OMG Browser - Slider initialized ✓');

});
