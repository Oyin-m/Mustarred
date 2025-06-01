// main.js or script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper with modern settings
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        fadeEffect: {
            crossFade: true
        }
    });

    // Navigation scroll behavior
    const nav = document.querySelector('nav');
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroHeight = hero ? hero.offsetHeight : 80;
        // Add/remove .scrolled class for nav background/effect
        if (currentScroll > heroHeight - 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        // Always show nav (no hide-on-scroll)
        nav.style.transform = 'translateY(0)';
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenuBtn?.classList.remove('active');
                navLinks?.classList.remove('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Add staggered delay for timeline steps
                if (entry.target.classList.contains('timeline-step')) {
                    entry.target.style.animationDelay = (idx * 0.15 + 0.2) + 's';
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Add loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Here you would typically send the data to your backend
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Failed to send message. Please try again.';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Add parallax effect to hero section
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Swiper for services carousel
    if (document.querySelector('.services-swiper')) {
        new Swiper('.services-swiper', {
            slidesPerView: 1,
            spaceBetween: 32,
            loop: false,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.services-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.services-swiper .swiper-button-next',
                prevEl: '.services-swiper .swiper-button-prev',
            },
            breakpoints: {
                700: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                }
            },
        });
    }

    // Swiper for testimonials Atlanta section
    if (document.querySelector('.testimonials-swiper')) {
        new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 32,
            loop: true,
            pagination: {
                el: '.testimonials-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonials-swiper .swiper-button-next',
                prevEl: '.testimonials-swiper .swiper-button-prev',
            },
            breakpoints: {
                700: {
                    slidesPerView: 2,
                },
                1100: {
                    slidesPerView: 3,
                }
            },
        });
    }
});

// Any other independent JavaScript functions or code can go here
// (but make sure they don't depend on DOM elements before DOMContentLoaded)