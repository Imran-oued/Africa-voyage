/**
 * AFRICA VOYAGES SARL - La 1ère agence agréée pour le Hadj au Burkina Faso
 * Plus de 40 ans d'expérience
 * Siège : Samandin secteur 05, en face de la station Total du Mogho Naaba à Ouagadougou
 * Tél : +226 25 31 06 77 | +226 70 24 55 74 | WhatsApp : +226 73 18 74 17
 * Email : africavoyagebf74@gmail.com
 * RCCM : BF OUA 2018 B 9910 | IFU : 00114097X | Licence Catégorie A | Capital : 15 000 000 FCFA
 */

import contentData from './data/content.json';

// Global Data Store
export const APP_DATA = contentData;

// Exchange Rates (Base: FCFA)
const EXCHANGE_RATES = {
  FCFA: 1,
  EUR: 1 / 655.957,
  USD: 1 / 610.00
};

let currentCurrency = 'FCFA';

// Packages Database from contentData.offers
export const PACKAGES = APP_DATA.offers;

// Partner Airlines
export const AIRLINES = APP_DATA.partnerAirlines;

// Additional Services
export const SERVICES = APP_DATA.additionalServices;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initNavbarScroll();
  initCurrencySelector();
  initPrayerTimes();
  renderPackages(PACKAGES);
  initFilterPills();
  initSearchForm();
  initSimulator();
  initModals();
  initLogoCustomizer();
  initContactForm();
  renderAirlinesAndServices();
});

/* ==========================================================================
   Hamburger Menu Drawer (Opens on Click)
   ========================================================================== */
function initHamburgerMenu() {
  const hamburgerBtns = document.querySelectorAll('.hamburger-btn, .mobile-toggle');
  const drawerOverlay = document.getElementById('hamburgerDrawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!drawerOverlay) return;

  hamburgerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeDrawer();
    });
  }

  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('active')) {
      closeDrawer();
    }
  });
}

function closeDrawer() {
  const drawerOverlay = document.getElementById('hamburgerDrawerOverlay');
  if (drawerOverlay) {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Currency Converter
   ========================================================================== */
function initCurrencySelector() {
  const selectors = document.querySelectorAll('.currency-selector');
  selectors.forEach(selector => {
    selector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      selectors.forEach(s => s.value = currentCurrency);
      updateAllPrices();
      updateSimulatorPrice();
    });
  });
}

function formatPrice(amountFCFA) {
  const rate = EXCHANGE_RATES[currentCurrency] || 1;
  const converted = Math.round(amountFCFA * rate);
  
  if (currentCurrency === 'FCFA') {
    return `${converted.toLocaleString('fr-FR')} FCFA`;
  } else if (currentCurrency === 'EUR') {
    return `${converted.toLocaleString('fr-FR')} €`;
  } else {
    return `$${converted.toLocaleString('en-US')}`;
  }
}

function updateAllPrices() {
  document.querySelectorAll('.package-card').forEach(card => {
    const pkgId = card.dataset.id;
    const pkg = PACKAGES.find(p => p.id === pkgId);
    if (pkg) {
      const priceElem = card.querySelector('.price-amount');
      if (priceElem) {
        priceElem.textContent = formatPrice(pkg.basePriceFCFA);
      }
    }
  });

  document.querySelectorAll('.table-price-cell').forEach(cell => {
    const amount = parseInt(cell.dataset.amount);
    if (amount) {
      cell.textContent = formatPrice(amount);
    }
  });
}

/* ==========================================================================
   Prayer Times Widget
   ========================================================================== */
function initPrayerTimes() {
  const elem = document.getElementById('prayerTimeIndicator');
  if (!elem) return;

  const now = new Date();
  const hours = now.getHours();
  
  let nextPrayer = 'Dhuhr';
  let prayerTime = '12:32';
  
  if (hours < 5) { nextPrayer = 'Fajr'; prayerTime = '05:08'; }
  else if (hours < 12) { nextPrayer = 'Dhuhr'; prayerTime = '12:32'; }
  else if (hours < 15) { nextPrayer = 'Asr'; prayerTime = '15:54'; }
  else if (hours < 18) { nextPrayer = 'Maghrib'; prayerTime = '18:38'; }
  else if (hours < 20) { nextPrayer = 'Isha'; prayerTime = '20:08'; }
  else { nextPrayer = 'Fajr (Demain)'; prayerTime = '05:08'; }

  elem.innerHTML = `<i class="fa-solid fa-mosque"></i> Makkah: Prochaine prière <strong>${nextPrayer} à ${prayerTime}</strong>`;
}

/* ==========================================================================
   Render Packages Grid
   ========================================================================== */
function renderPackages(packagesToRender) {
  const container = document.getElementById('packagesGrid');
  if (!container) return;

  if (!packagesToRender || packagesToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 1px solid var(--border-gold);">
        <p style="font-size: 1.2rem; color: var(--primary); font-weight: 600;">Aucun forfait ne correspond à ce filtre.</p>
        <p style="color: #64748b; margin: 10px 0 20px;">Contactez nos conseillers à Ouagadougou au +226 25 31 06 77 pour toute demande spécifique.</p>
        <button class="btn btn-primary" onclick="openContactModal()">Contacter l'Agence</button>
      </div>
    `;
    return;
  }

  container.innerHTML = packagesToRender.map(pkg => `
    <div class="package-card ${pkg.type === 'hadj' ? 'featured' : ''}" data-id="${pkg.id}">
      <span class="package-badge-top">${pkg.tag}</span>
      <span class="package-type-badge">${pkg.type.toUpperCase()}</span>
      
      <div class="package-image-container">
        <img src="${pkg.image}" alt="${pkg.title}" class="package-image" loading="lazy">
        <div class="package-image-overlay"></div>
        <div class="package-hotel-proximity">
          <i class="fa-solid fa-kaaba" style="color: var(--gold);"></i>
          <span>${pkg.makkahDistance}</span>
        </div>
      </div>

      <div class="package-content">
        <h3 class="package-title">${pkg.title}</h3>
        <div class="package-dates">
          <i class="fa-regular fa-calendar" style="color: var(--gold-dark);"></i>
          <span>${pkg.duration} • Départ : ${pkg.departure}</span>
        </div>

        <div class="package-hotels-grid">
          <div class="hotel-item">
            <strong>Makkah :</strong>
            <span>${pkg.makkahHotel}</span>
          </div>
          <div class="hotel-item">
            <strong>Madinah :</strong>
            <span>${pkg.madinahHotel}</span>
          </div>
        </div>

        <div style="background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold); padding: 8px 12px; border-radius: 4px; margin-bottom: 14px; font-size: 0.82rem; color: var(--primary);">
          <i class="fa-solid fa-circle-info"></i> <strong>Condition :</strong> ${pkg.conditions}
        </div>

        <ul class="package-inclusions">
          ${pkg.inclusions.slice(0, 3).map(inc => `
            <li class="inclusion-item">
              <i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>
              <span>${inc}</span>
            </li>
          `).join('')}
        </ul>

        <div class="package-footer">
          <div class="package-price-box">
            <span class="price-label">${pkg.priceLabel || 'À partir de'}</span>
            <span class="price-amount">${formatPrice(pkg.basePriceFCFA)}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline" style="padding: 8px 14px; font-size: 0.85rem;" onclick="openItineraryModal('${pkg.id}')">
              Détails
            </button>
            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;" onclick="bookPackageWhatsApp('${pkg.id}')">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Filter Pills & Search Form
   ========================================================================== */
function initFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      if (filter === 'all') {
        renderPackages(PACKAGES);
      } else if (filter === 'hadj' || filter === 'hajj') {
        renderPackages(PACKAGES.filter(p => p.type === 'hadj'));
      } else if (filter === 'omra') {
        renderPackages(PACKAGES.filter(p => p.type === 'omra'));
      } else if (filter === 'ramadan') {
        renderPackages(PACKAGES.filter(p => p.category === 'ramadan'));
      } else {
        renderPackages(PACKAGES.filter(p => p.category === filter));
      }
    });
  });
}

function initSearchForm() {
  const searchBtn = document.getElementById('searchSubmitBtn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const type = document.getElementById('searchType')?.value;

    let filtered = PACKAGES;
    if (type && type !== 'all') {
      filtered = filtered.filter(p => p.type === type || (type === 'hajj' && p.type === 'hadj'));
    }

    renderPackages(filtered);

    const pkgSection = document.getElementById('offres') || document.getElementById('catalogue');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   Interactive Quote Simulator (Configured for Official Burkina Faso Offers)
   ========================================================================== */
let simulatorState = {
  type: 'omra-standard',
  room: 'double',
  travelers: 1,
  vipAssistance: false,
  visaService: false
};

const BASE_SIM_PRICES = {
  'hadj-2027': 328500,
  'omra-standard': 1300000,
  'omra-ramadan': 1800000
};

const ROOM_MULTIPLIERS = {
  single: 1.35,
  double: 1.0,
  triple: 0.95,
  quad: 0.90
};

function initSimulator() {
  document.querySelectorAll('.sim-type-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sim-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simulatorState.type = btn.dataset.value;
      updateSimulatorPrice();
    });
  });

  document.querySelectorAll('.sim-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sim-room-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simulatorState.room = btn.dataset.value;
      updateSimulatorPrice();
    });
  });

  const travelersInput = document.getElementById('simTravelers');
  if (travelersInput) {
    travelersInput.addEventListener('input', (e) => {
      simulatorState.travelers = parseInt(e.target.value) || 1;
      updateSimulatorPrice();
    });
  }

  const vipAssistance = document.getElementById('simVipAssistance');
  if (vipAssistance) {
    vipAssistance.addEventListener('change', (e) => {
      simulatorState.vipAssistance = e.target.checked;
      updateSimulatorPrice();
    });
  }

  const visaService = document.getElementById('simVisaService');
  if (visaService) {
    visaService.addEventListener('change', (e) => {
      simulatorState.visaService = e.target.checked;
      updateSimulatorPrice();
    });
  }

  updateSimulatorPrice();
}

function updateSimulatorPrice() {
  const base = BASE_SIM_PRICES[simulatorState.type] || 1300000;
  const roomMult = (simulatorState.type === 'hadj-2027') ? 1.0 : (ROOM_MULTIPLIERS[simulatorState.room] || 1.0);
  let pricePerPerson = base * roomMult;

  if (simulatorState.vipAssistance) pricePerPerson += 50000;
  if (simulatorState.visaService) pricePerPerson += 25000;

  const total = pricePerPerson * simulatorState.travelers;

  const typeNameElem = document.getElementById('simSummaryType');
  const roomNameElem = document.getElementById('simSummaryRoom');
  const travelersElem = document.getElementById('simSummaryTravelers');
  const unitPriceElem = document.getElementById('simSummaryUnitPrice');
  const totalPriceElem = document.getElementById('simSummaryTotal');

  if (typeNameElem) typeNameElem.textContent = simulatorState.type.replace('-', ' ').toUpperCase();
  if (roomNameElem) roomNameElem.textContent = (simulatorState.type === 'hadj-2027') ? 'Pré-inscription officielle' : `Chambre ${simulatorState.room.toUpperCase()}`;
  if (travelersElem) travelersElem.textContent = `${simulatorState.travelers} Pèlerin(s)`;
  if (unitPriceElem) unitPriceElem.textContent = formatPrice(pricePerPerson);
  if (totalPriceElem) totalPriceElem.textContent = formatPrice(total);
}

function sendSimulatorWhatsApp() {
  const base = BASE_SIM_PRICES[simulatorState.type] || 1300000;
  const roomMult = (simulatorState.type === 'hadj-2027') ? 1.0 : (ROOM_MULTIPLIERS[simulatorState.room] || 1.0);
  let pricePerPerson = base * roomMult;
  if (simulatorState.vipAssistance) pricePerPerson += 50000;
  if (simulatorState.visaService) pricePerPerson += 25000;
  const total = pricePerPerson * simulatorState.travelers;

  const message = `Salam Aleykoum AFRICA VOYAGES SARL,\n\nJe souhaite des informations / un devis pour :\n- Offre : ${simulatorState.type.toUpperCase()}\n- Ville de départ : Ouagadougou (Burkina Faso)\n- Formule : ${simulatorState.room.toUpperCase()}\n- Nombre de pèlerins : ${simulatorState.travelers}\n- Montant estimé : ${formatPrice(total)}\n\nMerci de me donner les modalités pour déposer les pièces (CNIB/Passeport) à votre agence de Samandin (Ouagadougou).`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/22673187417?text=${encoded}`, '_blank');
}

/* ==========================================================================
   Modals Engine
   ========================================================================== */
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function openItineraryModal(pkgId) {
  const pkg = PACKAGES.find(p => p.id === pkgId);
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  const title = document.getElementById('itineraryModalTitle');
  const body = document.getElementById('itineraryModalBody');

  if (!modal || !title || !body) return;

  title.textContent = pkg.title;
  body.innerHTML = `
    <div style="margin-bottom: 24px;">
      <img src="${pkg.image}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; margin-bottom: 16px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="hero-badge-container" style="margin: 0;"><span>Durée : ${pkg.duration}</span></span>
        <span class="hero-badge-container" style="margin: 0;"><span>Départ : ${pkg.departure}</span></span>
        <span class="hero-badge-container" style="margin: 0;"><span>Tarif : ${formatPrice(pkg.basePriceFCFA)}</span></span>
      </div>
      <div style="background: rgba(6, 78, 59, 0.08); padding: 12px; border-radius: 8px; border-left: 4px solid var(--primary); font-size: 0.88rem;">
        <strong>Condition requise :</strong> ${pkg.conditions}
      </div>
    </div>
    <h4 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 16px; border-bottom: 2px solid var(--gold); padding-bottom: 6px;">
      Programme & Services Inclus
    </h4>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${pkg.itinerary.map(item => `
        <div style="background: #f8fafc; border-left: 4px solid var(--gold); padding: 14px 18px; border-radius: 6px;">
          <strong style="color: var(--primary); display: block; font-size: 1rem;">${item.day} : ${item.title}</strong>
          <p style="color: #475569; font-size: 0.9rem; margin-top: 4px;">${item.desc}</p>
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 12px;">
      <span style="font-size: 0.85rem; color: #64748b;">AFRICA VOYAGES SARL – Tél: +226 25 31 06 77</span>
      <button class="btn btn-whatsapp" onclick="bookPackageWhatsApp('${pkg.id}')">
        <i class="fa-brands fa-whatsapp"></i> S'inscrire via WhatsApp
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function openContactModal() {
  const modal = document.getElementById('quoteModal');
  if (modal) modal.classList.add('active');
}

function bookPackageWhatsApp(pkgId) {
  const pkg = PACKAGES.find(p => p.id === pkgId);
  const title = pkg ? pkg.title : 'le pèlerinage';
  const price = pkg ? formatPrice(pkg.basePriceFCFA) : '';
  const message = `Salam Aleykoum AFRICA VOYAGES SARL,\n\nJe souhaite des informations et m'inscrire pour l'offre "${title}" (${price}).\nJe dispose de ma pièce d'identité / passeport.\n\nMerci de m'indiquer la marche à suivre pour mon dossier.`;
  window.open(`https://wa.me/22673187417?text=${encodeURIComponent(message)}`, '_blank');
}

/* ==========================================================================
   Render Airlines & Additional Services
   ========================================================================== */
function renderAirlinesAndServices() {
  const airlinesContainer = document.getElementById('partnerAirlinesGrid');
  if (airlinesContainer && AIRLINES) {
    airlinesContainer.innerHTML = AIRLINES.map(airline => `
      <div class="airline-badge" style="background: #ffffff; border: 1px solid var(--border-gold); padding: 14px 20px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--primary); box-shadow: var(--shadow-sm);">
        <i class="fa-solid fa-plane-departure" style="color: var(--gold);"></i>
        <span>${airline.name}</span>
      </div>
    `).join('');
  }

  const servicesContainer = document.getElementById('additionalServicesGrid');
  if (servicesContainer && SERVICES) {
    servicesContainer.innerHTML = SERVICES.map(srv => `
      <div class="pillar-card" style="background: #ffffff; color: var(--on-surface); border: 1px solid var(--border-gold);">
        <div class="pillar-icon-wrapper" style="background: var(--gold-gradient); color: #121c2a;">
          <i class="${srv.icon}"></i>
        </div>
        <h3 class="pillar-title" style="color: var(--primary);">${srv.title}</h3>
        <p class="pillar-desc" style="color: #4b5563;">${srv.description}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   Logo & Branding Customizer
   ========================================================================== */
function initLogoCustomizer() {
  const input = document.getElementById('customLogoInput');
  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newLogoUrl = event.target.result;
        document.querySelectorAll('.brand-logo-img').forEach(img => {
          img.src = newLogoUrl;
        });
        alert('Logo personnalisé appliqué avec succès sur le site !');
      };
      reader.readAsDataURL(file);
    }
  });
}

function resetDefaultLogo() {
  const defaultLogo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNf-y1WgaSExlbUxRHYn-BxMrlJzenkDpYOycPvlyrjflFDe2G6H0cgYp_ygVcPGNTlIHfhZzyQez9DPrnx7bFvg-78PP-OHCV_rZ01ndoonJ_X8-pU8z0XrUySYc84vGB8E_DZz8PKDqGkxJsKZPZP7zOHz2VojJ4s8i-U9wVmpOaPP2gGndSMwJ7pz0Z9CVcwYDLmtu6dTW7bcqO7g8lYD9iFsGodPmM6TnrL_zDBPHUl7KB7bsBCZ-ZtRABvwe7LTtnXt6LrHOq';
  document.querySelectorAll('.brand-logo-img').forEach(img => {
    img.src = defaultLogo;
  });
}

/* ==========================================================================
   Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';
    const phone = document.getElementById('contactPhone')?.value || '';

    const alertBox = document.getElementById('formSuccessAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <div style="background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 14px 18px; border-radius: 8px; margin-bottom: 16px;">
          <strong>Alhamdulillah ! Merci ${name}.</strong> Votre demande a été transmise à AFRICA VOYAGES SARL (Ouagadougou). Notre équipe vous contactera au ${phone} dans les plus brefs délais. Vous pouvez également nous joindre directement au +226 25 31 06 77 ou sur WhatsApp au +226 73 18 74 17.
        </div>
      `;
    }

    form.reset();
  });
}

// Global scope bindings
window.formatPrice = formatPrice;
window.openItineraryModal = openItineraryModal;
window.openContactModal = openContactModal;
window.closeModal = closeModal;
window.closeDrawer = closeDrawer;
window.bookPackageWhatsApp = bookPackageWhatsApp;
window.sendSimulatorWhatsApp = sendSimulatorWhatsApp;
window.resetDefaultLogo = resetDefaultLogo;
