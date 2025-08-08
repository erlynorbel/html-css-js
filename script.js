// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    const body = document.body;
    const toggleBtn = document.getElementById('themeToggle');
    const setIcon = (dark) => {
        if (!toggleBtn) return;
        toggleBtn.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
        toggleBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        toggleBtn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    };
    if (isDark) {
        body.classList.add('dark-theme');
    }
    setIcon(isDark);

    // Toggle theme on button click
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const nowDark = !body.classList.contains('dark-theme');
            body.classList.toggle('dark-theme');
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
            setIcon(nowDark);
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const contactAlert = document.getElementById('contactAlert');
    const contactAlertClose = document.getElementById('contactAlertClose');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Helper to show alert modal-like
            const showFormAlert = (msg, type = 'info', title = 'Notice') => {
                if (!contactAlert) return;
                const content = contactAlert.querySelector('.contact-alert-content');
                const body = contactAlert.querySelector('.contact-alert-body');
                const heading = contactAlert.querySelector('#contactAlertTitle');
                // Reset type classes
                content.classList.remove('success', 'error', 'info');
                content.classList.add(type);
                heading.textContent = title;
                body.textContent = msg;
                contactAlert.classList.add('show');
                contactAlert.setAttribute('aria-hidden', 'false');
            };

            // Validation - only Name and Email are required
            if (!name || !email) {
                showFormAlert('Please fill in Name and Email fields.', 'error', 'Form Error');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address.', 'error', 'Invalid Email');
                return;
            }
            
            // Show success alert
            showFormAlert('Thank you! Your message has been sent successfully.', 'success', 'Message Sent');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Close contact alert
    if (contactAlertClose && contactAlert) {
        contactAlertClose.addEventListener('click', () => {
            contactAlert.classList.remove('show');
            contactAlert.setAttribute('aria-hidden', 'true');
        });
    }

    // Click behaviors: card color changes on card click; background color changes on background click
    const portfolioSection = document.getElementById('portfolio');
    const projectCards = document.querySelectorAll('.project-card');
    const bgColors = ['#7300ff', '#ffee00', '#ff00d9', '#00ff1a', '#4b76a2'];
    const cardColors = ['#E3F2FD', '#FFF3CD', '#FCE4EC', '#E8F5E9', '#EDE7F6'];
    let bgIndex = 0;
    let cardIndex = 0;

    // Change only the clicked card's background color (cycle through soft tints)
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent triggering section background change
            card.style.backgroundColor = cardColors[cardIndex];
            cardIndex = (cardIndex + 1) % cardColors.length;
        });
    });

    // Clicking the background (not on a card) changes the portfolio section background
    if (portfolioSection) {
        portfolioSection.addEventListener('click', (e) => {
            if (!e.target.closest('.project-card')) {
                portfolioSection.style.backgroundColor = bgColors[bgIndex];
                bgIndex = (bgIndex + 1) % bgColors.length;
            }
        });
    }
    
});
