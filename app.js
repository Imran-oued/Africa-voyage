/**
 * AFRICA VOYAGES SARL - Moteur Web Épuré & Haute Performance
 * Intégration Design System Stitch : Spiritual Luxury
 * Siège : Samandin secteur 05, en face de la station Total du Mogho Naaba à Ouagadougou
 * Tél : +226 25 31 06 77 | +226 70 24 55 74 | WhatsApp : +226 73 18 74 17
 * Agréments : RCCM BF OUA 2018 B 9910 | IFU 00114097X | Licence Catégorie A
 */

import contentData from './data/content.json';
import { TRANSLATIONS } from './data/i18n.js';

export const APP_DATA = contentData;
export const PACKAGES = APP_DATA.offers;

// Taux de conversion devises
const EXCHANGE_RATES = {
  FCFA: 1,
  EUR: 1 / 655.957,
  USD: 1 / 610.00
};

let currentCurrency = 'FCFA';
let currentLanguage = localStorage.getItem('africa_voyages_lang') || 'fr';
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector();
  initCurrencySelector();
  initFilterTabs();
  initDrawerMenu();
  applyLanguage(currentLanguage);
  renderOffers();
  renderTestimonials();
  renderFaq();
  initContactForm();
});

// Système de Traduction Dynamique
export function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'fr';
  currentLanguage = lang;
  localStorage.setItem('africa_voyages_lang', lang);
  applyLanguage(lang);
  renderOffers();
  renderTestimonials();
  renderFaq();
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  
  // Mettre à jour l'attribut lang et dir (RTL pour l'arabe)
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Traduire les sélecteurs de langue
  document.querySelectorAll('.lang-select').forEach(sel => {
    sel.value = lang;
  });

  // Traduire les éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Traduire les placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

function initLanguageSelector() {
  document.querySelectorAll('.lang-select').forEach(selector => {
    selector.value = currentLanguage;
    selector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  });
}

// Formatage des prix
export function formatPrice(amountFCFA, currency = currentCurrency) {
  if (!amountFCFA) return 'Sur Devis';
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = Math.round(amountFCFA * rate);

  if (currency === 'FCFA') {
    return new Intl.NumberFormat('fr-FR').format(converted) + ' FCFA';
  } else if (currency === 'EUR') {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(converted);
  } else if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(converted);
  }
  return converted + ' ' + currency;
}

// Sélecteur de Devise
function initCurrencySelector() {
  const selector = document.getElementById('currencySelector');
  if (!selector) return;
  selector.value = currentCurrency;
  selector.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    renderOffers();
  });
}

// Filtres de Forfaits
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter || 'all';
      renderOffers();
    });
  });
}

// Affichage dynamique des 3 Offres
export function renderOffers() {
  const container = document.getElementById('packagesGrid');
  if (!container) return;

  const filteredOffers = PACKAGES.filter(pkg => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'hadj') return pkg.type === 'hadj';
    if (activeFilter === 'omra') return pkg.type === 'omra';
    return true;
  });

  const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;

  container.innerHTML = filteredOffers.map(pkg => {
    const isHadj = pkg.id === 'hadj-2027';
    const waText = encodeURIComponent(`Salam Aleykoum AFRICA VOYAGES SARL, je souhaite des informations et m'inscrire pour : ${pkg.title}`);
    const priceFormatted = formatPrice(pkg.basePriceFCFA, currentCurrency);

    // Titres localisés si besoin
    let displayTitle = pkg.title;
    let displayTag = pkg.tag;
    let detailsLabel = dict.viewItinerary || "Voir Programme Complet";
    let bookLabel = dict.bookWhatsapp || "Réserver sur WhatsApp";

    if (currentLanguage === 'en') {
      if (pkg.id === 'hadj-2027') displayTitle = "Hajj 2027 – Official Pre-Registration (4★ & 5★)";
      if (pkg.id === 'omra-standard') displayTitle = "Standard Umrah – 2 Departures per Month";
      if (pkg.id === 'omra-ramadan') displayTitle = "Premium Ramadan Umrah – Last 15 Days";
      detailsLabel = "View Full Schedule";
      bookLabel = "Book via WhatsApp";
    } else if (currentLanguage === 'ar') {
      if (pkg.id === 'hadj-2027') displayTitle = "حج 2027 – التسجيل المسبق الرسمي (فنادق 4 و 5 نجوم)";
      if (pkg.id === 'omra-standard') displayTitle = "العمرة الاعتيادية – رحلتان شهرياً على مدار العام";
      if (pkg.id === 'omra-ramadan') displayTitle = "عمرة رمضان المبارك – العشر الأواخر والختم";
      detailsLabel = "تفاصيل البرنامج";
      bookLabel = "حجز عبر واتساب";
    }

    return `
      <article class="offer-card ${isHadj ? 'featured' : ''}" id="card-${pkg.id}">
        <div class="offer-badge">
          <i class="fa-solid fa-star"></i> ${displayTag}
        </div>
        
        <div class="offer-img-box">
          <img src="${pkg.image}" alt="${displayTitle}" class="offer-img" loading="lazy">
        </div>

        <div class="offer-body">
          <h3 class="offer-title">${displayTitle}</h3>
          
          <div class="offer-meta">
            <span><i class="fa-solid fa-clock"></i> ${pkg.duration}</span>
            <span>•</span>
            <span><i class="fa-solid fa-plane-departure"></i> Ouagadougou</span>
          </div>

          <ul class="offer-features">
            ${pkg.inclusions.slice(0, 4).map(inc => `
              <li class="offer-feature-item">
                <i class="fa-solid fa-check"></i>
                <span>${inc}</span>
              </li>
            `).join('')}
          </ul>

          <div class="offer-actions-row">
            <button type="button" class="btn btn-outline btn-details" data-pkg-id="${pkg.id}" style="width: 100%; margin-bottom: 10px;">
              <i class="fa-solid fa-list-check"></i> ${detailsLabel}
            </button>
          </div>

          <div class="offer-footer">
            <div>
              <div class="offer-price-label">${pkg.priceLabel}</div>
              <div class="offer-price-val">${priceFormatted}</div>
            </div>
            <a href="https://wa.me/22673187417?text=${waText}" target="_blank" rel="noopener" class="btn btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> ${bookLabel}
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Event listeners sur les boutons détails
  container.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgId = e.currentTarget.getAttribute('data-pkg-id');
      openItineraryModal(pkgId);
    });
  });
}

// Modal d'Itinéraire Complet
export function openItineraryModal(packageId) {
  const pkg = PACKAGES.find(p => p.id === packageId);
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  const titleEl = document.getElementById('itineraryModalTitle');
  const bodyEl = document.getElementById('itineraryModalBody');

  if (!modal || !titleEl || !bodyEl) return;

  titleEl.innerHTML = `<i class="fa-solid fa-kaaba"></i> ${pkg.title}`;

  const priceFormatted = formatPrice(pkg.basePriceFCFA, currentCurrency);
  const waText = encodeURIComponent(`Salam Aleykoum AFRICA VOYAGES SARL, je souhaite réserver le forfait : ${pkg.title}`);

  bodyEl.innerHTML = `
    <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--surface-alt); padding: 14px 18px; border-radius: 10px;">
      <div>
        <span style="font-size: 0.85rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Tarif Officiel :</span>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); font-family: 'Playfair Display', serif;">${priceFormatted}</div>
      </div>
      <a href="https://wa.me/22673187417?text=${waText}" target="_blank" class="btn btn-whatsapp">
        <i class="fa-brands fa-whatsapp"></i> Réserver via WhatsApp
      </a>
    </div>

    ${pkg.conditions ? `
      <div style="background: rgba(212, 175, 55, 0.15); border-left: 4px solid var(--gold); padding: 10px 14px; border-radius: 6px; margin-bottom: 20px; font-weight: 600; color: var(--primary);">
        <i class="fa-solid fa-circle-info"></i> ${pkg.conditions}
      </div>
    ` : ''}

    <h4 style="font-size: 1.15rem; color: var(--primary); margin-bottom: 14px; font-weight: 700;">
      <i class="fa-solid fa-route"></i> Programme & Étapes Rituelles
    </h4>

    <div class="itinerary-timeline">
      ${pkg.itinerary.map((step, idx) => `
        <div class="timeline-step">
          <div class="timeline-dot">${idx + 1}</div>
          <div class="timeline-content">
            <span class="timeline-day">${step.day}</span>
            <h5 class="timeline-title">${step.title}</h5>
            <p class="timeline-desc">${step.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <h4 style="font-size: 1.15rem; color: var(--primary); margin: 24px 0 12px 0; font-weight: 700;">
      <i class="fa-solid fa-shield-halved"></i> Prestations Incluses
    </h4>

    <ul class="inclusions-modal-list">
      ${pkg.inclusions.map(inc => `
        <li><i class="fa-solid fa-check text-gold"></i> ${inc}</li>
      `).join('')}
    </ul>
  `;

  modal.style.display = 'flex';
}

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
};

// Témoignages
function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container || !APP_DATA.testimonials) return;

  container.innerHTML = APP_DATA.testimonials.map(item => `
    <div class="testimonial-card">
      <div class="testimonial-stars">
        ${Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
      </div>
      <p class="testimonial-quote">"${item.text}"</p>
      <div class="testimonial-author">
        <img src="${item.avatar}" alt="${item.name}" class="testimonial-avatar" loading="lazy">
        <div>
          <h4 class="testimonial-name">${item.name}</h4>
          <span class="testimonial-role">${item.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// FAQ Accordion
function renderFaq() {
  const container = document.getElementById('faqAccordion');
  if (!container || !APP_DATA.faq) return;

  container.innerHTML = APP_DATA.faq.map((item, idx) => `
    <div class="faq-item" id="faq-item-${idx}">
      <button class="faq-question-btn" type="button" aria-expanded="false" data-faq="${idx}">
        <span>${item.q}</span>
        <i class="fa-solid fa-chevron-down faq-icon"></i>
      </button>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      
      container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

// Formulaire de contact direct
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || '';
    const phone = document.getElementById('contactPhone')?.value || '';
    const pkg = document.getElementById('contactPackage')?.value || '';
    const msg = document.getElementById('contactMsg')?.value || '';

    const text = encodeURIComponent(
      `Salam Aleykoum AFRICA VOYAGES SARL,\n` +
      `Nom: ${name}\n` +
      `Téléphone: ${phone}\n` +
      `Forfait souhaité: ${pkg}\n` +
      `Message: ${msg}`
    );

    window.open(`https://wa.me/22673187417?text=${text}`, '_blank');

    const alertBox = document.getElementById('formSuccessAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `<i class="fa-solid fa-check-circle"></i> Merci ${name}, votre message a été préparé pour WhatsApp ! Notre équipe vous répond immédiatement.`;
      form.reset();
    }
  });
}

// Menu Tiroir / Drawer Navigation
function initDrawerMenu() {
  const openBtns = document.querySelectorAll('.menu-btn, .hamburger-btn');
  const closeBtns = document.querySelectorAll('.drawer-close-btn');
  const overlay = document.getElementById('menuDrawerOverlay') || document.getElementById('hamburgerDrawerOverlay');

  if (!overlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Fermer le menu lors du clic sur un lien interne
  overlay.querySelectorAll('.drawer-menu-item a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}
