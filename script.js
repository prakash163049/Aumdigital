// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Fix for Mobile Carousel Controls
document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const prevButton = heroCarousel.querySelector('.carousel-control-prev');
        const nextButton = heroCarousel.querySelector('.carousel-control-next');
        
        // Enhanced click handling for mobile
        if (prevButton && nextButton) {
            // Add touchstart event for better mobile responsiveness
            prevButton.addEventListener('touchstart', function(e) {
                e.preventDefault();
                new bootstrap.Carousel(heroCarousel).prev();
            });
            
            nextButton.addEventListener('touchstart', function(e) {
                e.preventDefault();
                new bootstrap.Carousel(heroCarousel).next();
            });
            
            // Make sure click events still work
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                new bootstrap.Carousel(heroCarousel).prev();
            });
            
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                new bootstrap.Carousel(heroCarousel).next();
            });
        }
    }
});

// Smooth Scroll for Navigation Links
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

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        // Clear form
        this.reset();
        
        // Add success message
        this.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .about-content, .contact-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
        }
    });
});

// Animated Counter for Stats
const stats = document.querySelectorAll('.stat-card h3');
const statsObserverOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            animateValue(target, 0, value, 2000);
            statsObserver.unobserve(target);
        }
    });
}, statsObserverOptions);

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize Bootstrap Tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Mobile Menu Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
const hero = document.querySelector('.hero');
        
        if (hero && scrollValue < window.innerHeight) {
            // Apply subtle parallax to hero elements on scroll
            const heroContent = document.querySelector('.hero-content');
            const heroImage = document.querySelector('.hero-image-container');
            const heroCards = document.querySelector('.hero-cards');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollValue * 0.05}px)`;
            }
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollValue * -0.08}px)`;
            }
            
            if (heroCards) {
                heroCards.style.transform = `translateY(${scrollValue * -0.03}px)`;
            }
        }
    });
    
    // Add hover effects to hero cards
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Preload hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transition = 'opacity 0.8s ease';
        
        heroImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (heroImage.complete) {
            heroImage.style.opacity = '1';
        }
    }
});

// Dropdown Menu Hover Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
            dropdownToggle.setAttribute('aria-expanded', 'true');
        });
        
        // Hide dropdown when mouse leaves
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        });
    });
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
    }
});

// Testimonials Interaction
document.addEventListener('DOMContentLoaded', function() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    const itemsPerPage = 3;
    let currentPage = 0;
    
    // Initially show only the first set of testimonials
    updateTestimonialDisplay();
    
    // Add click event to pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            updateActiveDot();
            updateTestimonialDisplay();
        });
    });
    
    function updateActiveDot() {
        paginationDots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function updateTestimonialDisplay() {
        const startIdx = currentPage * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        
        testimonialItems.forEach((item, index) => {
            if (index >= startIdx && index < endIdx) {
                item.style.display = 'flex';
                // Add animation
                item.style.animation = `fadeIn 0.5s ease forwards ${(index - startIdx) * 0.2}s`;
                item.style.opacity = '0';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Add responsive behavior for the grid
    function updateGridLayout() {
        const container = document.querySelector('.testimonials-grid');
        if (container) {
            if (window.innerWidth < 992) {
                // Show only the current testimonial on mobile
                testimonialItems.forEach((item, index) => {
                    if (index === currentPage) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                // On desktop, show items by page
                updateTestimonialDisplay();
            }
        }
    }
    
    // Listen for window resize
    window.addEventListener('resize', updateGridLayout);
    
    // Initial layout
    updateGridLayout();
});

// Hero Slider
const heroSlider = document.querySelector('.hero-slider-background');
if (heroSlider) {
    const carousel = new bootstrap.Carousel(heroSlider, {
        interval: 2000, // Set interval to 2 seconds
        wrap: true,     // Enable continuous sliding
        pause: 'hover'  // Pause on mouse hover
    });

    // Add smooth transition between slides
    heroSlider.addEventListener('slide.bs.carousel', function () {
        const activeItem = this.querySelector('.carousel-item.active');
        const nextItem = this.querySelector('.carousel-item:not(.active)');
        
        if (activeItem && nextItem) {
            activeItem.style.transition = 'opacity 0.5s ease-out';
            nextItem.style.transition = 'opacity 0.5s ease-in';
        }
    });
}

// Modern Hero Gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryFeatures = document.querySelectorAll('.gallery-feature');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    const progressFill = document.querySelector('.progress-fill');
    const currentNum = document.querySelector('.progress-numbers .current');
    const totalNum = document.querySelector('.progress-numbers .total');
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayTimer;
    const totalSlides = galleryFeatures.length;
    
    // Initialize first slide and progress
    function initGallery() {
        // Set background image for first slide
        if (galleryFeatures.length > 0) {
            const bgImage = galleryFeatures[0].getAttribute('data-bg');
            galleryFeatures[0].style.backgroundImage = `url(${bgImage})`;
        }
        
        // Set total slides number
        if (totalNum) {
            totalNum.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
        }
        
        // Load background images for all slides
        galleryFeatures.forEach((feature, index) => {
            const bgImage = feature.getAttribute('data-bg');
            if (index > 0) { // First slide is already loaded
                const img = new Image();
                img.src = bgImage;
                img.onload = () => {
                    feature.style.backgroundImage = `url(${bgImage})`;
                };
            }
        });
    }
    
    // Change slide function
    function changeSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Update current index
        const previousIndex = currentIndex;
        currentIndex = index;
        
        // Update slide display
        galleryFeatures[previousIndex].classList.remove('active');
        galleryFeatures[currentIndex].classList.add('active');
        
        // Update thumbnails
        thumbs[previousIndex].classList.remove('active');
        thumbs[currentIndex].classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }
    
    // Update progress bar and numbers
    function updateProgress() {
        // Update progress fill width
        const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update current slide number
        if (currentNum) {
            currentNum.textContent = currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1;
        }
    }
    
    // Handle next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        changeSlide(nextIndex);
    }
    
    // Handle previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        changeSlide(prevIndex);
    }
    
    // Start autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 6000);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    // Add event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    // Thumbnail clicks
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            if (index !== currentIndex) {
                changeSlide(index);
                stopAutoplay();
                startAutoplay();
            }
        });
    });
    
    // Pause on hover
    const heroGallery = document.querySelector('.hero-gallery');
    if (heroGallery) {
        heroGallery.addEventListener('mouseenter', stopAutoplay);
        heroGallery.addEventListener('mouseleave', startAutoplay);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        }
    });
    
    // Initialize gallery
    initGallery();
    
    // Start autoplay
    startAutoplay();
    
    // Add parallax scroll effect to gallery features
    window.addEventListener('scroll', function() {
        if (window.scrollY < window.innerHeight) {
            const scrollValue = window.scrollY * 0.3;
            galleryFeatures.forEach(feature => {
                feature.style.transform = `translateY(${scrollValue}px)`;
            });
        }
    });
});

// Animate counter numbers in Why Choose Us section
document.addEventListener('DOMContentLoaded', function() {
    const counterNumbers = document.querySelectorAll('.counter-number');
    const counterObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-count'));
                
                animateCounter(target, 0, targetValue, 2000);
                counterObserver.unobserve(target);
            }
        });
    }, counterObserverOptions);

    counterNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = easeOutCubic(progress);
            element.textContent = Math.floor(easeProgress * (end - start) + start);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Easing function for smoother animation
    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add staggered animation to elements inside the card
            const icon = this.querySelector('.feature-icon');
            const title = this.querySelector('h4');
            const text = this.querySelector('p');
            const btn = this.querySelector('.btn-learn');
            
            if (icon) icon.style.transform = 'scale(1.1)';
            if (title) {
                title.style.transform = 'translateY(-5px)';
                title.style.color = 'var(--primary-color)';
            }
            if (text) text.style.transform = 'translateY(-3px)';
            if (btn) {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            const title = this.querySelector('h4');
            const text = this.querySelector('p');
            const btn = this.querySelector('.btn-learn');
            
            if (icon) icon.style.transform = '';
            if (title) {
                title.style.transform = '';
                title.style.color = '';
            }
            if (text) text.style.transform = '';
            if (btn) {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
            }
        });
    });
});

// Animate particles in Why Choose Us section
document.addEventListener('DOMContentLoaded', function() {
    // Get the particles container
    const particlesContainer = document.querySelector('.why-choose-us .animated-particles');
    
    if (particlesContainer) {
        // Add more dynamic particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle dynamic-particle';
            
            // Random positioning and size
            const size = Math.random() * 80 + 20; // Between 20px and 100px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity and blur
            const opacity = Math.random() * 0.08 + 0.02; // Between 0.02 and 0.1
            const blur = Math.random() * 8 + 2; // Between 2px and 10px
            
            // Apply styles
            particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            particle.style.filter = `blur(${blur}px)`;
            
            // Random animation duration and delay
            const animDuration = Math.random() * 30 + 20; // Between 20s and 50s
            const animDelay = Math.random() * 15; // Between 0s and 15s
            
            particle.style.animation = `float ${animDuration}s ${animDelay}s infinite ease-in-out`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
        
        // Parallax effect for particles on mouse move
        const whyChooseUs = document.querySelector('.why-choose-us');
        if (whyChooseUs) {
            whyChooseUs.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                const particles = document.querySelectorAll('.why-choose-us .particle');
                particles.forEach((particle, index) => {
                    const depth = 0.05 + (index % 5) * 0.01; // Different depths for different particles
                    const moveX = (mouseX - 0.5) * depth * 100; // Move up to depth*100 pixels
                    const moveY = (mouseY - 0.5) * depth * 100;
                    
                    // Apply transform in addition to existing animations
                    particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });
            
            // Reset transforms when mouse leaves the section
            whyChooseUs.addEventListener('mouseleave', function() {
                const particles = document.querySelectorAll('.why-choose-us .particle');
                particles.forEach(particle => {
                    particle.style.transform = '';
                });
            });
        }
    }
});

// Add subtle animation to icons in Why Choose Us section
document.addEventListener('DOMContentLoaded', function() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        // Add pulse animation
        setInterval(() => {
            icon.classList.add('pulse-animation');
            
            // Remove class after animation completes
            setTimeout(() => {
                icon.classList.remove('pulse-animation');
            }, 1000);
        }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    });
});

// Parallax effect for half-hidden text on mouse move
document.addEventListener('DOMContentLoaded', function() {
    const halfHiddenText = document.querySelector('.half-hidden-text');
    const whyChooseUs = document.querySelector('.why-choose-us');
    
    if (halfHiddenText && whyChooseUs) {
        whyChooseUs.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Calculate movement amount (larger value = more movement)
            const moveX = (mouseX - 0.5) * 30; 
            const moveY = (mouseY - 0.5) * 30;
            
            // Apply transform while preserving the rotation animation
            halfHiddenText.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
        
        // Reset position when mouse leaves
        whyChooseUs.addEventListener('mouseleave', function() {
            halfHiddenText.style.transform = 'translate(-50%, -50%)';
        });
    }
});

// Parallax effect for half-hidden text in Values section
document.addEventListener('DOMContentLoaded', function() {
    const valuesSection = document.querySelector('.values');
    const valuesHalfHiddenText = document.querySelector('.values .half-hidden-text');
    
    if (valuesHalfHiddenText && valuesSection) {
        valuesSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Calculate movement amount (larger value = more movement)
            const moveX = (mouseX - 0.5) * 40; 
            const moveY = (mouseY - 0.5) * 40;
            
            // Apply transform while preserving the rotation animation
            valuesHalfHiddenText.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
        
        // Reset position when mouse leaves
        valuesSection.addEventListener('mouseleave', function() {
            valuesHalfHiddenText.style.transform = 'translate(-50%, -50%)';
        });
    }
});

// Add dynamic particles to Values section
document.addEventListener('DOMContentLoaded', function() {
    const valuesParticlesContainer = document.querySelector('.values .animated-particles');
    
    if (valuesParticlesContainer) {
        // Add more dynamic particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle dynamic-particle';
            
            // Random positioning and size
            const size = Math.random() * 60 + 20; // Between 20px and 80px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity and blur
            const opacity = Math.random() * 0.07 + 0.02; // Between 0.02 and 0.09
            const blur = Math.random() * 6 + 2; // Between 2px and 8px
            
            // Apply styles
            particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            particle.style.filter = `blur(${blur}px)`;
            
            // Random animation duration and delay
            const animDuration = Math.random() * 25 + 15; // Between 15s and 40s
            const animDelay = Math.random() * 10; // Between 0s and 10s
            
            particle.style.animation = `float ${animDuration}s ${animDelay}s infinite ease-in-out`;
            
            // Add to container
            valuesParticlesContainer.appendChild(particle);
        }
    }
});

// Custom tabs for Core Values section
document.addEventListener('DOMContentLoaded', function() {
    // Core Values tabs functionality
    const valueTabs = document.querySelectorAll('.value-tab');
    const valueContentPanels = document.querySelectorAll('.value-content-panel');
    
    console.log("[Debug] Found Value Tabs:", valueTabs.length, "Content Panels:", valueContentPanels.length);
    
    if (valueTabs.length > 0 && valueContentPanels.length > 0) {
        // Add click event listeners to all tabs
        valueTabs.forEach((tab, index) => {
            console.log(`[Debug] Setting up tab ${index} with target: ${tab.getAttribute('data-target')}`);
            
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the target panel id
                const targetId = this.getAttribute('data-target');
                console.log(`[Debug] Tab clicked: ${targetId}`);
                
                const targetPanel = document.getElementById(targetId);
                
                if (!targetPanel) {
                    console.error(`[Debug] Target panel #${targetId} not found!`);
                    return;
                }
                
                console.log(`[Debug] Found target panel: ${targetId}`);
                
                // Remove active class from all tabs and panels
                valueTabs.forEach(t => t.classList.remove('active'));
                valueContentPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to current tab and panel
                this.classList.add('active');
                
                // Show the target panel with a slight delay for animation
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    animateValuePanelContent(targetPanel);
                }, 50);
            });
        });
        
        // Initialize first tab if none is active
        if (!document.querySelector('.value-content-panel.active')) {
            const firstTab = valueTabs[0];
            const firstPanelId = firstTab.getAttribute('data-target');
            const firstPanel = document.getElementById(firstPanelId);
            
            console.log(`[Debug] Initializing first tab: ${firstPanelId}`);
            
            if (firstPanel) {
                firstTab.classList.add('active');
                firstPanel.classList.add('active');
                animateValuePanelContent(firstPanel);
            } else {
                console.error(`[Debug] First panel #${firstPanelId} not found!`);
            }
        }
    } else {
        console.error("[Debug] Could not find value tabs or content panels");
    }
    
    function animateValuePanelContent(panel) {
        const featureIcon = panel.querySelector('.value-feature-icon');
        const valueTitle = panel.querySelector('.value-title');
        const valueDesc = panel.querySelector('.value-description');
        const valuePoints = panel.querySelectorAll('.value-points li');
        
        // Reset all animations
        if (featureIcon) {
            featureIcon.style.opacity = '0';
            featureIcon.style.transform = 'scale(0.8)';
        }
        
        if (valueTitle) {
            valueTitle.style.opacity = '0';
            valueTitle.style.transform = 'translateY(15px)';
        }
        
        if (valueDesc) {
            valueDesc.style.opacity = '0';
            valueDesc.style.transform = 'translateY(15px)';
        }
        
        valuePoints.forEach(point => {
            point.style.opacity = '0';
            point.style.transform = 'translateX(20px)';
        });
        
        // Apply animations with staggered timing
        if (featureIcon) {
            setTimeout(() => {
                featureIcon.style.opacity = '1';
                featureIcon.style.transform = 'scale(1)';
                featureIcon.style.transition = 'all 0.6s ease-out';
            }, 100);
        }
        
        if (valueTitle) {
            setTimeout(() => {
                valueTitle.style.opacity = '1';
                valueTitle.style.transform = 'translateY(0)';
                valueTitle.style.transition = 'all 0.5s ease-out';
            }, 250);
        }
        
        if (valueDesc) {
            setTimeout(() => {
                valueDesc.style.opacity = '1';
                valueDesc.style.transform = 'translateY(0)';
                valueDesc.style.transition = 'all 0.5s ease-out';
            }, 400);
        }
        
        valuePoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '1';
                point.style.transform = 'translateX(0)';
                point.style.transition = 'all 0.4s ease-out';
            }, 550 + (index * 100));
        });
    }
});

// New Core Values Hexagon Grid Interaction
document.addEventListener('DOMContentLoaded', function() {
    const honeycombItems = document.querySelectorAll('.honeycomb-item');
    const valueDetailPanels = document.querySelectorAll('.value-detail-panel');
    const valuesDetails = document.querySelector('.values-details');
    
    if (honeycombItems.length > 0 && valueDetailPanels.length > 0) {
        // Add click event to each hexagon item
        honeycombItems.forEach(item => {
            item.addEventListener('click', function() {
                const valueTarget = this.getAttribute('data-value');
                
                // Remove active class from all items
                honeycombItems.forEach(hex => hex.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update detail panels
                valueDetailPanels.forEach(panel => {
                    panel.classList.remove('active');
                    
                    if (panel.id === valueTarget) {
                        setTimeout(() => {
                            panel.classList.add('active');
                            // Scroll to details section
                            valuesDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 300);
                    }
                });
                
                // Show details container
                valuesDetails.style.height = 'auto';
                valuesDetails.style.opacity = '1';
                valuesDetails.style.padding = '40px';
                valuesDetails.style.marginBottom = '50px';
            });
            
            // Add hover effects
            item.addEventListener('mouseenter', function() {
                const hoverContent = this.querySelector('.hover-content');
                if (hoverContent) {
                    hoverContent.style.opacity = '1';
                    hoverContent.style.maxHeight = '200px';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const hoverContent = this.querySelector('.hover-content');
                if (hoverContent && !this.classList.contains('active')) {
                    hoverContent.style.opacity = '0';
                    hoverContent.style.maxHeight = '0';
                }
            });
        });
        
        // Initialize first hexagon as active
        const firstHexagon = honeycombItems[0];
        const firstPanelId = firstHexagon.getAttribute('data-value');
        const firstPanel = document.getElementById(firstPanelId);
        
        if (firstHexagon && firstPanel) {
            firstHexagon.classList.add('active');
            firstPanel.classList.add('active');
            
            // Show details container
            valuesDetails.style.height = 'auto';
            valuesDetails.style.opacity = '1';
            valuesDetails.style.padding = '40px';
            valuesDetails.style.marginBottom = '50px';
        }
        
        // Add particle animation to values section
        const valuesSection = document.querySelector('.values');
        if (valuesSection) {
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle dynamic-particle';
                
                // Random size between 30px and 120px
                const size = Math.random() * 90 + 30;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random opacity and blur
                const opacity = Math.random() * 0.06 + 0.02;
                const blur = Math.random() * 6 + 2;
                
                particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
                particle.style.filter = `blur(${blur}px)`;
                
                // Random animation
                const duration = Math.random() * 30 + 20;
                const delay = Math.random() * 10;
                
                particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
                
                // Add to container
                valuesSection.appendChild(particle);
            }
        }
    }
});

// Mission & Vision Section Animations
document.addEventListener('DOMContentLoaded', function() {
    const missionVisionSection = document.querySelector('.mission-vision');
    const particlesContainer = document.querySelector('.mission-vision-particles');
    
    if (missionVisionSection && particlesContainer) {
        // Create particles
        for (let i = 0; i < 10; i++) {
            createParticle(particlesContainer);
        }
        
        // Add parallax effect
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const missionCard = document.querySelector('.mission-card');
            const visionCard = document.querySelector('.vision-card');
            
            if (isElementInViewport(missionVisionSection)) {
                const offset = scrollPosition * 0.2;
                
                if (missionCard) {
                    missionCard.style.transform = `translateY(${-offset * 0.3}px)`;
                }
                
                if (visionCard) {
                    visionCard.style.transform = `translateY(${-offset * 0.3}px)`;
                }
            }
        });
        
        // Add hover effects
        const missionIcon = document.querySelector('.mission-icon');
        const visionIcon = document.querySelector('.vision-icon');
        
        if (missionIcon) {
            missionIcon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            missionIcon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
        
        if (visionIcon) {
            visionIcon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(-5deg)';
            });
            
            visionIcon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }
    
    // Function to create a single particle
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('mission-particle');
        
        // Random size between 30px and 200px
        const size = Math.random() * 170 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity and blur
        const opacity = Math.random() * 0.07 + 0.03;
        const blur = Math.random() * 10 + 5;
        
        particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        particle.style.filter = `blur(${blur}px)`;
        
        // Random animation delay
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(particle);
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});

// 3D Prism Core Values Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get all prism items and the prism ring
    const prismItems = document.querySelectorAll('.prism-item');
    const prismRing = document.querySelector('.prism-ring');
    
    if (prismItems.length > 0 && prismRing) {
        // Add click event handlers to each prism item
        prismItems.forEach(item => {
            item.addEventListener('click', function() {
                // Pause the rotation animation when an item is clicked
                prismRing.style.animationPlayState = 'paused';
                
                // Get the rotation of the clicked item
                const value = this.getAttribute('data-value');
                
                // Remove active class from all items
                prismItems.forEach(prism => {
                    prism.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Rotate the ring to center the clicked item
                let rotateY = 0;
                if (value === 'integrity') rotateY = -90;
                if (value === 'collaboration') rotateY = -180;
                if (value === 'excellence') rotateY = -270;
                
                prismRing.style.transform = `rotateY(${rotateY}deg)`;
                
                // Bring the clicked item forward
                setTimeout(() => {
                    this.style.transform = `rotateY(${-rotateY}deg) translateZ(430px) scale(1.1)`;
                    this.style.zIndex = 10;
                }, 100);
            });
            
            // Reset when mouse leaves
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    // Reset the transform based on its original position
                    const index = Array.from(prismItems).indexOf(this);
                    const angle = index * 90;
                    this.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
                    this.style.zIndex = 1;
                }
            });
        });
        
        // Add dynamic hover effect for the prism buttons
        const prismButtons = document.querySelectorAll('.prism-button');
        prismButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                const parentItem = this.closest('.prism-item');
                if (parentItem) {
                    const icon = parentItem.querySelector('.prism-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.1) translateY(-10px)';
                    }
                }
            });
            
            button.addEventListener('mouseleave', function() {
                const parentItem = this.closest('.prism-item');
                if (parentItem) {
                    const icon = parentItem.querySelector('.prism-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1)';
                    }
                }
            });
        });
        
        // Mobile version interactions
        const mobileItems = document.querySelectorAll('.values-mobile-item');
        mobileItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileItems.forEach(mobileItem => {
                    mobileItem.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        // Add 3D effect on mouse move (parallax)
        const valuesSection = document.querySelector('.values');
        if (valuesSection) {
            valuesSection.addEventListener('mousemove', function(e) {
                const { clientX, clientY } = e;
                const { left, top, width, height } = valuesSection.getBoundingClientRect();
                
                const x = (clientX - left) / width;
                const y = (clientY - top) / height;
                
                const moveX = 20 * (x - 0.5);
                const moveY = 20 * (y - 0.5);
                
                prismItems.forEach(item => {
                    // Only apply the effect to items that are not active
                    if (!item.classList.contains('active')) {
                        item.style.transform = `rotateY(${item.dataset.originalRotateY || '0deg'}) translateZ(400px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
                    }
                });
            });
            
            // Reset on mouse leave
            valuesSection.addEventListener('mouseleave', function() {
                prismItems.forEach((item, index) => {
                    if (!item.classList.contains('active')) {
                        const angle = index * 90;
                        item.style.transform = `rotateY(${angle}deg) translateZ(400px)`;
                    }
                });
            });
        }
        
        // Store original rotation values for reference
        prismItems.forEach((item, index) => {
            item.dataset.originalRotateY = `${index * 90}deg`;
        });
    }
});

// Add to beginning of script.js or after any existing document ready function

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles for hero section
    if (document.getElementById('hero-particles')) {
        initHeroParticles();
    }
    
    // Initialize number counters in hero section
    initCounters();
    
    // Add smooth scroll for navigation links
    addSmoothScroll();
});

// Particle animation for hero section
function initHeroParticles() {
    particlesJS('hero-particles', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#4361ee",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.6
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Number counter animation
function initCounters() {
    const counterElements = document.querySelectorAll('.hero-stat-number');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // ms
        const increment = Math.ceil(target / (duration / 50)); // Update every 50ms
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = current;
                setTimeout(updateCounter, 50);
            }
        };
        
        // Delay start of animation for staggered effect
        setTimeout(() => {
            updateCounter();
        }, 500);
    });
}

// Smooth scrolling for navigation links
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggler = document.querySelector('.navbar-toggler');
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse.classList.contains('show')) {
                    navToggler.click();
                }
            }
        });
    });
}

// Add the particles.js configuration for the hero section
document.addEventListener("DOMContentLoaded", function() {
    // Initialize particles.js for the hero section
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4361ee"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4361ee",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize counter animation for stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / 50;
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCount, 30);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.querySelector('.slider-nav-btn.prev');
    const nextBtn = document.querySelector('.slider-nav-btn.next');
    const dots = document.querySelectorAll('.slider-dot');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize slider
    function initSlider() {
        updateSlider();
        setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    }
    
    // Update slider position
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Initialize slider
    initSlider();
}); 