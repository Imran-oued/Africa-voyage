/**
 * Africa Voyage SARL - Pèlerinage Hajj & Omra
 * Core Interactive Application Engine & Multi-Page Navigation
 */

// Exchange Rates (Base: FCFA)
const EXCHANGE_RATES = {
  FCFA: 1,
  EUR: 1 / 655.957,
  USD: 1 / 610.00
};

let currentCurrency = 'FCFA';

// Packages Database
const PACKAGES = [
  {
    id: 'hajj-royal-vip',
    type: 'hajj',
    category: 'vip',
    title: 'Hajj 2026 – Forfait Royal Prestige VIP 5★',
    tag: 'Places Limitées - VIP',
    duration: '21 Jours',
    departure: 'Dakar & Abidjan',
    dates: 'Du 15 Mai au 05 Juin 2026 (Dates prévisionnelles)',
    basePriceFCFA: 8900000,
    makkahHotel: 'Fairmont Makkah Clock Royal Tower (5★)',
    makkahDistance: '0m – Face à la Sainte Kaaba',
    madinahHotel: 'The Oberoi Madinah (5★)',
    madinahDistance: '50m – Esplanade Masjid Nabawi',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Vols réguliers directs aller-retour classe affaire disponible',
      'Tentes VIP privatives climatisées à Mina & Arafat avec lits',
      'Pension complète gastronomique (buffets internationaux & africains)',
      'Accompagnement d\'éminents Oulémas francophones et wolof/bambara',
      'Médecin dédié disponible 24h/24 et assistance pharmacie',
      'Transferts en TGV Haramain première classe'
    ],
    itinerary: [
      { day: 'Jour 1-4', title: 'Départ & Séjour de Sérénité à Médine', desc: 'Accueil VIP à l\'aéroport de Médine, installation au palace The Oberoi. Visite de la sainte Rawdah ash-Sharifah avec créneaux Nusuk réservés.' },
      { day: 'Jour 5', title: 'Entrée en état d\'Ihram & Voyage vers La Mecque', desc: 'Préparation au Miqat de Dhul Hulaifah, départ en TGV Haramain haute vitesse. Arrivée à La Mecque et accomplissement de la Omra d\'accueil.' },
      { day: 'Jour 6-8', title: 'Révérence à La Mecque', desc: 'Séjour au Fairmont Clock Tower face à la Kaaba. Conférences préparatoires au Hajj avec nos érudits.' },
      { day: 'Jour 8-12', title: 'Les Jours Sacrés du Hajj (Mina, Arafat, Mouzdalifah)', desc: 'Campement VIP privatisé à Mina, journée solennelle de prières à Arafat sous nos tentes grand confort, nuitée à Mouzdalifah et rami des Jamarat sous encadrement sécurisé.' },
      { day: 'Jour 13-14', title: 'Tawaf Al-Ifadah & Clôture', desc: 'Accomplissement du Tawaf et Sa\'i en toute quiétude. Repos au palace.' },
      { day: 'Jour 15-21', title: 'Tawaf d\'adieu & Retour béni', desc: 'Transfert aéroport et retour vers Dakar / Abidjan.' }
    ]
  },
  {
    id: 'omra-ramadan-10-derniers',
    type: 'omra',
    category: 'ramadan',
    title: 'Omra Ramadan 2026 – Les 10 Dernières Nuits (Laylat Al-Qadr)',
    tag: 'Très Demandé',
    duration: '15 Jours',
    departure: 'Dakar, Abidjan & Bamako',
    dates: 'Du 10 au 25 Mars 2026',
    basePriceFCFA: 3450000,
    makkahHotel: 'Pullman Zamzam Makkah (5★)',
    makkahDistance: '20m – Complexe Abraj Al Bait',
    madinahHotel: 'Dar Al Taqwa Hotel Madinah (5★)',
    madinahDistance: 'Cour de la Mosquée du Prophète',
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Vols directs aller-retour avec franchise bagages généreuse',
      'Iftar et Suhoor quotidiens inclus en formule buffet haut de gamme',
      'Séminaires spirituels quotidiens et veillées de prières',
      'Ziarates (visites guidées des lieux historiques à Médine & La Mecque)',
      'Gestion intégrale des visas électroniques et assurances Nusuk',
      'Kit du pèlerin offert (Ihram, guide, sac, gourde)'
    ],
    itinerary: [
      { day: 'Jour 1-5', title: 'Médine Al-Mounawwarah', desc: 'Prières au Masjid An-Nabawi, visites historiques à Quba et Uhud.' },
      { day: 'Jour 6-15', title: 'La Mecque & Nuits Bénies de Ramadan', desc: 'Vivre Laylat Al-Qadr et la prière de Tarawih et Tahajjoud face à la Kaaba.' }
    ]
  },
  {
    id: 'hajj-confort-famille',
    type: 'hajj',
    category: 'confort',
    title: 'Hajj 2026 – Forfait Confort & Sérénité',
    tag: 'Meilleur Rapport Qualité/Prix',
    duration: '20 Jours',
    departure: 'Dakar, Abidjan, Bamako & Conakry',
    dates: 'Du 16 Mai au 04 Juin 2026',
    basePriceFCFA: 6800000,
    makkahHotel: 'Swissôtel Al Maqam Makkah (5★)',
    makkahDistance: '50m du Haram',
    madinahHotel: 'Anwar Al Madinah Mövenpick (5★)',
    madinahDistance: 'Esplanade Sud',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Vols réguliers avec assistance aéroport personnalisée',
      'Hôtels 5 étoiles proches des mosquées saintes',
      'Tentes climatisées à Mina et Arafat avec repas chauds',
      'Encadrement religieux continu et délégués bilingues',
      'Assistance médicale sur place'
    ],
    itinerary: [
      { day: 'Jour 1-6', title: 'Médine la Lumineuse', desc: 'Visite de la sainte mosquée et lieux saints.' },
      { day: 'Jour 7-20', title: 'Rites complets du Hajj à La Mecque', desc: 'Hajj serein et bien encadré.' }
    ]
  },
  {
    id: 'omra-mensuelle-confort',
    type: 'omra',
    category: 'confort',
    title: 'Omra Confort Mensuelle – Toutes Saisons',
    tag: 'Départs Chaque Mois',
    duration: '10 Jours',
    departure: 'Dakar & Abidjan',
    dates: 'Départs continus : Octobre à Mai',
    basePriceFCFA: 1950000,
    makkahHotel: 'Mövenpick Hotel & Residences Hajar Tower (5★)',
    makkahDistance: '100m du Haram',
    madinahHotel: 'Crowne Plaza Madinah (4★ Sup)',
    madinahDistance: '150m de la Rawdah',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Vols aller-retour réguliers',
      'Hébergement en chambre double/triple/quadruple avec petit déjeuner',
      'Visa Omra touristique ou électronique',
      'Guide accompagnateur dédié',
      'Eau de Zamzam 5L offerte au retour'
    ],
    itinerary: [
      { day: 'Jour 1-4', title: 'Arrivée & Médine', desc: 'Visites religieuses et recueillement.' },
      { day: 'Jour 5-10', title: 'La Mecque & Omra', desc: 'Accomplissement de la Omra et shopping souvenirs.' }
    ]
  },
  {
    id: 'omra-sur-mesure-vip',
    type: 'omra',
    category: 'vip',
    title: 'Omra Privilège Sur-Mesure (Dates Flexibles)',
    tag: '100% Personnalisable',
    duration: '7 à 21 Jours',
    departure: 'Toutes villes d\'Afrique & Europe',
    dates: 'À la date de votre choix',
    basePriceFCFA: 2800000,
    makkahHotel: 'Raffles Makkah Palace / Suite Vue Kaaba (5★ Luxe)',
    makkahDistance: 'Accès direct privé Kaaba',
    madinahHotel: 'Dar Al Iman InterContinental (5★)',
    madinahDistance: 'Face à la porte des femmes et hommes',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Chauffeur privé et véhicule de luxe (GMC Yukon) dédié',
      'Suites exécutives avec vue panoramique sur la Kaaba',
      'Guide privé exclusif pour votre famille',
      'Accès salon VIP aéroportuaire et formalités express'
    ],
    itinerary: [
      { day: 'Programme Sur-Mesure', title: 'Conçu selon vos désirs', desc: 'Notre conciergerie religieuse établit votre planning sur mesure selon vos dates et préférences.' }
    ]
  }
];

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

  // Close when pressing Escape
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

  // Update comparison table cells if on offres.html
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

  if (packagesToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 1px solid var(--border-gold);">
        <p style="font-size: 1.2rem; color: var(--primary); font-weight: 600;">Aucun forfait ne correspond exactement à vos critères de recherche.</p>
        <p style="color: #64748b; margin: 10px 0 20px;">Contactez nos conseillers pour élaborer une offre personnalisée.</p>
        <button class="btn btn-primary" onclick="openContactModal()">Contacter un Conseiller</button>
      </div>
    `;
    return;
  }

  container.innerHTML = packagesToRender.map(pkg => `
    <div class="package-card ${pkg.category === 'vip' ? 'featured' : ''}" data-id="${pkg.id}">
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
          <span>${pkg.duration} • ${pkg.dates}</span>
        </div>

        <div class="package-hotels-grid">
          <div class="hotel-item">
            <strong>Makkah:</strong>
            <span>${pkg.makkahHotel}</span>
          </div>
          <div class="hotel-item">
            <strong>Madinah:</strong>
            <span>${pkg.madinahHotel}</span>
          </div>
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
            <span class="price-label">À partir de</span>
            <span class="price-amount">${formatPrice(pkg.basePriceFCFA)}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline" style="padding: 8px 14px; font-size: 0.85rem;" onclick="openItineraryModal('${pkg.id}')">
              Programme
            </button>
            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;" onclick="bookPackageWhatsApp('${pkg.id}')">
              Réserver
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
      } else if (filter === 'hajj' || filter === 'omra') {
        renderPackages(PACKAGES.filter(p => p.type === filter));
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
    const city = document.getElementById('searchCity')?.value;
    const duration = document.getElementById('searchDuration')?.value;

    let filtered = PACKAGES;
    if (type && type !== 'all') {
      filtered = filtered.filter(p => p.type === type);
    }
    if (duration && duration !== 'all') {
      filtered = filtered.filter(p => p.duration.toLowerCase().includes(duration.toLowerCase()));
    }

    renderPackages(filtered);

    // Smooth scroll to packages
    const pkgSection = document.getElementById('offres');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   Interactive Quote Simulator
   ========================================================================== */
let simulatorState = {
  type: 'omra-confort',
  room: 'double',
  city: 'dakar',
  travelers: 1,
  vipLounge: false,
  wheelchair: false
};

const BASE_SIM_PRICES = {
  'omra-eco': 1950000,
  'omra-confort': 2500000,
  'omra-ramadan': 3450000,
  'hajj-confort': 6800000,
  'hajj-vip': 8900000
};

const ROOM_MULTIPLIERS = {
  single: 1.45,
  double: 1.0,
  triple: 0.92,
  quad: 0.85
};

function initSimulator() {
  // Option buttons
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

  document.querySelectorAll('.sim-city-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sim-city-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simulatorState.city = btn.dataset.value;
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

  const vipLounge = document.getElementById('simVipLounge');
  if (vipLounge) {
    vipLounge.addEventListener('change', (e) => {
      simulatorState.vipLounge = e.target.checked;
      updateSimulatorPrice();
    });
  }

  const wheelchair = document.getElementById('simWheelchair');
  if (wheelchair) {
    wheelchair.addEventListener('change', (e) => {
      simulatorState.wheelchair = e.target.checked;
      updateSimulatorPrice();
    });
  }

  updateSimulatorPrice();
}

function updateSimulatorPrice() {
  const base = BASE_SIM_PRICES[simulatorState.type] || 2500000;
  const roomMult = ROOM_MULTIPLIERS[simulatorState.room] || 1.0;
  let pricePerPerson = base * roomMult;

  if (simulatorState.vipLounge) pricePerPerson += 150000;
  if (simulatorState.wheelchair) pricePerPerson += 100000;

  const total = pricePerPerson * simulatorState.travelers;

  const typeNameElem = document.getElementById('simSummaryType');
  const roomNameElem = document.getElementById('simSummaryRoom');
  const travelersElem = document.getElementById('simSummaryTravelers');
  const unitPriceElem = document.getElementById('simSummaryUnitPrice');
  const totalPriceElem = document.getElementById('simSummaryTotal');

  if (typeNameElem) typeNameElem.textContent = simulatorState.type.replace('-', ' ').toUpperCase();
  if (roomNameElem) roomNameElem.textContent = `Chambre ${simulatorState.room.toUpperCase()}`;
  if (travelersElem) travelersElem.textContent = `${simulatorState.travelers} Pèlerin(s)`;
  if (unitPriceElem) unitPriceElem.textContent = formatPrice(pricePerPerson);
  if (totalPriceElem) totalPriceElem.textContent = formatPrice(total);
}

function sendSimulatorWhatsApp() {
  const base = BASE_SIM_PRICES[simulatorState.type] || 2500000;
  const roomMult = ROOM_MULTIPLIERS[simulatorState.room] || 1.0;
  let pricePerPerson = base * roomMult;
  if (simulatorState.vipLounge) pricePerPerson += 150000;
  if (simulatorState.wheelchair) pricePerPerson += 100000;
  const total = pricePerPerson * simulatorState.travelers;

  const message = `Salam Aleykoum Africa Voyage SARL,\n\nJe souhaite obtenir un devis personnalisé pour le pèlerinage :\n- Formule : ${simulatorState.type.toUpperCase()}\n- Ville de départ : ${simulatorState.city.toUpperCase()}\n- Type de chambre : ${simulatorState.room.toUpperCase()}\n- Nombre de pèlerins : ${simulatorState.travelers}\n- Options additionnelles : ${simulatorState.vipLounge ? 'Salon VIP ' : ''}${simulatorState.wheelchair ? 'Assistance fauteuil' : 'Aucune'}\n- Estimation calculée : ${formatPrice(total)}\n\nMerci de me recontacter pour finaliser mon inscription.`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/221776543210?text=${encoded}`, '_blank');
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
        <span class="hero-badge-container" style="margin: 0;"><span>Hôtel Makkah : ${pkg.makkahHotel}</span></span>
        <span class="hero-badge-container" style="margin: 0;"><span>Prix : ${formatPrice(pkg.basePriceFCFA)}</span></span>
      </div>
    </div>
    <h4 style="font-size: 1.2rem; color: var(--primary); margin-bottom: 16px; border-bottom: 2px solid var(--gold); padding-bottom: 6px;">
      Programme Détaillé Jour par Jour
    </h4>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${pkg.itinerary.map(item => `
        <div style="background: #f8fafc; border-left: 4px solid var(--gold); padding: 14px 18px; border-radius: 6px;">
          <strong style="color: var(--primary); display: block; font-size: 1rem;">${item.day} : ${item.title}</strong>
          <p style="color: #475569; font-size: 0.9rem; margin-top: 4px;">${item.desc}</p>
        </div>
      `).join('')}
    </div>
    <div style="margin-top: 24px; text-align: right;">
      <button class="btn btn-whatsapp" onclick="bookPackageWhatsApp('${pkg.id}')">
        <i class="fa-brands fa-whatsapp"></i> Réserver via WhatsApp
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
  const title = pkg ? pkg.title : 'votre pèlerinage';
  const price = pkg ? formatPrice(pkg.basePriceFCFA) : '';
  const message = `Salam Aleykoum Africa Voyage SARL,\n\nJe suis très intéressé(e) par le forfait "${title}" (${price}).\nPourriez-vous me transmettre la documentation complète et les modalités d'inscription ?\n\nMerci.`;
  window.open(`https://wa.me/221776543210?text=${encodeURIComponent(message)}`, '_blank');
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
   Contact & Quote Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';
    const phone = document.getElementById('contactPhone')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';

    const alertBox = document.getElementById('formSuccessAlert');
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <div style="background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 14px 18px; border-radius: 8px; margin-bottom: 16px;">
          <strong>Alhamdulillah ! Merci ${name}.</strong> Votre demande a été enregistrée avec succès. Un conseiller pèlerinage Africa Voyage SARL vous contactera par téléphone (${phone}) ou email (${email}) dans les plus brefs délais.
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
