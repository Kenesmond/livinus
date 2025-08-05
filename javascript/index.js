// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelectorAll('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('.nav-menu');
            // Change the menu icon based on state
            if (navMenu.classList.contains('.nav-menu')) {
                this.innerHTML = '✕'; // Close icon
            } else {
                this.innerHTML = '☰'; // Hamburger icon
            }
        });
    }

    // Mobile menu toggle - Fixed class names
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class for mobile menu
            navMenu.classList.toggle('nav-menu');
            menuToggle.classList.toggle('.nav-menu');
            
            // Add animation class
            menuToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
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
        const elements = document.querySelectorAll('.feature-card, .service-card, .project-card, .testimonial-card');
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
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .project-card, .testimonial-card');
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

    // Add click event to project "View Project" buttons
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would show a modal or navigate to a project detail page
            // For now, we'll just scroll to the top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to service "Learn More" links
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        const arrow = link.querySelector('i');
        link.addEventListener('mouseenter', function() {
            arrow.style.transform = 'translateX(5px)';
        });
        link.addEventListener('mouseleave', function() {
            arrow.style.transform = 'translateX(0)';
        });
    });

    // Add current year to footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Add animation to CEO section on load
    const ceoSection = document.querySelector('.CEO');
    if (ceoSection) {
        setTimeout(() => {
            ceoSection.style.opacity = '1';
            ceoSection.style.transform = 'translateY(0)';
        }, 300);
        
        // Set initial styles
        ceoSection.style.opacity = '0';
        ceoSection.style.transform = 'translateY(20px)';
        ceoSection.style.transition = 'opacity 1s ease, transform 1s ease';
    }

    // Add animation to hero section on load
    const heroSection = document.querySelector('.hero-content');
    if (heroSection) {
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 600);
        
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
    
    .feature-card,
    .service-card,
    .project-card,
    .testimonial-card {
        animation: fadeIn 0.5s ease-in-out forwards;
    }
`;
document.head.appendChild(style);