// Slide Navigation System with TypeScript
interface SlideElements {
    slides: NodeListOf<HTMLElement>;
    progressFill: HTMLElement;
    prevBtn: HTMLButtonElement;
    nextBtn: HTMLButtonElement;
}

class SlidePresentation {
    private currentSlide: number = 0;
    private slides: NodeListOf<HTMLElement>;
    private totalSlides: number;
    private progressFill: HTMLElement;
    private prevBtn: HTMLButtonElement;
    private nextBtn: HTMLButtonElement;
    private touchStartX: number = 0;
    private touchStartY: number = 0;
    private touchEndX: number = 0;
    private touchEndY: number = 0;

    constructor() {
        const elements = this.getElements();
        this.slides = elements.slides;
        this.totalSlides = this.slides.length;
        this.progressFill = elements.progressFill;
        this.prevBtn = elements.prevBtn;
        this.nextBtn = elements.nextBtn;
        
        this.init();
    }

    private getElements(): SlideElements {
        const slides = document.querySelectorAll<HTMLElement>('.slide');
        const progressFill = document.getElementById('progressFill');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (!progressFill || !prevBtn || !nextBtn || slides.length === 0) {
            throw new Error('Required elements not found');
        }

        return {
            slides,
            progressFill,
            prevBtn: prevBtn as HTMLButtonElement,
            nextBtn: nextBtn as HTMLButtonElement,
        };
    }

    private init(): void {
        // Set initial slide
        this.showSlide(0);
        
        // Event listeners for navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch/swipe support for mobile
        this.initTouchEvents();
        
        // Update button states
        this.updateButtons();
    }

    private showSlide(index: number): void {
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            
            // Re-trigger animations for slide content
            const slideText = this.slides[index].querySelector<HTMLElement>('.slide-text');
            if (slideText) {
                slideText.style.animation = 'none';
                setTimeout(() => {
                    slideText.style.animation = 'fadeInUp 0.8s ease';
                }, 10);
            }
            
            // Re-trigger list item animations
            const listItems = this.slides[index].querySelectorAll<HTMLElement>('.responsibilities-list li');
            listItems.forEach((item, i) => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `fadeInLeft 0.6s ease ${i * 0.1}s both`;
                }, 10);
            });
        }
        
        this.currentSlide = index;
        this.updateProgress();
        this.updateButtons();
    }

    public nextSlide(): void {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    public prevSlide(): void {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    private handleKeyPress(e: KeyboardEvent): void {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.showSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.showSlide(this.totalSlides - 1);
                break;
        }
    }

    private updateProgress(): void {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    private updateButtons(): void {
        // Update previous button
        this.prevBtn.disabled = this.currentSlide === 0;
        
        // Update next button
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    private initTouchEvents(): void {
        document.addEventListener('touchstart', (e: TouchEvent) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e: TouchEvent) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
    }

    private handleSwipe(): void {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        const minSwipeDistance = 50;

        // Check if it's a horizontal swipe (more horizontal than vertical)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous slide
                this.prevSlide();
            } else {
                // Swipe left - next slide
                this.nextSlide();
            }
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                // Swipe down - previous slide
                this.prevSlide();
            } else {
                // Swipe up - next slide
                this.nextSlide();
            }
        }
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlidePresentation();
});

// Prevent default arrow key scrolling
window.addEventListener('keydown', (e: KeyboardEvent) => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End'];
    if (navigationKeys.includes(e.key)) {
        if (e.target === document.body || (e.target as HTMLElement).tagName === 'BODY') {
            e.preventDefault();
        }
    }
});

