// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Validation - only Name and Email are required
            if (!name || !email) {
                alert('Please fill in Name and Email fields.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success alert
            alert('Thank you! Your message has been sent successfully.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Project title click functionality - changes portfolio section background color
    const projectTitles = document.querySelectorAll('.project-title');
    const portfolioSection = document.getElementById('portfolio');
    const colors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd'];
    let colorIndex = 0;
    
    projectTitles.forEach(title => {
        title.addEventListener('click', function() {
            portfolioSection.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
            
            // Reset to original color after cycling through all colors
            if (colorIndex === 0) {
                setTimeout(() => {
                    portfolioSection.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
});
