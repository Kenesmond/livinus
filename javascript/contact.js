document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelectorAll('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change the menu icon based on state
            if (navMenu.classList.contains('active')) {
                this.innerHTML = '✕'; // Close icon
            } else {
                this.innerHTML = '☰'; // Hamburger icon
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navMenuLinks = document.querySelectorAll('.nav-menu a');
    navMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    });

    // Mobile menu toggle - Fixed class names
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class for mobile menu
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Add animation class
            menuToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
        });
    }

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset form status
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.classList.add('error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                return;
            }
            
            // Simulate form submission (in a real app, you would use AJAX/Fetch)
            formStatus.textContent = 'Sending your message...';
            formStatus.classList.add('success');
            
            setTimeout(() => {
                formStatus.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
                
                // Scroll to show success message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-card, .contact-form-section, .map-container, .cta-content');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const animationPoint = 150;
            
            if (elementPosition < windowHeight - animationPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.contact-card, .contact-form-section, .map-container, .cta-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add hover effect to social media icons
    const socialIcons = document.querySelectorAll('.social-links a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add current year to footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Add animation to hero section on load
    const heroSection = document.querySelector('.contact-hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
        
        // Set initial styles
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
    }
});

// Add CSS for animations directly via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .contact-card,
    .contact-form-section,
    .map-container,
    .cta-content {
        animation: fadeIn 0.5s ease-in-out forwards;
    }
`;
document.head.appendChild(style);