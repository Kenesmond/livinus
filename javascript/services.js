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

    // Services Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                    // Add animation when showing
                    tabContent.style.animation = 'fadeIn 0.5s ease-in-out';
                }
            });
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
        const elements = document.querySelectorAll('.service-card, .step, .service-detail');
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
    const animatedElements = document.querySelectorAll('.service-card, .step, .service-detail');
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

    // Add click event to service cards to show/hide additional content
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const additionalContent = card.querySelector('.service-design');
        if (additionalContent) {
            card.addEventListener('click', function(e) {
                // Don't toggle if clicking on a link
                if (e.target.tagName === 'A' || e.target.tagName === 'I') return;
                
                additionalContent.classList.toggle('active');
                if (additionalContent.classList.contains('active')) {
                    card.style.zIndex = '10';
                } else {
                    setTimeout(() => {
                        card.style.zIndex = '';
                    }, 300);
                }
            });
        }
    });

    // Add current year to footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Add animation to hero section on load
    const heroSection = document.querySelector('.services-hero');
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
    
    .service-design {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease, padding 0.5s ease;
    }
    
    .service-design.active {
        max-height: 1000px;
    }
    
    .tab-content {
        animation: fadeIn 0.5s ease-in-out forwards;
    }
`;
document.head.appendChild(style);