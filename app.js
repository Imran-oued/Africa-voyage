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

  // Traduire les options du formulaire de contact
  const pkgSelect = document.getElementById('contactPackage');
  if (pkgSelect) {
    const currentVal = pkgSelect.value;
    if (lang === 'en') {
      pkgSelect.options[0].text = "Hajj 2027 (Provisional: 3,285,000 FCFA)";
      pkgSelect.options[1].text = "Standard Umrah (1,300,000 FCFA)";
      pkgSelect.options[2].text = "Ramadan Umrah (1,800,000 FCFA)";
      pkgSelect.options[3].text = "Visa Assistance";
      pkgSelect.options[4].text = "Air Ticketing";
      pkgSelect.options[5].text = "Money Transfer";
    } else if (lang === 'ar') {
      pkgSelect.options[0].text = "حج 2027 (سعر تقديري: 3,285,000 فرنك سيفا)";
      pkgSelect.options[1].text = "العمرة الاعتيادية (1,300,000 فرنك سيفا)";
      pkgSelect.options[2].text = "عمرة رمضان المبارك (1,800,000 فرنك سيفا)";
      pkgSelect.options[3].text = "استخراج التأشيرات";
      pkgSelect.options[4].text = "حجز تذاكر الطيران";
      pkgSelect.options[5].text = "تحويل الأموال";
    } else {
      pkgSelect.options[0].text = "Hadj 2027 (Tarif provisoire : 3 285 000 FCFA)";
      pkgSelect.options[1].text = "Omra Standard (1 300 000 FCFA)";
      pkgSelect.options[2].text = "Omra Ramadan (1 800 000 FCFA)";
      pkgSelect.options[3].text = "Assistance Visa";
      pkgSelect.options[4].text = "Billetterie Aérienne";
      pkgSelect.options[5].text = "Transfert d'Argent";
    }
  }
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

    let displayTitle = pkg.title;
    let displayTag = pkg.tag;
    let displayDuration = pkg.duration;
    let displayDeparture = "Ouagadougou";
    let detailsLabel = dict.viewItinerary || "Voir Programme Complet";
    let bookLabel = dict.bookWhatsapp || "Réserver sur WhatsApp";
    let inclusionsList = pkg.inclusions;

    if (currentLanguage === 'en') {
      if (pkg.id === 'hadj-2027') {
        displayTitle = "Hajj 2027 – Official Pre-Registration (3★ & 4★)";
        displayTag = "2027 Pre-Registration";
        displayDuration = "30 Days";
        inclusionsList = [
          "Round-trip scheduled flight from Ouagadougou",
          "3★ & 4★ comfortable hotels near the Holy Mosques",
          "Official Saudi Hajj visa included",
          "Air-conditioned VIP tents at Mina & Arafat"
        ];
      } else if (pkg.id === 'omra-standard') {
        displayTitle = "Standard Umrah – 2 Departures per Month";
        displayTag = "2 Departures / Month";
        displayDuration = "15 Days";
        inclusionsList = [
          "Direct or 1-stop scheduled flight",
          "3★ & 4★ close-proximity hotel near Haram",
          "Saudi Umrah visa included",
          "Ziyarat guided visits in Mecca and Medina"
        ];
      } else if (pkg.id === 'omra-ramadan') {
        displayTitle = "Premium Ramadan Umrah – Last 15 Days";
        displayTag = "Ramadan Special";
        displayDuration = "15 Days";
        inclusionsList = [
          "Scheduled flight Ouagadougou ➔ Jeddah",
          "3★ & 4★ quality hotel close to Masjid Al-Haram",
          "Full Iftar & Suhoor catering",
          "24/7 Spiritual guidance by Islamic scholars"
        ];
      }
      displayDeparture = "Ouagadougou";
    } else if (currentLanguage === 'ar') {
      if (pkg.id === 'hadj-2027') {
        displayTitle = "حج 2027 – التسجيل المسبق الرسمي (فنادق 3 و 4 نجوم)";
        displayTag = "تسجيل مسبق 2027";
        displayDuration = "30 يوماً";
        inclusionsList = [
          "تذكرة طيران ذهاباً وإياباً من واغادوغو",
          "إقامة في فنادق 3 و 4 نجوم مريحة وقريبة من الحرمين",
          "تأشيرة الحج الرسمية المعتمدة",
          "مخيمات VIP مكيفة في مشعري منى وعرفات"
        ];
      } else if (pkg.id === 'omra-standard') {
        displayTitle = "العمرة الاعتيادية – رحلتان شهرياً على مدار العام";
        displayTag = "رحلتان كل شهر";
        displayDuration = "15 يوماً";
        inclusionsList = [
          "رحلات طيران منتظمة ومريحة",
          "فنادق 3 و 4 نجوم راقية على مقربة من الحرمين الشريفين",
          "تأشيرة العمرة والتأمين الصحي الشامل",
          "برنامج المزارات والمعالم التاريخية بمكة والمدينة"
        ];
      } else if (pkg.id === 'omra-ramadan') {
        displayTitle = "عمرة رمضان المبارك – العشر الأواخر والختم";
        displayTag = "عمرة شهر رمضان";
        displayDuration = "15 يوماً";
        inclusionsList = [
          "طيران مباشر / مريح واغادوغو ➔ جدة",
          "فنادق 3 و 4 نجوم مريحة وقريبة من الحرم المكي",
          "وجبات إفطار وسحور فاخرة يومياً",
          "إرشاد ديني مستمر ومرافقة أطباء على مدار 24 ساعة"
        ];
      }
      displayDeparture = "واغادوغو";
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
            <span><i class="fa-solid fa-clock"></i> ${displayDuration}</span>
            <span>•</span>
            <span><i class="fa-solid fa-plane-departure"></i> ${displayDeparture}</span>
          </div>

          <ul class="offer-features">
            ${inclusionsList.slice(0, 4).map(inc => `
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
              <div class="offer-price-label">${isHadj ? (dict.priceProvisional || "Tarif Provisoire :") : (dict.priceOfficial || "Tarif Officiel :")}</div>
              <div class="offer-price-val">${priceFormatted}</div>
            </div>
            <button type="button" class="btn btn-whatsapp btn-pkg-wa" data-pkg-title="${displayTitle}">
              <i class="fa-brands fa-whatsapp"></i> ${bookLabel}
            </button>
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

  // Event listeners sur les boutons WhatsApp des offres
  container.querySelectorAll('.btn-pkg-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgTitle = e.currentTarget.getAttribute('data-pkg-title') || '';
      openWhatsAppModal(`je souhaite des informations et m'inscrire pour : ${pkgTitle}`);
    });
  });
}

// Modal WhatsApp Multi-Villes (Ouagadougou, Bobo-Dioulasso, Yako-Gourcy)
export function openWhatsAppModal(customMessage = null) {
  const modal = document.getElementById('whatsappModal');
  if (!modal) return;

  const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;

  const branches = [
    {
      id: 'ouaga',
      city: dict.whatsappOuagaTitle || "Ouagadougou (Siège Principal)",
      desc: dict.whatsappOuagaDesc || "Samandin secteur 05, en face station Total Mogho Naaba",
      number: "22673187417",
      displayNumber: "+226 73 18 74 17",
      badge: "Siège Ouaga"
    },
    {
      id: 'bobo',
      city: dict.whatsappBoboTitle || "Bobo-Dioulasso (Agence Bobo)",
      desc: dict.whatsappBoboDesc || "Région des Hauts-Bassins & Grand Ouest",
      number: "22674642980",
      displayNumber: "+226 74 64 29 80",
      badge: "Agence Bobo"
    },
    {
      id: 'yako-gourcy',
      city: dict.whatsappYakoTitle || "Yako - Gourcy (Agence Nord)",
      desc: dict.whatsappYakoDesc || "Provinces du Passoré, Zondoma & Région du Nord",
      number: "22676528131",
      displayNumber: "+226 76 52 81 31",
      badge: "Passoré / Zondoma"
    }
  ];

  const listContainer = document.getElementById('whatsappCitiesList');
  if (listContainer) {
    listContainer.innerHTML = branches.map(b => {
      let defaultMsg = `Salam Aleykoum AFRICA VOYAGES SARL (${b.city}), je souhaite avoir des informations sur vos forfaits Hadj & Omra et vos services.`;
      if (customMessage) {
        defaultMsg = `Salam Aleykoum AFRICA VOYAGES SARL (${b.city}), ${customMessage}`;
      }
      const waUrl = `https://wa.me/${b.number}?text=${encodeURIComponent(defaultMsg)}`;

      return `
        <a href="${waUrl}" target="_blank" rel="noopener" class="whatsapp-city-card" onclick="closeModal('whatsappModal')">
          <div class="whatsapp-city-info">
            <div class="whatsapp-city-badge">
              <span class="pulse-online"></span>
              <span>${b.badge}</span>
            </div>
            <div class="whatsapp-city-name">
              <i class="fa-solid fa-location-dot" style="color: var(--gold-dark); font-size: 0.95rem;"></i>
              <span>${b.city}</span>
            </div>
            <div class="whatsapp-city-address">${b.desc}</div>
            <div class="whatsapp-city-phone">
              <i class="fa-brands fa-whatsapp" style="color: #25d366;"></i>
              <span>${b.displayNumber}</span>
            </div>
          </div>
          <div class="whatsapp-city-btn">
            <i class="fa-brands fa-whatsapp"></i>
            <span>${dict.whatsappActionBtn || "Échanger"}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  modal.style.display = 'flex';
}

window.openWhatsAppModal = openWhatsAppModal;

// Modal d'Itinéraire Complet
export function openItineraryModal(packageId) {
  const pkg = PACKAGES.find(p => p.id === packageId);
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  const titleEl = document.getElementById('itineraryModalTitle');
  const bodyEl = document.getElementById('itineraryModalBody');

  if (!modal || !titleEl || !bodyEl) return;

  const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;

  let modalTitle = pkg.title;
  let inclusions = pkg.inclusions;
  let itinerarySteps = pkg.itinerary;

  if (currentLanguage === 'en') {
    if (pkg.id === 'hadj-2027') modalTitle = "Hajj 2027 – Detailed Schedule & Rituals";
    if (pkg.id === 'omra-standard') modalTitle = "Standard Umrah – Schedule & Visits";
    if (pkg.id === 'omra-ramadan') modalTitle = "Ramadan Umrah – Program & Tahajjud";
  } else if (currentLanguage === 'ar') {
    if (pkg.id === 'hadj-2027') modalTitle = "حج 2027 – تفاصيل البرنامج ومراحل المناسك";
    if (pkg.id === 'omra-standard') modalTitle = "العمرة الاعتيادية – جدول الزيارات والمناسك";
    if (pkg.id === 'omra-ramadan') modalTitle = "عمرة رمضان – البرنامج والتهجد وختم القرآن";
  }

  titleEl.innerHTML = `<i class="fa-solid fa-kaaba"></i> ${modalTitle}`;

  const priceFormatted = formatPrice(pkg.basePriceFCFA, currentCurrency);
  const modalPriceLabel = pkg.id === 'hadj-2027' ? (dict.priceProvisional || "Tarif Provisoire :") : (dict.priceOfficial || "Tarif Officiel :");

  bodyEl.innerHTML = `
    <div style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--surface-alt); padding: 14px 18px; border-radius: 10px;">
      <div>
        <span style="font-size: 0.85rem; color: #64748b; font-weight: 700; text-transform: uppercase;">${modalPriceLabel}</span>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); font-family: 'Playfair Display', serif;">${priceFormatted}</div>
      </div>
      <button type="button" class="btn btn-whatsapp" onclick="closeModal('itineraryModal'); openWhatsAppModal('je souhaite réserver le forfait : ${encodeURIComponent(pkg.title)}');">
        <i class="fa-brands fa-whatsapp"></i> ${dict.bookWhatsapp || "Réserver via WhatsApp"}
      </button>
    </div>

    ${pkg.conditions ? `
      <div style="background: rgba(212, 175, 55, 0.15); border-left: 4px solid var(--gold); padding: 10px 14px; border-radius: 6px; margin-bottom: 20px; font-weight: 600; color: var(--primary);">
        <i class="fa-solid fa-circle-info"></i> ${pkg.conditions}
      </div>
    ` : ''}

    <h4 style="font-size: 1.15rem; color: var(--primary); margin-bottom: 14px; font-weight: 700;">
      <i class="fa-solid fa-route"></i> ${dict.ritualSteps || "Programme & Étapes Rituelles"}
    </h4>

    <div class="itinerary-timeline">
      ${itinerarySteps.map((step, idx) => `
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
      <i class="fa-solid fa-shield-halved"></i> ${dict.includedServices || "Prestations Incluses"}
    </h4>

    <ul class="inclusions-modal-list">
      ${inclusions.map(inc => `
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

// Global click-outside to close modals
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});

// Témoignages
function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
  const list = dict.testimonials || APP_DATA.testimonials;

  container.innerHTML = list.map(item => `
    <div class="testimonial-card">
      <div class="testimonial-stars">
        ${Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
      </div>
      <p class="testimonial-quote">"${item.text}"</p>
      <div class="testimonial-author">
        <img src="${item.avatar || '/images/testimonials/amadou-ouedraogo.jpg'}" alt="${item.name}" class="testimonial-avatar" loading="lazy">
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
  if (!container) return;

  const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
  const list = dict.faq || APP_DATA.faq;

  container.innerHTML = list.map((item, idx) => `
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

    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.fr;
    const alertBox = document.getElementById('formSuccessAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${name}, ${dict.formSuccess || "votre message a été préparé pour WhatsApp ! Notre équipe vous répond immédiatement."}`;
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
