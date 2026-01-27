// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');
    const profilePic = document.getElementById('profilePic');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            // Fade out loader
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger animations after loader hides
                initAnimations();
            }, 5000);
        }
    }, 50);
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // ===== SIDEBAR FUNCTIONALITY =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Open sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close sidebar (close button)
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close sidebar (overlay click)
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close sidebar when link is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close sidebar when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Update active sidebar link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust scroll sensitivity
            if(pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Update smooth scroll to account for no navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20, // Small offset for breathing room
                    behavior: 'smooth'
                });
            }
        });
    });
    // ===== FADE-IN ANIMATIONS ON SCROLL =====
    function initAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(el => {
            // Add fade-in class to sections that should animate
            if(el.closest('.section') || el.classList.contains('project-card') || el.classList.contains('skill-item')) {
                el.classList.add('fade-in');
                observer.observe(el);
            }
        });
        
        // Animate profile picture on load
        setTimeout(() => {
            profilePic.style.opacity = '1';
            profilePic.style.transform = 'translateY(0) rotate(0)';
        }, 300);
    }
    
    // Initialize animations if loader was skipped
    if(loader.style.display === 'none') {
        initAnimations();
    }
    
    // ===== PROJECT BUTTON FUNCTIONALITY =====
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;
            alert(`Project details for "${projectTitle}" will be available soon!\n\nThis is a portfolio demo. In a production site, this would link to a detailed case study page.`);
        });
    });
    
    // ===== FORM SUBMISSION (Placeholder) =====
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! In a production site, this would send your inquiry to my email. For now, please contact me directly at msachiseka@gmail.com');
            contactForm.reset();
        });
    }
});