// ===================================
// 💰 PREISE HIER ANPASSEN! 
// ===================================
// Ändere einfach die Zahlen unten, um die Preise anzupassen
// Die Preise werden automatisch überall auf der Website aktualisiert

const PREISE = {
    haltung: 15.00,      // 🌿 Haltungsfächer Preis in €
    reflexion: 15.00,    // 🌸 Reflexionsfächer Preis in €
    kompetenz: 15.00     // 🌻 Kompetenzfächer Preis in €
};

// ===================================
// AB HIER NICHTS MEHR ÄNDERN (außer du weißt was du tust 😉)
// ===================================

// ===========================
// MODAL FUNKTIONALITÄT
// ===========================

const modal = document.getElementById('faecherModal');
const modalOverlay = modal?.querySelector('.modal-overlay');
const modalClose = modal?.querySelector('.modal-close');
const faecherCards = document.querySelectorAll('.faecher-card');

let currentGalleryIndex = 0;
let currentFaecherImages = [];

// Fächer Card Click Handler
faecherCards.forEach(card => {
    card.addEventListener('click', () => {
        const faecherType = card.getAttribute('data-faecher');
        openModal(faecherType);
    });
});

// Modal öffnen
function openModal(faecherType) {
    const data = faecherData[faecherType];
    if (!data) return;
    
    // Modal Inhalt füllen
    modal.querySelector('.modal-emoji').textContent = data.emoji;
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-tagline').textContent = data.tagline;
    modal.querySelector('.modal-description').innerHTML = data.description;
    
    // Galerie aufbauen
    currentFaecherImages = data.images;
    currentGalleryIndex = 0;
    buildGallery(data.images);
    
    // Modal anzeigen
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll-Hinweis Setup für Mobile
    const modalInfo = modal.querySelector('.modal-info');
    const scrollHint = modal.querySelector('.scroll-hint');
    
    if (modalInfo && scrollHint && window.innerWidth <= 768) {
        // Scroll-Hinweis ausblenden beim Scrollen
        const hideScrollHint = () => {
            if (modalInfo.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                scrollHint.style.transform = 'translateY(-10px)';
            } else {
                scrollHint.style.opacity = '0.7';
                scrollHint.style.transform = 'translateY(0)';
            }
        };
        
        modalInfo.addEventListener('scroll', hideScrollHint);
    }
}

// Modal schließen
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

// ESC Taste zum Schließen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===========================
// GALERIE FUNKTIONALITÄT
// ===========================

function buildGallery(images) {
    const galleryTrack = modal.querySelector('.gallery-track');
    const galleryDots = modal.querySelector('.gallery-dots');
    
    if (!galleryTrack || !galleryDots) return;
    
    // Galerie leeren
    galleryTrack.innerHTML = '';
    galleryDots.innerHTML = '';
    
    if (images.length === 0) {
        galleryTrack.innerHTML = '<div class="gallery-slide"><p style="padding: 3rem; text-align: center; color: #999;">Bilder folgen in Kürze...</p></div>';
        return;
    }
    
    // Slides erstellen
    images.forEach((imagePath, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${imagePath}" alt="Fächer Karte ${index + 1}">`;
        galleryTrack.appendChild(slide);
        
        // Dots erstellen
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });
    
    updateGallery();
}

function updateGallery() {
    const galleryTrack = modal.querySelector('.gallery-track');
    const dots = modal.querySelectorAll('.gallery-dot');
    
    if (!galleryTrack) return;
    
    // Button-Text aktualisieren
    updateSubmitButton(subtotal);
}

function updateSubmitButton(total) {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        if (total > 0) {
            submitBtn.textContent = `Anfrage senden (${formatPrice(total)}) 🪶`;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            // Swipe right - prev slide
            prevSlide();
        }
    }
}

function updatePriceDisplay() {
    // Aktualisiere Preisanzeigen im Formular
    document.querySelectorAll('[data-price]').forEach(element => {
        const type = element.getAttribute('data-price');
        if (PREISE[type]) {
            element.textContent = `${formatPrice(PREISE[type])} / Stück`;
        }
    });
}

// Event Listeners für Quantity Controls
document.addEventListener('DOMContentLoaded', () => {
    updatePriceDisplay();
    calculatePrices(); // Initial calculation
    
    // Plus/Minus Buttons
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (!input) return;
            
            let value = parseInt(input.value) || 0;
            const max = parseInt(input.getAttribute('max')) || 99;
            const min = parseInt(input.getAttribute('min')) || 0;
            
            if (button.classList.contains('plus')) {
                value = Math.min(value + 1, max);
            } else if (button.classList.contains('minus')) {
                value = Math.max(value - 1, min);
            }
            
            input.value = value;
            calculatePrices();
        });
    });
    
    // Input-Felder direkt bearbeiten
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('input', () => {
            let value = parseInt(input.value) || 0;
            const max = parseInt(input.getAttribute('max')) || 99;
            const min = parseInt(input.getAttribute('min')) || 0;
            
            value = Math.max(min, Math.min(value, max));
            input.value = value;
            calculatePrices();
        });
    });
});

// ===================================
// MOBILE NAVIGATION
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close modal if open
            const modal = document.getElementById('fanModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(47, 69, 56, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(47, 69, 56, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===========================

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

// Elemente für Animation vorbereiten
document.querySelectorAll('.faecher-card, .about-text, .sketch-cards').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            qtyHaltung: document.getElementById('qty-haltung').value,
            qtyReflexion: document.getElementById('qty-reflexion').value,
            qtyKompetenz: document.getElementById('qty-kompetenz').value,
            message: document.getElementById('message').value,
            totalPrice: document.querySelector('.total-price strong').textContent
        };
        
        // Berechne Gesamtanzahl
        const totalQty = parseInt(formData.qtyHaltung) + parseInt(formData.qtyReflexion) + parseInt(formData.qtyKompetenz);
        
        if (totalQty === 0) {
            alert('Bitte wähle mindestens einen Fächer aus.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        
        console.log('Anfrage gesendet:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: #6B8E23;
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin-top: 1rem;
            animation: fadeInUp 0.5s ease;
        `;
        
        let orderSummary = '<ul style="list-style: none; padding: 0; margin: 0.5rem 0;">';
        if (formData.qtyHaltung > 0) orderSummary += `<li>🌿 ${formData.qtyHaltung}x Haltungsfächer</li>`;
        if (formData.qtyReflexion > 0) orderSummary += `<li>🌸 ${formData.qtyReflexion}x Reflexionsfächer</li>`;
        if (formData.qtyKompetenz > 0) orderSummary += `<li>🌻 ${formData.qtyKompetenz}x Kompetenzfächer</li>`;
        orderSummary += '</ul>';
        
        successMessage.innerHTML = `
            <h3 style="margin-bottom: 0.5rem;">🎉 Anfrage erfolgreich gesendet!</h3>
            ${orderSummary}
            <p style="margin-top: 0.5rem;"><strong>Gesamt: ${formData.totalPrice}</strong></p>
            <p style="font-size: 0.9rem; margin-top: 1rem;">Ich melde mich in Kürze per E-Mail bei dir mit allen Details zur Bezahlung und zum Versand.</p>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        calculatePrices(); // Preise zurücksetzen
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 8 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => successMessage.remove(), 500);
        }, 8000);
    });
}

// ===================================
// FAN CARD HOVER EFFECTS
// ===================================

document.querySelectorAll('.fan-card, .fan-card-large').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// ===================================
// PARALLAX EFFECT FOR HERO PORTRAIT
// ===================================

const heroPortrait = document.querySelector('.hero-portrait');

if (heroPortrait) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroPortrait.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ===================================
// ADD DECORATIVE ELEMENTS DYNAMICALLY
// ===================================

function addDecorativeElements() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add subtle background pattern
        const pattern = document.createElement('div');
        pattern.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 4rem;
            opacity: 0.05;
            pointer-events: none;
            z-index: 0;
        `;
        
        const emojis = ['🌿', '🌸', '🌻'];
        pattern.textContent = emojis[index % 3];
        
        card.style.position = 'relative';
        card.appendChild(pattern);
    });
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    addDecorativeElements();
    highlightNavigation();
});

// ===================================
// EASTER EGG: CONFETTI ON BUTTON CLICK
// ===================================

function createConfetti(x, y) {
    const colors = ['#6B8E23', '#E8B4B8', '#FFD166'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 10 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 10;
        
        let posX = x;
        let posY = y;
        let velocityX = vx;
        let velocityY = vy;
        
        const animation = setInterval(() => {
            velocityY += 0.5; // Gravity
            posX += velocityX;
            posY += velocityY;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.transform = `rotate(${posX}deg)`;
            
            if (posY > window.innerHeight) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 16);
    }
}

// Add confetti to CTA buttons (optional fun feature)
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) { // Hold Ctrl/Cmd for confetti
            e.preventDefault();
            createConfetti(e.clientX, e.clientY);
        }
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🪶 Drei Fächer - Mit Haltung, Humor und Herz', 
    'font-size: 20px; color: #6B8E23; font-weight: bold;');
console.log('%cWebsite entwickelt mit Liebe zum Detail ✨', 
    'font-size: 14px; color: #5D6D7E; font-style: italic;');
console.log('%cTipp: Halte Ctrl/Cmd gedrückt beim Klick auf einen Button für eine Überraschung! 🎉', 
    'font-size: 12px; color: #E8B4B8;');
console.log('%c💰 Preise anpassen? Schau ganz oben in der script.js Datei!', 
    'font-size: 12px; color: #FFD166; font-weight: bold;');