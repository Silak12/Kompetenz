// ===========================
// FÄCHER DATEN
// ===========================

const faecherData = {
    haltung: {
        emoji: '',
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
        images: generateImagePaths('Haltung', 6)
    },
    kompetenz: {
        emoji: '',
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
        images: generateImagePaths('Kompetenz', 6)
    },
    reflexion: {
        emoji: '',
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
        images: generateImagePaths('Reflexion', 6)
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
// PREISE & MENGENAUSWAHL
// ===========================

const PREISE = {
    haltung: 10.00,
    kompetenz: 10.00,
    reflexion: 10.00
};

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

function calculatePrices() {
    let subtotal = 0;
    
    // Berechne Preis für jeden Fächer
    Object.keys(PREISE).forEach(type => {
        const qtyInput = document.getElementById(`qty-${type}`);
        const itemTotal = document.querySelector(`[data-item="${type}"]`);
        
        if (qtyInput && itemTotal) {
            const quantity = parseInt(qtyInput.value) || 0;
            const total = quantity * PREISE[type];
            itemTotal.textContent = formatPrice(total);
            subtotal += total;
        }
    });
    
    // Aktualisiere Gesamtsumme
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-price strong');
    const totalHiddenInput = document.getElementById('total-price-hidden');
    
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(subtotal);
    if (totalHiddenInput) totalHiddenInput.value = formatPrice(subtotal);
    
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
            submitBtn.textContent = 'Bitte wähle mindestens einen Fächer';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
        }
    }
}

// Event Listeners für Quantity Controls
document.addEventListener('DOMContentLoaded', () => {
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
    
    galleryTrack.innerHTML = '';
    galleryDots.innerHTML = '';
    
    if (images.length === 0) {
        galleryTrack.innerHTML = '<div class="gallery-slide"><p style="padding: 3rem; text-align: center; color: #999;">Bilder folgen in Kürze...</p></div>';
        return;
    }
    
    images.forEach((imagePath, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${imagePath}" alt="Fächer Karte ${index + 1}">`;
        galleryTrack.appendChild(slide);
        
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
    
    galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    
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

modal?.querySelector('.gallery-nav.next')?.addEventListener('click', nextSlide);
modal?.querySelector('.gallery-nav.prev')?.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Touch/Swipe Support
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
            nextSlide();
        } else {
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
// FORMULAR HANDLING MIT WEB3FORMS
// ===========================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        // Validierung: Mindestens ein Fächer muss ausgewählt sein
        const qtyHaltung = parseInt(document.getElementById('qty-haltung').value) || 0;
        const qtyKompetenz = parseInt(document.getElementById('qty-kompetenz').value) || 0;
        const qtyReflexion = parseInt(document.getElementById('qty-reflexion').value) || 0;
        const totalQty = qtyHaltung + qtyKompetenz + qtyReflexion;
        
        if (totalQty === 0) {
            showMessage('Bitte wähle mindestens einen Fächer aus.', 'error');
            return;
        }
        
        // Button deaktivieren während des Sendens
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet... ⏳';
        submitBtn.style.opacity = '0.7';
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Erfolgs-Nachricht mit Bestellübersicht
                let orderSummary = '<ul style="list-style: none; padding: 0; margin: 1rem 0;">';
                if (qtyHaltung > 0) orderSummary += `<li>🌿 ${qtyHaltung}x Haltungsfächer</li>`;
                if (qtyKompetenz > 0) orderSummary += `<li>🌻 ${qtyKompetenz}x Kompetenzfächer</li>`;
                if (qtyReflexion > 0) orderSummary += `<li>🌸 ${qtyReflexion}x Reflexionsfächer</li>`;
                orderSummary += '</ul>';
                
                const totalPrice = document.querySelector('.total-price strong').textContent;
                
                showMessage(
                    `🎉 Vielen Dank für deine Anfrage!<br><br>${orderSummary}<p style="font-weight: bold; margin: 1rem 0;">Gesamt: ${totalPrice}</p><p>Ich melde mich in Kürze per E-Mail bei dir mit allen Details zur Bezahlung und zum Versand.</p><small>Bitte prüfe auch deinen Spam-Ordner.</small>`,
                    'success'
                );
                
                contactForm.reset();
                calculatePrices();
            } else {
                throw new Error('Fehler beim Senden');
            }
            
        } catch (error) {
            showMessage(
                '⚠️ Es gab ein Problem beim Versenden deiner Anfrage.<br>Bitte versuche es noch einmal oder kontaktiere mich direkt per E-Mail.',
                'error'
            );
            console.error('Formular-Fehler:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = '1';
        }
    });
}

// Hilfsfunktion für Nachrichten
function showMessage(message, type) {
    const oldMessages = document.querySelectorAll('.form-message');
    oldMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}-message`;
    messageDiv.innerHTML = message;
    
    const styles = type === 'success' 
        ? 'background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white;'
        : 'background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); color: white;';
    
    messageDiv.style.cssText = `
        ${styles}
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        margin-top: 1.5rem;
        animation: slideInUp 0.5s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-size: 1rem;
        line-height: 1.6;
    `;
    
    contactForm.appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, type === 'success' ? 10000 : 8000);
}

// CSS-Animationen
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(animationStyle);

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

document.querySelectorAll('.faecher-card, .about-text, .sketch-cards').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// NAVIGATION ACTIVE STATE
// ===========================

window.addEventListener('load', () => {
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

console.log('Drei Fächer Website geladen!');