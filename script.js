// Navigation Animations
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Add form submission animation
            contactForm.classList.add('form-submitted');

            // Simulate form submission
            setTimeout(() => {
                // Show success message with fade-in animation
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 10);

                // Reset form
                contactForm.reset();
                contactForm.style.display = 'none';

                // Hide success message and restore form after 3 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        contactForm.style.display = 'block';
                        contactForm.classList.remove('form-submitted');
                    }, 300);
                }, 3000);
            }, 1000);
        });

        // Add input focus animations
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            // Initial check for pre-filled inputs
            if (input.value) {
                input.closest('.form-group').classList.add('focused');
            }

            input.addEventListener('focus', function() {
                this.closest('.form-group').classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.closest('.form-group').classList.remove('focused');
                }
            });

            // Add typing animation effect
            input.addEventListener('input', function() {
                this.style.borderColor = 'var(--neon-green)';
                clearTimeout(this.typingTimer);
                this.typingTimer = setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            });
        });
    }

    // Counter Animation
    function animateCounter(element, target) {
        const duration = 3000;
        const start = 0;
        const frames = duration / 16;
        let frame = 0;
        
        const easeOutElastic = (x) => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        };
        
        const updateCounter = () => {
            frame++;
            const progress = frame / frames;
            const easedProgress = easeOutElastic(progress);
            const current = Math.min(target, Math.floor(target * easedProgress));
            
            element.textContent = current + '+';

            // Update data-level attribute based on current value
            const card = element.closest('.stat-card');
            if (current >= 400) {
                card.setAttribute('data-level', '4');
            } else if (current >= 200) {
                card.setAttribute('data-level', '3');
            } else if (current >= 100) {
                card.setAttribute('data-level', '2');
            } else {
                card.setAttribute('data-level', '1');
            }
            
            if (frame < frames) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    }

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe all counter elements
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Intersection Observer for service cards reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all service cards, expertise cards and timeline nodes
    document.querySelectorAll('.service-card, .expertise-card, .timeline-nodes').forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(element);
    });

    // Add staggered delay to expertise card list items
    document.querySelectorAll('.expertise-card ul li').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add staggered delay to list items
    document.querySelectorAll('.service-card ul li').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    // Active link handler
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.href === currentLocation) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down and past threshold
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.15)';
        }

        lastScroll = currentScroll;
    });

    // Matrix effect for brand hover
    const brand = document.querySelector('.navbar-brand');
    const brandText = brand.querySelector('span');
    
    if(brandText) {
        const originalText = brandText.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        
        brand.addEventListener('mouseover', () => {
            let iteration = 0;
            const interval = setInterval(() => {
                brandText.textContent = brandText.textContent.split('')
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if(iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 1/3;
            }, 30);
        });
    }
});