class iOSExtensionsApp {
    constructor() {
        this.extensions = [
            {
                id: "azanime",
                name: "A-Z Anime",
                description: "Simple anime extension app with both Sub & Dub anime. Watch shows for free with in-built video player and other features coming soon.",
                category: "entertainment",
                logo: "../img/Untitled.jpg",
                screenshots: [
                    "../img/thumb1 Large.jpeg",
                    "../img/thumb2 Large.jpeg",
                    "../img/thumb3 Large.jpeg",
                    "../img/thumb4 Large.jpeg",
                    "../img/thumb5 Large.jpeg"
                ],
                hasCarousel: true
            },
            {
                id: "aiart",
                name: "AI Art Generator",
                description: "Free online AI image generator from text",
                category: "productivity",
                logo: "../img/dea9a36c-4228-48ba-ae70-3ab6fa30b323-0 Small.jpeg",
                screenshots: [
                    "../img/image Medium.jpeg"
                ],
                hasCarousel: true
            },
            {
                id: "relaxme",
                name: "Relaxing Background Music",
                description: "A simple relaxing music and noise generator",
                category: "entertainment",
                logo: "../img/dc7b3f97-82ee-4bd6-a1c9-46af471e4736-0 Small.jpeg",
                screenshots: [
                    "../img/ios-11-aura-silver-granite-apple-ipad-pro-stock-3840x2160-749 Medium.jpeg"
                ],
                hasCarousel: true
            },
            {
                id: "autocorrect",
                name: "Text Auto-Correct",
                description: "A simple tool designed to find spelling, as well as basic grammar and stylistic mistakes, in English texts.",
                category: "productivity",
                logo: "../img/Untitled Small.jpeg",
                screenshots: [
                    "../img/dac90ed58e891dfa416cd1298f09159c.jpg"
                ],
                hasCarousel: true
            }
        ];

        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.updateTime();
        this.setupCategories();
        this.renderExtensions();
        this.updateStats();

        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    setupCategories() {
        const container = document.getElementById('categoriesContainer');
        const categories = ['all', ...new Set(this.extensions.map(ext => ext.category.toLowerCase()))];

        container.innerHTML = categories.map(category => {
            const isActive = category === this.currentFilter;
            const label = category === 'all' ? 'All' : this.formatCategoryName(category);
            const count = category === 'all'
                ? this.extensions.length
                : this.extensions.filter(ext => ext.category.toLowerCase() === category).length;

            return `
                <button class="category-pill ${isActive ? 'active' : ''}"
                        data-category="${category}">
                    ${label} (${count})
                </button>
            `;
        }).join('');

        // Add event listeners
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-pill')) {
                this.handleCategoryChange(e.target);
            }
        });
    }

    formatCategoryName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    handleCategoryChange(button) {
        const category = button.dataset.category;

        // Update active state with smooth transition
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
        });

        // Small delay for smooth visual feedback
        setTimeout(() => {
            button.classList.add('active');
        }, 100);

        this.currentFilter = category;
        this.renderExtensions();
        this.updateVisibleCount();
    }

    renderExtensions() {
        const container = document.getElementById('extensionsGrid');
        const filteredExtensions = this.currentFilter === 'all'
            ? this.extensions
            : this.extensions.filter(ext => ext.category.toLowerCase() === this.currentFilter);

        // Fade out current content
        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';

        setTimeout(() => {
            container.innerHTML = filteredExtensions.map((extension, index) => {
                return this.createExtensionCard(extension, index);
            }).join('');

            // Initialize Bootstrap carousels
            setTimeout(() => {
                this.initializeCarousels();
            }, 100);

            // Fade in new content
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 200);
    }

    createExtensionCard(extension, index) {
        const carouselHtml = extension.hasCarousel && extension.screenshots.length > 0
            ? this.createAppStoreCarouselHtml(extension)
            : '';

        return `
            <div class="extension-card ${extension.id}" style="animation-delay: ${index * 0.1}s">
                <div class="extension-header">
                    <div class="extension-icon">
                        <img src="${extension.logo}" alt="${extension.name}" loading="lazy">
                    </div>
                    <div class="extension-info">
                        <h3 class="extension-title">${extension.name}</h3>
                        <p class="extension-description">${extension.description}</p>
                    </div>
                </div>
                <div class="divider-line"></div>
                ${carouselHtml ? `<div class="extension-screenshots">${carouselHtml}</div>` : ''}
                <div class="extension-id-section">
                    <div class="extension-id-badge">
                        <span class="id-text">${extension.id}</span>
                        <button class="copy-button" onclick="window.copyExtensionId('${extension.id}', this)" title="Copy to clipboard">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createAppStoreCarouselHtml(extension) {
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
                <img class="d-block w-100" alt="${extension.name} Screenshot ${i + 1}" src="${screenshot}" loading="lazy">
            </div>
        `).join('');

        // Only show controls if there are multiple images
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
            <div id="${carouselId}" class="carousel slide appstore-carousel" data-bs-ride="false">
                <div class="carousel-inner">
                    ${slides}
                </div>
                ${controls}
                ${thumbnailsSection}
            </div>
        `;
    }

    initializeCarousels() {
        document.querySelectorAll('.ios-carousel').forEach(carousel => {
            const bsCarousel = new bootstrap.Carousel(carousel, {
                interval: false, // Don't auto-play
                touch: true,
                wrap: true,
                keyboard: true,
                pause: 'hover'
            });

            this.addTouchSupport(carousel, bsCarousel);
            this.setupThumbnailNavigation(carousel, bsCarousel);
        });
    }

    addTouchSupport(carousel, bsCarousel) {
        let startX = 0;
        let startY = 0;
        let isScrolling = undefined;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = undefined;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 1) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            if (isScrolling === undefined) {
                isScrolling = Math.abs(diffY) > Math.abs(diffX);
            }

            if (!isScrolling && Math.abs(diffX) > 30) {
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e) => {
            if (isScrolling) return;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    bsCarousel.next();
                } else {
                    bsCarousel.prev();
                }
            }
        };

        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    setupThumbnailNavigation(carousel, bsCarousel) {
        const thumbnails = carousel.querySelectorAll('.carousel-thumbnail');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Add haptic feedback simulation (visual)
                thumbnail.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    thumbnail.style.transform = '';
                }, 100);

                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
                bsCarousel.to(index);
            });
        });

        carousel.addEventListener('slide.bs.carousel', (event) => {
            const activeIndex = event.to;
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === activeIndex);
            });
        });
    }

    updateStats() {
        const totalElement = document.getElementById('totalCount');
        if (totalElement) {
            this.animateNumber(totalElement, 0, this.extensions.length, 1000);
        }
    }

    updateVisibleCount() {
        const visibleElement = document.getElementById('visibleCount');
        if (visibleElement) {
            const count = this.currentFilter === 'all'
                ? this.extensions.length
                : this.extensions.filter(ext => ext.category.toLowerCase() === this.currentFilter).length;

            this.animateNumber(visibleElement, parseInt(visibleElement.textContent), count, 500);
        }
    }

    animateNumber(element, from, to, duration) {
        const start = Date.now();
        const animate = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const current = Math.floor(from + (to - from) * this.easeOutCubic(progress));
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Global copy function with iOS-style feedback
window.copyExtensionId = async function(id, button) {
    try {
        await navigator.clipboard.writeText(id);
        showIOSToast();
        addHapticFeedback(button);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = id;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showIOSToast();
        addHapticFeedback(button);
    }
};

function addHapticFeedback(button) {
    // Simulate haptic feedback with visual and potential vibration
    button.style.transform = 'scale(0.9)';
    button.style.opacity = '0.7';

    // Try to trigger device vibration if supported
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    setTimeout(() => {
        button.style.transform = '';
        button.style.opacity = '';
    }, 150);
}

function showIOSToast() {
    const toast = document.getElementById('iosToast');

    // Remove any existing show/hide classes
    toast.classList.remove('show', 'hide');

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Hide toast after delay
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.remove('show', 'hide');
        }, 500);
    }, 2500);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new iOSExtensionsApp();
});

// Add smooth transitions to container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('extensionsGrid');
    if (container) {
        container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});