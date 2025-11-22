document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL ANIMATIONS (Fade In on Scroll) ---
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target all sections and cards
    const hiddenElements = document.querySelectorAll('.section, .hair-card, .hero-text, .leopard-accent');
    hiddenElements.forEach(el => el.classList.add('hidden')); // Add hidden class initially
    hiddenElements.forEach(el => observer.observe(el));


    // --- 2. ACTIVE NAVIGATION HIGHLIGHTING ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });


    // --- 3. SIMPLE LIGHTBOX (Click image to zoom) ---
    // Create the lightbox element dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('.hair-card img');
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });


    // --- 4. AUTO-UPDATE COPYRIGHT YEAR ---
    const yearSpan = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    if (yearSpan) {
        // Replaces the year in the text with the current year
        yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
    }
});
