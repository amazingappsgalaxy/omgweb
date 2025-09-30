// Premium V2 JavaScript - Faithful to Original Design
class PremiumAppV2 {
    constructor() {
        this.extensions = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadExtensions();
        this.setupEventListeners();
        this.hidePreloader();
    }

    setupEventListeners() {
        // Category filtering
        document.addEventListener('click', this.handleCategoryClick.bind(this));
    }

    hidePreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.remove();
                    }, 500);
                }, 800);
            }
        });
    }

    loadExtensions() {
        // Original extension data with exact colors and full layout
        this.extensions = [
            {
                id: "azanime",
                name: "A-Z Anime",
                description: "Simple anime extension app with both Sub & Dub anime. Watch shows for free with in-built video player and other features coming soon.",
                logo: "img/Untitled.jpg",
                screenshots: [
                    "img/thumb1%20Large.jpeg",
                    "img/thumb2%20Large.jpeg",
                    "img/thumb3%20Large.jpeg",
                    "img/thumb4%20Large.jpeg",
                    "img/thumb5%20Large.jpeg"
                ],
                category: "anime",
                hasCarousel: true
            },
            {
                id: "aiart",
                name: "AI Art Generator",
                description: "Free online AI image generator from text",
                logo: "img/dea9a36c-4228-48ba-ae70-3ab6fa30b323-0%20Small.jpeg",
                screenshots: [
                    "img/image%20Medium.jpeg"
                ],
                category: "ai",
                hasCarousel: true
            },
            {
                id: "relaxme",
                name: "Relaxing Background Music",
                description: "A simple relaxing music and noise generator",
                logo: "img/dc7b3f97-82ee-4bd6-a1c9-46af471e4736-0%20Small.jpeg",
                screenshots: [
                    "img/ios-11-aura-silver-granite-apple-ipad-pro-stock-3840x2160-749%20Medium.jpeg"
                ],
                category: "entertainment",
                hasCarousel: true
            },
            {
                id: "autocorrect",
                name: "Text Auto-Correct",
                description: "A simple tool designed to find spelling, as well as basic grammar and stylistic mistakes, in English texts.",
                logo: "img/Untitled%20Small.jpeg",
                screenshots: [
                    "img/dac90ed58e891dfa416cd1298f09159c.jpg"
                ],
                category: "productivity",
                hasCarousel: true
            }
        ];

        this.renderExtensions();
    }

    handleCategoryClick(e) {
        const categoryBtn = e.target.closest('.category-btn');
        if (!categoryBtn) return;

        const category = categoryBtn.dataset.category;

        // Update active state
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        categoryBtn.classList.add('active');

        this.currentFilter = category;
        this.renderExtensions();
    }

    renderExtensions() {
        const grid = document.getElementById('extensions-grid');
        if (!grid) return;

        const filteredExtensions = this.currentFilter === 'all'
            ? this.extensions
            : this.extensions.filter(ext => ext.category === this.currentFilter);

        grid.innerHTML = '';

        filteredExtensions.forEach((extension, index) => {
            const card = this.createExtensionCard(extension, index);
            grid.appendChild(card);
        });

        // Initialize Bootstrap carousels
        setTimeout(() => {
            this.initializeBootstrapCarousels();
        }, 100);
    }

    createExtensionCard(extension, index) {
        const card = document.createElement('div');
        card.className = `extension-card ${extension.id}`;

        const carouselHtml = extension.hasCarousel && extension.screenshots.length > 0
            ? this.createOriginalCarouselHtml(extension)
            : '';

        card.innerHTML = `
            <div class="extension-content">
                <img src="${extension.logo}" alt="${extension.name}" class="extension-logo" loading="lazy">
                <h3 class="extension-title">${extension.name}</h3>
                <p class="extension-description">${extension.description}</p>
                <div class="divider-line"></div>
                ${carouselHtml}
            </div>
            <div class="extension-name-container">
                <span class="extension-name-badge">${extension.id}</span>
            </div>
        `;

        return card;
    }

    createOriginalCarouselHtml(extension) {
        const carouselId = `carousel-${extension.id}`;
        const hasMultipleImages = extension.screenshots.length > 1;

        // Create thumbnail navigation instead of dots
        const thumbnails = hasMultipleImages ? extension.screenshots.map((screenshot, i) => `
            <img src="${screenshot}"
                 alt="${extension.name} Thumbnail ${i + 1}"
                 class="carousel-thumbnail ${i === 0 ? 'active' : ''}"
                 data-bs-target="#${carouselId}"
                 data-bs-slide-to="${i}"
                 loading="lazy">
        `).join('') : '';

        const slides = extension.screenshots.map((screenshot, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img class="d-block w-100" alt="${extension.name} Screenshot ${i + 1}" src="${screenshot}">
            </div>
        `).join('');

        // Only show controls and thumbnails if there are multiple images
        const controls = hasMultipleImages ? `
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <svg width="32" height="32" viewBox="0 0 32 32" class="carousel-nav-icon">
                    <path d="M22,2L9,16,22,30" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <svg width="32" height="32" viewBox="0 0 32 32" class="carousel-nav-icon">
                    <path d="M10,2l13,14-13,14" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span class="visually-hidden">Next</span>
            </button>
        ` : '';

        const thumbnailsSection = hasMultipleImages ? `
            <div class="carousel-thumbnails">
                ${thumbnails}
            </div>
        ` : '';

        return `
            <div id="${carouselId}" class="carousel slide original-carousel" data-bs-ride="carousel" data-bs-interval="4000">
                <div class="carousel-inner">
                    ${slides}
                </div>
                ${controls}
                ${thumbnailsSection}
            </div>
        `;
    }

    initializeBootstrapCarousels() {
        // Enhanced Bootstrap carousel initialization
        document.querySelectorAll('.original-carousel').forEach(carousel => {
            // Initialize Bootstrap carousel with optimized settings
            const bsCarousel = new bootstrap.Carousel(carousel, {
                interval: 5000,
                touch: true,
                wrap: true,
                keyboard: true,
                pause: 'hover'
            });

            // Optimize for smooth transitions
            carousel.style.willChange = 'transform';

            // Add touch support enhancements
            this.addTouchSupport(carousel, bsCarousel);

            // Add thumbnail click functionality
            this.setupThumbnailNavigation(carousel, bsCarousel);
        });
    }

    addTouchSupport(carousel, bsCarousel) {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = true;
            bsCarousel.pause();
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            // Prevent vertical scrolling if horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e) => {
            if (!isDragging) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            isDragging = false;

            // Determine if it's a swipe
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
            const isLongSwipe = Math.abs(deltaX) > 50;

            if (isHorizontalSwipe && isLongSwipe) {
                if (deltaX > 0) {
                    bsCarousel.prev();
                } else {
                    bsCarousel.next();
                }

                // Haptic feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(20);
                }
            }

            // Resume auto-cycling
            setTimeout(() => {
                bsCarousel.cycle();
            }, 1000);
        };

        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => bsCarousel.pause());
        carousel.addEventListener('mouseleave', () => bsCarousel.cycle());
    }

    setupThumbnailNavigation(carousel, bsCarousel) {
        const thumbnails = carousel.querySelectorAll('.carousel-thumbnail');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));

                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');

                // Navigate to the corresponding slide
                bsCarousel.to(index);
            });
        });

        // Update thumbnail active state when carousel slides change
        carousel.addEventListener('slide.bs.carousel', (event) => {
            const activeIndex = event.to;
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === activeIndex);
            });
        });
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumAppV2();
});