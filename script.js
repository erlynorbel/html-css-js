// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    


    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';   
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });



    // Navbar visibility control
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarVisibility() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Show navbar only on about, projects, and contact sections
        if (currentSection === 'about' || currentSection === 'projects' || currentSection === 'contact') {
            navbar.style.display = 'block';
        } else {
            navbar.style.display = 'none';
        }
    }
    
    // Update navbar visibility on scroll
    window.addEventListener('scroll', updateNavbarVisibility);
    
    // Initial check
    updateNavbarVisibility();

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                return;
            }
            
            if (!isValidEmail(email)) {
                return;
            }
            
            // Simulate form submission
            this.reset();
        });
    }

    // Project card interactions with rainbow effect
    const projectCards = document.querySelectorAll('.card');
    const rainbowColors = [
        '#FF6B6B', // Red
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Green
        '#FFEAA7', // Yellow
        '#DDA0DD', // Plum
        '#98D8C8', // Mint
        '#F7DC6F', // Gold
        '#BB8FCE', // Purple
        '#85C1E9'  // Sky Blue
    ];
    
    projectCards.forEach((card, index) => {
        let colorIndex = 0;
        let isAnimating = false;
        
        // Add click event to the entire card
        card.addEventListener('click', function(e) {
            if (isAnimating) return; // Prevent multiple clicks during animation
            
            isAnimating = true;
            const originalTransform = this.style.transform;
            const originalBoxShadow = this.style.boxShadow;
            
            // Get next rainbow color
            const newColor = rainbowColors[colorIndex];
            colorIndex = (colorIndex + 1) % rainbowColors.length;
            
            // Add rainbow animation class
            this.classList.add('rainbow-active');
            
            // Animate the color change
            this.style.transition = 'all 0.3s ease';
            this.style.backgroundColor = newColor;
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = `0 25px 50px ${newColor}40`;
            
            // Add a subtle glow effect
            this.style.filter = 'brightness(1.1)';
            

            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = originalTransform;
                this.style.boxShadow = originalBoxShadow;
                this.style.filter = 'brightness(1)';
                this.classList.remove('rainbow-active');
                
                // Fade back to original
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.transition = 'all 0.3s ease';
                    isAnimating = false;
                }, 300);
            }, 600);
        });
        
        // Prevent button click from triggering card click
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
            });
        }
    });

    // Social media links - now open in new tabs, so no need for notifications
    const socialLinks = document.querySelectorAll('footer a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the link open naturally in new tab
            // No need to prevent default or show notification
        });
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }







    // Mobile menu toggle enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            // Add smooth animation
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.style.display = 'block';
                setTimeout(() => {
                    navbarCollapse.style.opacity = '1';
                    navbarCollapse.style.transform = 'translateY(0)';
                }, 10);
            } else {
                navbarCollapse.style.opacity = '0';
                navbarCollapse.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    navbarCollapse.style.display = 'none';
                }, 300);
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
                navbarCollapse.style.opacity = '0';
                navbarCollapse.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    navbarCollapse.style.display = 'none';
                }, 300);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                navbarCollapse.style.opacity = '0';
                navbarCollapse.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    navbarCollapse.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation intensity on mobile for better performance
        const animatedElements = document.querySelectorAll('.card, #about img');
        animatedElements.forEach(el => {
            el.style.transition = 'all 0.2s ease';
        });
        
        // Optimize scroll behavior for mobile
        let isScrolling = false;
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
        
        // Improve touch interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        

    }

    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary position-fixed';
    scrollToTopBtn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

});
