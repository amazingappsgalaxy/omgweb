// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Swiper for hero slider
let heroSwiper;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero slider
    heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'slider-bullet',
            bulletActiveClass: 'slider-bullet-active'
        },
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
        on: {
            slideChangeTransitionStart: function() {
                // Animate slide content
                const activeSlide = this.slides[this.activeIndex];
                const content = activeSlide.querySelector('.slide-content');
                
                gsap.timeline()
                    .from(content.querySelector('.slide-badge'), { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' })
                    .from(content.querySelector('.slide-title'), { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.6')
                    .from(content.querySelector('.slide-description'), { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.4')
                    .from(content.querySelectorAll('.feature-item'), { duration: 0.6, y: 20, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.2')
                    .from(content.querySelectorAll('.btn'), { duration: 0.6, y: 30, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.1');
                
                // Animate phone mockup
                const visual = activeSlide.querySelector('.slide-visual');
                gsap.from(visual.querySelector('.mockup-image'), { 
                    duration: 1, 
                    scale: 0.8, 
                    opacity: 0, 
                    ease: 'power3.out',
                    delay: 0.3
                });
                
                // Animate floating elements
                const floatingElements = visual.querySelectorAll('.float-item');
                gsap.from(floatingElements, {
                    duration: 0.8,
                    scale: 0,
                    opacity: 0,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    delay: 0.5
                });
            }
        }
    });

    // Initial animation for first slide
    setTimeout(() => {
        const firstSlide = document.querySelector('.hero-slide');
        const content = firstSlide.querySelector('.slide-content');
        
        gsap.timeline()
            .from(content.querySelector('.slide-badge'), { duration: 1, y: 30, opacity: 0, ease: 'power3.out' })
            .from(content.querySelector('.slide-title'), { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.7')
            .from(content.querySelector('.slide-description'), { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
            .from(content.querySelectorAll('.feature-item'), { duration: 0.8, y: 20, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
            .from(content.querySelectorAll('.btn'), { duration: 0.8, y: 30, opacity: 0, stagger: 0.1, ease: 'power3.out' }, '-=0.2');
        
        // Animate phone mockup
        const visual = firstSlide.querySelector('.slide-visual');
        gsap.from(visual.querySelector('.mockup-image'), { 
            duration: 1.2, 
            scale: 0.8, 
            opacity: 0, 
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Animate floating elements
        const floatingElements = visual.querySelectorAll('.float-item');
        gsap.from(floatingElements, {
            duration: 1,
            scale: 0,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 0.8
        });
    }, 100);
    
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractions();
    initializeFloatingElements();
});

// Initialize main animations
function initializeAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-buttons .btn', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-stats .stat-item', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-mockup', {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.8');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Initialize scroll-triggered effects
function initializeScrollEffects() {
    // Scroll-triggered animations for sections
    ScrollTrigger.batch('.feature-card', {
        onEnter: (elements) => {
            gsap.from(elements, {
                duration: 0.8,
                y: 60,
                opacity: 0,
                stagger: 0.15,
                ease: 'power3.out'
            });
        },
        start: 'top 85%'
    });

    ScrollTrigger.batch('.screenshot-image', {
        onEnter: (elements) => {
            gsap.from(elements, {
                duration: 1,
                y: 80,
                opacity: 0,
                scale: 0.9,
                stagger: 0.2,
                ease: 'power3.out'
            });
        },
        start: 'top 85%'
    });

    // Section headers animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });


}

// Initialize interactive elements
function initializeInteractions() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        const icon = card.querySelector('.card-icon');
        const badge = card.querySelector('.card-badge');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
            gsap.to(badge, {
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(badge, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Screenshot hover effects
    document.querySelectorAll('.screenshot-image').forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, { duration: 0.3, scale: 1, ease: 'power2.out' });
        });
    });

    // Download button effects
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        const icon = btn.querySelector('.btn-icon');
        
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Primary button shine effect
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const shine = btn.querySelector('.btn-shine');
            if (shine) {
                gsap.fromTo(shine, 
                    { x: '-100%' },
                    { x: '100%', duration: 0.6, ease: 'power2.out' }
                );
            }
        });
    });

    // Magnetic button effect for primary buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.1,
                y: y * 0.1,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize floating elements animation
function initializeFloatingElements() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (heroSwiper) {
            if (e.key === 'ArrowLeft') {
                heroSwiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                heroSwiper.slideNext();
            }
        }
    });
}

// Utility function for smooth reveal animations
function revealElement(element, delay = 0) {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: delay,
            ease: 'power2.out'
        }
    );
}

// Performance optimization: Reduce animations on mobile
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Disable some heavy animations on mobile
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.scrub) {
                trigger.kill();
            }
        });
        
        // Simplify floating elements on mobile
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach(element => {
            gsap.set(element, { opacity: 0.05 });
        });
    }
}

// Initialize mobile optimizations
window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();

// Preloader (if needed)
window.addEventListener('load', () => {
    // Hide any loading screens
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loader.remove()
        });
    }
    
    // Refresh ScrollTrigger after all content is loaded
    ScrollTrigger.refresh();
});

// Error handling for libraries
if (typeof gsap === 'undefined') {
    console.warn('GSAP library not loaded. Animations will be disabled.');
}

if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded. Slider functionality will be disabled.');
}

// Performance optimization
window.addEventListener('load', () => {
    // Refresh ScrollTrigger after all content is loaded
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
    
    // Preload next slide images
    if (heroSwiper) {
        heroSwiper.preloadImages();
    }
});