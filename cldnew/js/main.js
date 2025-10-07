// ============================================
// OMG Browser - Swiper Slider
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Initialize Swiper Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        // Effect
        effect: 'slide',
        speed: 800,
        
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
    });

    // GSAP Animations for Emojis
    if (typeof gsap !== 'undefined') {
        // Animate floating emojis with more variation
        gsap.utils.toArray('.floating-emoji').forEach((emoji, i) => {
            gsap.to(emoji, {
                y: -30 + (i * 5),
                rotation: 15 - (i * 3),
                duration: 3 + (i * 0.5),
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                delay: i * 0.3
            });
        });
    }

    console.log('OMG Browser - Slider initialized ✓');

});
