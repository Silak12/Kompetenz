// ===========================
// FÄCHER DATEN
// ===========================

const faecherData = {
    haltung: {
        emoji: '🌿',
        title: 'Haltungsfächer',
        tagline: 'Lass deine Haltung tanzen.',
        description: `
            <p>Der <strong>HALTUNGSFÄCHER</strong> ist kein Handbuch und kein Leitfaden. Schon gar keine To-do-Liste.</p>
            <p>Er ist ein kleiner Raum zum Denken, Staunen und Loslassen. Er ist dein Ort, um kurz mit dir selbst ins Gespräch zu kommen.</p>
            <p>Du findest hier keine fertigen Antworten, aber Gedanken, die kitzeln. Momente, die anstoßen. Und Sätze, die sich nach ein paar Tagen noch einmal bei dir melden.</p>
            <p>Die einzelnen Karten reden nicht über Haltung. <strong>Sie bringen sie in Bewegung.</strong></p>
            <p style="font-style: italic; margin-top: 1.5rem;">Ein Gedanke hier, ein Schmunzeln da. Und plötzlich merkst du: Du bist schon mittendrin.</p>
            <p style="font-family: 'Caveat', cursive; font-size: 1.4rem; margin-top: 1.5rem; color: var(--chalkboard-green);">"Haltung wird nicht gelehrt, sondern zum Schwingen gebracht."</p>
        `,
        images: generateImagePaths('Haltung', 10) // Generiert Haltung_1.jpg bis Haltung_10.jpg
    },
    reflexion: {
        emoji: '🌸',
        title: 'Reflexionsfächer',
        tagline: 'Dein Wegbegleiter im Referendariat.',
        description: `
            <p>Das Referendariat ist eine intensive Zeit voller neuer Erfahrungen, Herausforderungen und persönlichem Wachstum.</p>
            <p>Es verlangt nicht nur fachliches Können, sondern auch Reflexion, Selbstbewusstsein und innere Stärke.</p>
            <p>Genau hier setzt der <strong>REFLEXIONSFÄCHER</strong> an. Er ist mehr als ein Kartenset. Er ist dein Wegweiser, der dich durch diese Phase begleitet.</p>
            <p><strong>Jede Karte bietet dir:</strong></p>
            <ul style="margin-left: 1.5rem; line-height: 2;">
                <li><strong>FRAGEN</strong>, die dich dabei unterstützen, deine Gedanken zu ordnen.</li>
                <li><strong>WEGWEISER</strong>, die dir Orientierung geben, wenn du unsicher bist.</li>
                <li><strong>IMPULSE</strong>, die dich inspirieren und neue Perspektiven aufzeigen.</li>
            </ul>
            <p style="font-style: italic; margin-top: 1.5rem;">Nutze den REFLEXIONSFÄCHER als tägliche Erinnerung daran, dass du nicht perfekt sein musst, sondern wachsen darfst!</p>
        `,
        images: generateImagePaths('Reflexion', 10)
    },
    kompetenz: {
        emoji: '🌻',
        title: 'Kompetenzfächer',
        tagline: 'Der Erfolg liegt in deinen Händen.',
        description: `
            <p>Der <strong>KOMPETENZFÄCHER</strong> ist dein Werkzeug für bewusste Entwicklung.</p>
            <p>Jede Karte ist ein kleiner Kompass. Sie lenkt den Blick auf das, was schon da ist – und auf das, was noch wachsen darf.</p>
            <p>So entsteht Entwicklung: bewusst, leicht, echt.</p>
            <p>Die Karten helfen dir dabei:</p>
            <ul style="margin-left: 1.5rem; line-height: 2;">
                <li>Deine Stärken zu erkennen und zu nutzen</li>
                <li>Entwicklungspotenziale sichtbar zu machen</li>
                <li>Selbstbewusst deinen Weg zu gehen</li>
            </ul>
            <p style="font-style: italic; margin-top: 1.5rem;">Nicht perfekt sein – wachsen dürfen.</p>
        `,
        images: generateImagePaths('Kompetenz', 10)
    }
};

// Hilfsfunktion um Bildpfade zu generieren
function generateImagePaths(prefix, count) {
    const paths = [];
    for (let i = 1; i <= count; i++) {
        paths.push(`assets/${prefix}_${i}.jpg`);
    }
    return paths;
}

// ===========================
// NAVIGATION
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

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
    
    // Slide Position aktualisieren
    galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    
    // Dots aktualisieren
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentGalleryIndex);
    });
}

function nextSlide() {
    if (currentGalleryIndex < currentFaecherImages.length - 1) {
        currentGalleryIndex++;
        updateGallery();
    }
}

function prevSlide() {
    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGallery();
    }
}

function goToSlide(index) {
    currentGalleryIndex = index;
    updateGallery();
}

// Navigation Buttons
modal?.querySelector('.gallery-nav.next')?.addEventListener('click', nextSlide);
modal?.querySelector('.gallery-nav.prev')?.addEventListener('click', prevSlide);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Touch/Swipe Support für Mobile
let touchStartX = 0;
let touchEndX = 0;

const galleryContainer = modal?.querySelector('.gallery-container');

galleryContainer?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryContainer?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - prev slide
            prevSlide();
        }
    }
}

// ===========================
// "JETZT ANFRAGEN" BUTTON
// ===========================

modal?.querySelector('.btn-order')?.addEventListener('click', () => {
    closeModal();
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
});

// ===========================
// FORMULAR HANDLING
// ===========================

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Formular Daten sammeln
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const selectedFaecher = formData.getAll('faecher');
    
    // Validierung
    if (!name || !email) {
        alert('Bitte fülle alle Pflichtfelder aus.');
        return;
    }
    
    if (selectedFaecher.length === 0) {
        alert('Bitte wähle mindestens einen Fächer aus.');
        return;
    }
    
    // E-Mail erstellen (mailto Link)
    const subject = encodeURIComponent('Anfrage zu den Drei Fächern');
    
    let body = `Hallo,%0D%0A%0D%0A`;
    body += `ich interessiere mich für folgende Fächer:%0D%0A%0D%0A`;
    
    selectedFaecher.forEach(faecher => {
        const faecherName = faecher === 'haltung' ? 'Haltungsfächer' : 
                           faecher === 'reflexion' ? 'Reflexionsfächer' : 
                           'Kompetenzfächer';
        body += `- ${faecherName} (15,00 €)%0D%0A`;
    });
    
    body += `%0D%0A`;
    
    if (message) {
        body += `Nachricht:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A`;
    }
    
    body += `Meine Kontaktdaten:%0D%0A`;
    body += `Name: ${encodeURIComponent(name)}%0D%0A`;
    body += `E-Mail: ${encodeURIComponent(email)}%0D%0A%0D%0A`;
    body += `Viele Grüße`;
    
    // Mailto Link öffnen
    window.location.href = `mailto:kompetenzfaecher@gmail.com?subject=${subject}&body=${body}`;
    
    // Erfolgs-Nachricht
    alert('Vielen Dank für deine Anfrage! Dein E-Mail-Programm sollte sich nun öffnen. Falls nicht, sende bitte eine E-Mail an: kompetenzfaecher@gmail.com');
    
    // Formular zurücksetzen
    contactForm.reset();
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
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

// ===========================
// INITIAL LOAD
// ===========================

window.addEventListener('load', () => {
    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

console.log('🪶 Drei Fächer Website geladen!');